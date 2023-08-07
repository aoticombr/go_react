import {TOKEN_KEY} from '../config';
import jwtDecode from 'jwt-decode';


export const tokenIsEmpty = () =>localStorage.getItem(TOKEN_KEY)!=null;

export const getToken = () => tokenIsEmpty()?JSON.parse(localStorage.getItem(TOKEN_KEY)):null;
export const isTokenValid  = () => {
    console.log('isTokenValid....1')
    const value =  getToken();
    console.log('isTokenValid....2')
    console.log(value)
    if (value) {
        console.log('isTokenValid....3')  
        console.log(value.token) 
        try {
            const dec = jwtDecode(value.token); 
            console.log('isTokenValid....4',dec)

            if (dec) {
                console.log('isTokenValid....5')
                return true;
            } else  {
                console.log('isTokenValid....6')
                return false;
            }         
                
             
        } catch(error) {
            return false;
        }
       
             
    } 
    else 
      return false;
    
}

export const isAuthenticate  = () =>{
    console.log('isAuthenticate....1')
    const value = isTokenValid();
    return value; 
}



export function login  (value) {
    console.log('export const isEmp....1')
    const dataString = JSON.stringify(value);
    console.log('export const isEmp....2',dataString)
    localStorage.setItem(TOKEN_KEY, dataString);
}
export function logout  ()  {
    localStorage.removeItem(TOKEN_KEY)
}
export const isEmp  = () =>{
   console.log('export const isEmp....1')
   const value =  getToken();
   console.log('export const isEmp....2')
   if (value) {
    return value.emp===true;
   } else return false;
  // console.log(value)
   //return value.emp===true;
}

