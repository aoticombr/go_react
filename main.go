package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net"
	"os"
	"time"

	"io/ioutil"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	godata "github.com/fitlcarlos/godata"
	"github.com/gorilla/handlers"
	"github.com/markbates/pkger"
	"gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"
)

var jwtKey = []byte("your-secret-key")
var ip string

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

func (d *DB) GetUrlOra() string {
	url := fmt.Sprintf("oracle://%s:%s@%s:%d/%s",
		d.User, d.Pass, d.Host, d.Port, d.Sid)
	return url
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
	file, _ := os.ReadFile("config.json")
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
func getBotNames(w http.ResponseWriter, r *http.Request) {
	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var config Config
	err = json.Unmarshal(file, &config)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var botNames []string
	for _, bot := range config.Bots {
		if bot.Ativo { // Se você quiser apenas os bots ativos
			botNames = append(botNames, bot.Name)
		}
	}

	json.NewEncoder(w).Encode(botNames)
}
func getBotDBs(w http.ResponseWriter, r *http.Request) {
	botName := r.URL.Query().Get("name")
	if botName == "" {
		http.Error(w, "Missing bot name", http.StatusBadRequest)
		return
	}

	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var config Config
	err = json.Unmarshal(file, &config)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, bot := range config.Bots {
		if bot.Name == botName {
			json.NewEncoder(w).Encode(bot.DBs)
			return
		}
	}

	http.Error(w, "Bot not found", http.StatusNotFound)
}
func getMovList(w http.ResponseWriter, r *http.Request) {
	botName := r.URL.Query().Get("bot")
	if botName == "" {
		http.Error(w, "Missing bot name", http.StatusBadRequest)
		return
	}
	dbName := r.URL.Query().Get("db")
	if dbName == "" {
		http.Error(w, "Missing db name", http.StatusBadRequest)
		return
	}
	dtini_iso := r.URL.Query().Get("dtini")
	if dtini_iso == "" {
		http.Error(w, "Missing dtini", http.StatusBadRequest)
		return
	}
	dtfim_iso := r.URL.Query().Get("dtfim")
	if dtfim_iso == "" {
		http.Error(w, "Missing db dtfim", http.StatusBadRequest)
		return
	}
	fmt.Println(dtini_iso, dtfim_iso)
	dtini_time, err := time.Parse(time.RFC3339Nano, dtini_iso)
	if err != nil {
		fmt.Println("Erro na conversão:", err)
		return
	}
	dtfim_time, err := time.Parse(time.RFC3339Nano, dtfim_iso)
	if err != nil {
		fmt.Println("Erro na conversão:", err)
		return
	}
	fmt.Println(dtini_time, dtfim_time)
	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var config Config
	err = json.Unmarshal(file, &config)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	Exists := false
	url := ""
	for _, db := range config.DBS {
		if db.Name == dbName {
			url = db.GetUrlOra()
			Exists = true
		}
	}

	if Exists == false {
		http.Error(w, "Missing app/db name", http.StatusBadRequest)
		return
	}
	conn, err := godata.NewConnectionOracle(url)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()
	ds_p := godata.NewDataSet(conn)
	ds_p.Sql.Clear().
		Add("select id, tabela, nome_servico").
		Add("from fab_processo").
		Add("where upper(NOME_EXE) = upper(:NOME_EXE)")
	ds_p.SetInputParam("NOME_EXE", botName)
	err = ds_p.Open()
	if err != nil {
		http.Error(w, "ds_p:"+err.Error(), http.StatusInternalServerError)
		return
	}
	//id_proc:= ds_p.FieldByName("id").AsInt64()
	prefix := ds_p.FieldByName("tabela").AsString()
	ds_mov := godata.NewDataSet(conn)
	ds_mov.Sql.Clear().
		Add("select  a.id ").
		Add(",c.cod_empresa ").
		Add(",d.nome as nome_empresa ").
		Add(",e.codigo as cod_operacao ").
		Add(",e.descricao as desc_operacao ").
		Add(",a.dt_ref ").
		Add(",a.dt_proc ").
		Add(",case when a.tp_envio = '0' then 'Automático' ").
		Add("	  when a.tp_envio = '1' then 'Manual' ").
		Add(" end as tipo_envio ").
		Add(",FAB_GET_DESC_STATUS(a.status) as status ").
		Add(",a.qtd_erros ").
		Add(",a.dtinc ").
		Add(",a.userinc ").
		Add(",a.dtalt ").
		Add(",a.useralt ").
		Add("from fab_mov_" + prefix + " a").
		Add("left join fab_mov_arq_" + prefix + " b on b.id_mov_" + prefix + " = a.id ").
		Add("left join fab_empresa c on c.id = a.id_empresa").
		Add("left join empresas d on d.cod_empresa = c.cod_empresa").
		Add("left join fab_operacao e on e.id = a.id_operacao ").
		Add("where 1=1").
		Add("  and trunc(a.dt_ref) >=trunc(:dtini)").
		Add("  and trunc(a.dt_ref) <=trunc(:dtfim)")
	ds_mov.SetInputParam("dtini", dtini_time)
	ds_mov.SetInputParam("dtfim", dtfim_time)
	err = ds_mov.Open()
	if err != nil {
		http.Error(w, "fab_mov_"+prefix+":"+err.Error(), http.StatusInternalServerError)
		return
	}
	type Mov struct {
		Id            int64     `json:"id"`
		Cod_empresa   int64     `json:"cod_empresa"`
		Cod_operacao  int64     `json:"cod_operacao"`
		Qtd_erros     int64     `json:"qtd_erros"`
		Nome_empresa  string    `json:"nome_empresa"`
		Desc_operacao string    `json:"desc_operacao"`
		Dt_ref        time.Time `json:"dt_ref"`
		Dt_proc       time.Time `json:"dt_proc"`
		Dtinc         time.Time `json:"dtinc"`
		Dtalt         time.Time `json:"dtalt"`
		Tipo_envio    string    `json:"tipo_envio"`
		Status        string    `json:"status"`
		Userinc       string    `json:"userinc"`
		Useralt       string    `json:"useralt"`
	}
	var dados []Mov
	err = ds_mov.ToStruct(&dados)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(dados)
	return
}
func getMovDet(w http.ResponseWriter, r *http.Request) {
	botName := r.URL.Query().Get("bot")
	if botName == "" {
		http.Error(w, "Missing bot name", http.StatusBadRequest)
		return
	}
	dbName := r.URL.Query().Get("db")
	if dbName == "" {
		http.Error(w, "Missing db name", http.StatusBadRequest)
		return
	}
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing dtini", http.StatusBadRequest)
		return
	}

	file, err := ioutil.ReadFile("config.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var config Config
	err = json.Unmarshal(file, &config)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	Exists := false
	url := ""
	for _, db := range config.DBS {
		if db.Name == dbName {
			url = db.GetUrlOra()
			Exists = true
		}
	}

	if Exists == false {
		http.Error(w, "Missing app/db name", http.StatusBadRequest)
		return
	}
	conn, err := godata.NewConnectionOracle(url)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()
	ds_p := godata.NewDataSet(conn)
	ds_p.Sql.Clear().
		Add("select id, tabela, nome_servico").
		Add("from fab_processo").
		Add("where upper(NOME_EXE) = upper(:NOME_EXE)")
	ds_p.SetInputParam("NOME_EXE", botName)
	err = ds_p.Open()
	if err != nil {
		http.Error(w, "ds_p:"+err.Error(), http.StatusInternalServerError)
		return
	}
	//id_proc:= ds_p.FieldByName("id").AsInt64()
	prefix := ds_p.FieldByName("tabela").AsString()
	ds_mov := godata.NewDataSet(conn)
	ds_mov.Sql.Clear().
		Add("Select ").
		Add(" (id||' - '||tipo_integracao||' - '||tipo_acao||'| Status: '||status_tarefa||'| Msg: '||msg_tarefa||'| Incluido: '||dtinc_tarefa||' - '||userinc_tarefa||'| Alterado: '||dtalt_tarefa||' - '||useralt_tarefa) tarefa").
		Add(",tipo_art_env").
		Add(",tipo_art_ret").
		Add(",id_mov_det").
		Add(",status_detalhe").
		Add(",msg_detalhe").
		Add(",id_art_env_detalhe").
		Add(",id_art_ret_detalhe").
		Add(",dtinc_detalhe").
		Add(",userinc_detalhe").
		Add(",dtalt_detalhe").
		Add(",useralt_detalhe").
		Add(",versao").
		Add(",id_operacao").
		Add("--------------------------------------------").
		Add("From (               ").
		Add("   Select").
		Add("   a.id").
		Add("  ,a.id_mov_" + prefix + " as id_mov").
		Add("  ,case ").
		Add("    when b.tipo_integracao = 0 then 'Nenhum'").
		Add("    when b.tipo_integracao = 1 then 'Arquivo'").
		Add("    when b.tipo_integracao = 2 then 'E-mail'").
		Add("    when b.tipo_integracao = 3 then 'FTP'").
		Add("    when b.tipo_integracao = 4 then 'SFTP'").
		Add("    when b.tipo_integracao = 5 then 'Rest'").
		Add("    when b.tipo_integracao = 6 then 'Soap'").
		Add("  end as tipo_integracao        ").
		Add("  ,case ").
		Add("    when b.tipo_acao = 0 then 'Nenhuma'").
		Add("    when b.tipo_acao = 1 then 'Enviar'").
		Add("    when b.tipo_acao = 2 then 'Receber'").
		Add("    when b.tipo_acao = 3 then 'Lista'").
		Add("    when b.tipo_acao = 4 then 'Lista e Receber'").
		Add("    when b.tipo_acao = 5 then 'Listar e Enviar'").
		Add("    when b.tipo_acao = 6 then 'Excluir'").
		Add("    when b.tipo_acao = 7 then 'Processar'").
		Add("    when b.tipo_acao = 8 then 'Salvar'").
		Add("  end as tipo_acao").
		Add("  ,FAB_GET_DESC_STATUS(a.status) as status_tarefa").
		Add("  ,b.tipo_art_env").
		Add("  ,b.tipo_art_ret").
		Add("  ,a.msg as msg_tarefa").
		Add("  ,a.id_mov_art_env_" + prefix + " as art_env_tarefa").
		Add("  ,a.dtinc as dtinc_tarefa").
		Add("  ,a.userinc as userinc_tarefa").
		Add("  ,a.dtalt as dtalt_tarefa").
		Add("  ,a.useralt as useralt_tarefa ").
		Add("  ,c.id as id_mov_det").
		Add("  ,FAB_GET_DESC_STATUS(c.status) as status_detalhe").
		Add("  ,c.msg as msg_detalhe").
		Add("  ,c.id_mov_art_env_" + prefix + " as id_art_env_detalhe").
		Add("  ,c.id_mov_art_rec_" + prefix + " as id_art_ret_detalhe").
		Add("  ,c.dtinc as dtinc_detalhe").
		Add("  ,c.userinc as userinc_detalhe").
		Add("  ,c.dtalt as dtalt_detalhe").
		Add("  ,c.useralt as useralt_detalhe ").
		Add("  ,c.versao").
		Add("  ,d.id_operacao").
		Add("  from fab_mov_tar_" + prefix + " a ").
		Add("  left join fab_tarefa b on b.id = a.id_tarefa").
		Add("  left join fab_mov_det_" + prefix + " c on c.id_mov_tar_" + prefix + " = a.id").
		Add("  left join fab_mov_" + prefix + " d on d.id = a.id_mov_" + prefix).
		Add("  left join fab_operacao e on e.id = d.id_operacao").
		Add("  where a.id_mov_" + prefix + " = :id_mov").
		Add(") t  ").
		Add("order by t.id desc, t.id_mov_det desc")
	ds_mov.SetInputParam("id_mov", id)
	fmt.Println(ds_mov.Sql.Text())
	err = ds_mov.Open()
	if err != nil {
		http.Error(w, "fab_mov_tar_"+prefix+":"+err.Error(), http.StatusInternalServerError)
		return
	}
	type Det struct {
		Tarefa             string    `json:"tarefa"`
		Tipo_art_env       int64     `json:"tipo_art_env"`
		Tipo_art_ret       int64     `json:"tipo_art_ret"`
		Id_mov_det         int64     `json:"id_mov_det"`
		Status_detalhe     string    `json:"status_detalhe"`
		Msg_detalhe        string    `json:"msg_detalhe"`
		Id_art_env_detalhe int64     `json:"id_art_env_detalhe"`
		Id_art_ret_detalhe int64     `json:"id_art_ret_detalhe"`
		Dtinc_detalhe      time.Time `json:"dtinc_detalhe"`
		Userinc_detalhe    string    `json:"userinc_detalhe"`
		Dtalt_detalhe      time.Time `json:"dtalt_detalhe"`
		Useralt_detalhe    string    `json:"useralt_detalhe"`
		Versao             string    `json:"versao"`
		Id_operacao        int64     `json:"id_operacao"`
	}
	var dados []Det
	err = ds_mov.ToStruct(&dados)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(dados)
	return
}
func getLocalIPv4() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}

	for _, address := range addrs {
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String(), nil
			}
		}
	}

	return "", errors.New("Endereço IPv4 local não encontrado")
}

func main() {
	/*
	  comando para incluir o frontreact/build
	  pkger -include /frontreact/build
	*/
	ip, err := getLocalIPv4()
	if err != nil {
		fmt.Println("Erro:", err)
	} else {
		fmt.Println("Endereço IPv4 local:", ip)
	}
	fmt.Println("Server started at http://" + ip + ":3050")
	router := mux.NewRouter()

	corsHandler := handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"*"}))

	fs := http.FileServer(pkger.Dir("/frontreact/build"))
	//fs := http.FileServer(http.Dir("./frontreact/build"))
	router.HandleFunc("/json", getConfig).Methods("GET")
	router.HandleFunc("/botnames", getBotNames).Methods("GET")
	router.HandleFunc("/botdbs", getBotDBs).Methods("GET")
	router.HandleFunc("/movlist", getMovList).Methods("GET")
	router.HandleFunc("/movdet", getMovDet).Methods("GET")
	router.HandleFunc("/json", updateConfig).Methods("POST")

	router.HandleFunc("/signin", signin).Methods("GET")
	router.PathPrefix("/").Handler(http.StripPrefix("/", fs))

	http.ListenAndServe(":3050", corsHandler(router))
}
