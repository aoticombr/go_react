

export async function getListaGenerico(api,tabela,filtros) {
  console.log('url....','getListaGenerico')
    return new Promise((resolve, reject) => {   
      api.post('/'+tabela+'/lista/',filtros)
      .then(async (res)=>{
          console.log('then...getListaGenerico')
          console.log(res)
          if (res.data){
            resolve(res.data)
          } else {
            resolve([])   
          }
          
      })
      .catch(async (rej)=>{
          console.log('catch...getListaGenerico...1')
          console.log(rej)
          console.log('catch...getListaGenerico...2.1')
          
          console.log('catch...getListaGenerico...2.2')
          if (rej.response){
            if (rej.response.data) {
                console.log('catch...getListaGenerico...4.1')
                reject(rej.response.data)
            } else {
                console.log('catch...getListaGenerico...4.2')
                reject(rej.response)  
              }
          } else {
            console.log('catch...getListaGenerico...4.3')
            reject(rej)   
             
          } 
            
      });
    });
}    
export async function getCargaGenerico(api,tabela,filtros) {
      return new Promise((resolve, reject) => {   
        api.post('/'+tabela+'/carga/',filtros)
        .then(async (res)=>{
            console.log('then...')
            console.log(res)
            resolve(res.data)
        })
        .catch(async (rej)=>{
            console.log('catch...')
            console.log(rej)
            reject(rej.response.data)   
        });
      });
}    
export async function getLookupGenerico(api,tabela,filtros) {
  return new Promise((resolve, reject) => {   
    api.post('/'+tabela+'/lookup/',filtros)
    .then(async (res)=>{
        console.log('then...')
        console.log(res)
        resolve(res.data)
    })
    .catch(async (rej)=>{
        console.log('catch...')
        console.log(rej)
        reject(rej.response.data)   
    });
  });
} 
export async function getInsertGenerico(api,tabela,insert) {
      return new Promise((resolve, reject) => {   
        api.post('/'+tabela+'/insert/',insert)
        .then(async (res)=>{
            console.log('then...')
            console.log(res)
            resolve(res.data)
        })
        .catch(async (rej)=>{
            console.log('catch...')
            console.log(rej)
            reject(rej.response.data)   
        });
      });
}
export async function getUpdateGenerico(api,tabela,id,update) {
      return new Promise((resolve, reject) => {   
        api.put('/'+tabela+'/update/'+id,update)
        .then(async (res)=>{
            console.log('then...')
            console.log(res)
            resolve(res.data)
        })
        .catch(async (rej)=>{
            console.log('catch...')
            console.log(rej)
            reject(rej.response.data)   
        });
      });
}
export async function putOtherGenerico(api,tabela,metodo,id,update) {
  return new Promise((resolve, reject) => {   
    api.put('/'+tabela+'/'+metodo+'/'+id,update)
    .then(async (res)=>{
        console.log('then...')
        console.log(res)
        resolve(res.data)
    })
    .catch(async (rej)=>{
        console.log('catch...')
        console.log(rej)
        reject(rej.response.data)   
    });
  });
}
export async function getDeleteGenerico(api,tabela,id) {
      return new Promise((resolve, reject) => {   
        api.delete('/'+tabela+'/delete/'+id)
        .then(async (res)=>{
            console.log('then...delete')
            console.log(res)
            resolve(res.data)
        })
        .catch(async (rej)=>{
            console.log('catch...delete')
            console.log(rej)
            reject(rej.response.data)   
        });
      });
}
export async function getRowGenerico(api,tabela,id) {
      return new Promise((resolve, reject) => {   
        api.get('/'+tabela+'/row/'+id)
        .then(async (res)=>{
            console.log('then...getRowGenerico')
            console.log(res)
            resolve(res.data[0])
        })
        .catch(async (rej)=>{
            console.log('catch...getRowGenerico')
            console.log(rej)
            reject(rej.response.data)   
        });
      });
}
export async function getMetodoGenerico(api,tabela,metodo,id) {
 // console.log('url....','/'+tabela+'/'+metodo+'/'+id)
  return new Promise((resolve, reject) => {   
    api.get('/'+tabela+'/'+metodo+'/'+id)
    .then(async (res)=>{
        console.log('then...getMetodoGenerico')
        console.log(res)
        resolve(res.data[0])
    })
    .catch(async (rej)=>{
        console.log('catch...getMetodoGenerico')
        console.log(rej)
        reject(rej.response.data)   
    });
  });
}
export async function postMetodoGenerico(api,tabela,metodo,id, body) {
   console.log('url....','/'+tabela+'/'+metodo+'/'+id)
   return new Promise((resolve, reject) => {   
     api.post('/'+tabela+'/'+metodo+'/'+id,body)
     .then(async (res)=>{
         console.log('then...postMetodoGenerico')
         console.log(res)
         resolve(res.data)
     })
     .catch(async (rej)=>{
         console.log('catch...postMetodoGenerico',rej)
         console.log(rej)
         reject(rej.response.data)   
     });
   });
 }
export async function getRelatorioGenerico(api,tabela, nome,filtros) {
  return new Promise((resolve, reject) => {   
    api.post('/'+tabela+'/rel/'+nome,filtros)
    .then(async (res)=>{
        console.log('then...getListaGenerico')
        console.log(res)
        if (res.data){
          resolve(res.data)
        } else {
          resolve([])   
        }
        
    })
    .catch(async (rej)=>{
        console.log('catch...getListaGenerico...1')
        console.log(rej)
        console.log('catch...getListaGenerico...2.1')
        
        console.log('catch...getListaGenerico...2.2')
        if (rej.response){
          if (rej.response.data) {
              console.log('catch...getListaGenerico...4.1')
              reject(rej.response.data)
          } else {
              console.log('catch...getListaGenerico...4.2')
              reject(rej.response)  
            }
        } else {
          console.log('catch...getListaGenerico...4.3')
          reject(rej)   
           
        } 
          
    });
  });
} 
export async function getOutrosGenerico(api,tabela, Link,filtros) {
  return new Promise((resolve, reject) => {   
    api.post('/'+tabela+Link,filtros)
    .then(async (res)=>{
        console.log('then...getListaGenerico')
        console.log(res)
        if (res.data){
          resolve(res.data)
        } else {
          resolve([])   
        }
        
    })
    .catch(async (rej)=>{
        console.log('catch...getListaGenerico...1')
        console.log(rej)
        console.log('catch...getListaGenerico...2.1')
        
        console.log('catch...getListaGenerico...2.2')
        if (rej.response){
          if (rej.response.data) {
              console.log('catch...getListaGenerico...4.1')
              reject(rej.response.data)
          } else {
              console.log('catch...getListaGenerico...4.2')
              reject(rej.response)  
            }
        } else {
          console.log('catch...getListaGenerico...4.3')
          reject(rej)   
           
        } 
          
    });
  });
} 

export async function getOutrosPostBody(api,path,body) {
  return new Promise((resolve, reject) => {   
    api.post(path,body)
    .then(async (res)=>{
        console.log('then...getListaGenerico')
        console.log(res)
        if (res.data){
          resolve(res.data)
        } else {
          resolve([])   
        }
        
    })
    .catch(async (rej)=>{
        console.log('catch...getListaGenerico...1')
        console.log(rej)
        console.log('catch...getListaGenerico...2.1')
        
        console.log('catch...getListaGenerico...2.2')
        if (rej.response){
          if (rej.response.data) {
              console.log('catch...getListaGenerico...4.1')
              reject(rej.response.data)
          } else {
              console.log('catch...getListaGenerico...4.2')
              reject(rej.response)  
            }
        } else {
          console.log('catch...getListaGenerico...4.3')
          reject(rej)   
           
        } 
          
    });
  });
} 

export async function getOutrosGetBody(api,path,body) {
  return new Promise((resolve, reject) => {   
    api.get(path,body)
    .then(async (res)=>{
        console.log('then...getListaGenerico')
        console.log(res)
        if (res.data){
          resolve(res.data)
        } else {
          resolve([])   
        }
        
    })
    .catch(async (rej)=>{
        console.log('catch...getListaGenerico...1')
        console.log(rej)
        console.log('catch...getListaGenerico...2.1')
        
        console.log('catch...getListaGenerico...2.2')
        if (rej.response){
          if (rej.response.data) {
              console.log('catch...getListaGenerico...4.1')
              reject(rej.response.data)
          } else {
              console.log('catch...getListaGenerico...4.2')
              reject(rej.response)  
            }
        } else {
          console.log('catch...getListaGenerico...4.3')
          reject(rej)   
           
        } 
          
    });
  });
} 
