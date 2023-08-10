import baseApi from "./api";
import {getCurrentURL} from "../configs/baseURLS";

export default class AdminService {
    constructor(){
        this.api = baseApi(getCurrentURL() )
    }
   
async login(user, pass) {
        return new Promise((resolve, reject) => {   
          console.log('token...login' )
         const token = btoa(`${user}:${pass}`);
          console.log('token...login:',token )
          this.api.get('signin', {
            headers: {
              'Authorization': `Basic ${token}`,
              'Content-Type': 'application/json',
            }
          })
          .then(async (res)=>{
              console.log('then...login')
              resolve(res.data)
          })
          .catch(async (rej)=>{
            console.log('catch...login1')
            console.log(rej)
            console.log('catch...login2')
              reject(rej.response.data)   
          });
        });

}


    
}
