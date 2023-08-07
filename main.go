package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/dgrijalva/jwt-go"

	"github.com/gorilla/handlers"
	"gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"
)

var jwtKey = []byte("your-secret-key")

type Config struct {
	DBS       []DB   `json:"dbs"`
	Bots      []Bot  `json:"bots"`
	Apis      []API  `json:"apis"`
	User      []User `json:"user"`
	Path      string `json:"path"`
	LogNivel  int    `json:"lognivel"`
	LogScreen bool   `json:"logscreen"`
}
type DB struct {
	Name   string `json:"name"`
	Host   string `json:"host"`
	Port   int    `json:"port"`
	User   string `json:"user"`
	Pass   string `json:"pass"`
	Schema string `json:"schema"`
	Sid    string `json:"sid"`
	Ativo  bool   `json:"ativo"`
}
type Bot struct {
	Name  string   `json:"name"`
	Ativo bool     `json:"ativo"`
	DBs   []string `json:"dbs"`
}
type API struct {
	Name     string   `json:"name"`
	Protocol string   `json:"protocolo"`
	Host     string   `json:"host"`
	Port     int      `json:"port"`
	Gateway  Gateway  `json:"gateway"`
	DBs      []string `json:"dbs"`
	Ativo    bool     `json:"ativo"`
}
type Gateway struct {
	Protocol string `json:"protocolo"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Ativo    bool   `json:"ativo"`
}
type User struct {
	Name  string `json:"name"`
	Pass  string `json:"pass"`
	Ativo bool   `json:"ativo"`
}

func getConfig(w http.ResponseWriter, r *http.Request) {
	file, _ := ioutil.ReadFile("config.json")
	var config Config
	_ = json.Unmarshal(file, &config)
	json.NewEncoder(w).Encode(config)
}
func updateConfig(w http.ResponseWriter, r *http.Request) {
	var newConfig Config
	err := json.NewDecoder(r.Body).Decode(&newConfig)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	configData, err := json.Marshal(newConfig)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = ioutil.WriteFile("config.json", configData, 0644)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func signin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("signin")
	file, _ := ioutil.ReadFile("config.json")
	var config Config
	_ = json.Unmarshal(file, &config)

	username, password, ok := r.BasicAuth()
	if !ok {
		http.Error(w, "Missing Basic Authentication header", http.StatusUnauthorized)
		return
	}
	//	fmt.Println(username, password)

	hashedPass := md5.Sum([]byte(password))
	hashedPassStr := hex.EncodeToString(hashedPass[:])

	for _, user := range config.User {
		if user.Name == username && user.Pass == hashedPassStr && user.Ativo {
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"name": user.Name,
			})
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{
				"auth":      "true",
				"token":     tokenString,
				"expiresIn": "1d",
			})
			return
		}
	}

	http.Error(w, "User not found or password is incorrect", http.StatusUnauthorized)
}

func main() {
	fmt.Println("Server started at http://localhost:3050")
	router := mux.NewRouter()

	corsHandler := handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"*"}))

	fs := http.FileServer(http.Dir("./frontreact/build"))
	router.HandleFunc("/config", getConfig).Methods("GET")
	router.HandleFunc("/config", updateConfig).Methods("POST")
	router.HandleFunc("/signin", signin).Methods("GET")
	router.PathPrefix("/").Handler(http.StripPrefix("/", fs))

	http.ListenAndServe(":3050", corsHandler(router))
}
