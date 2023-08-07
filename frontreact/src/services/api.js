import axios from 'axios';
import {getToken, logout} from './auth';
import {TOKEN_KEY, REFRESHTOKEN_KEY} from '../config';

async function refreshToken(url,error) {
  return new Promise((resolve, reject) => {
    try {
      const token = getToken();
      const refresh_token = localStorage.getItem(REFRESHTOKEN_KEY);
      const header = {
        "Content-Type": "application/json",
        Authorization: 'bearer '+token,
      };
      const parameters = {
        method: "POST",
        headers: header,
      };
      const body = {
        grant_type: "refresh_token",
        refresh_token,
      };
     // console.log('response...3.1');
    //  console.log(url);
    //  console.log('response...3.2');
      axios
        .post(
          url + "refreshtoken",
          body,
          parameters
        )
        .then(async (res) => {
      //    console.log('response...3.3');
       //   console.log(res.data);
       //   console.log('response...3.4');
          localStorage.setItem(TOKEN_KEY, res.data.token);
          localStorage.setItem(REFRESHTOKEN_KEY, res.data.refresh_token);
          // Fazer algo caso seja feito o refresh token
      //    console.log('response...3.5');
          return resolve(res);
        })
        .catch((err) => {
          //console.log('response...3.6');
          // Fazer algo caso n?o seja feito o refresh token
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
};

const baseApi = (url) => {
    const api = axios.create({
        baseURL: url
    });

    api.interceptors.request.use(async (config) => {
      const value = getToken();
      if (value) {
        config.headers['Authorization'] = 'Bearer '+value.token  
      }
      return config;
    });

    api.interceptors.response.use(
      
      (response) => {
       // console.log('response...api.interceptors.response.use...1');
        return response;
                    },
      async function (error) {
      //  console.log('response...api.interceptors.response.use...2');
        const access_token = localStorage.getItem(TOKEN_KEY);
       // console.log('response...access_token..2');
      //  console.log(access_token);

        if (error.response.status === 401 && access_token) {
       //   console.log('response...3');
          await refreshToken(url,error)
          .then((resp)=>{
       //     console.log('response...3.1');
            return resp;
          })
          .catch((error)=>{
         //   console.log('response...4.1');
            logout();
          //  console.log('response...5');
            return Promise.reject(error);
          })
          
        } else {
          return Promise.reject(error);
        }
        
      }
    );

    return api;
}

export default baseApi;

