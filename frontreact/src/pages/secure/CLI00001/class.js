import baseApi from "../../../services/api";
import {
    getListaGenerico, 
    getCargaGenerico, 
    getLookupGenerico, 
    getInsertGenerico, 
    getUpdateGenerico,
    getDeleteGenerico,
    getOutrosPostBody,
    getOutrosGetBody,
    getRowGenerico,
} from '../../../services/crud';
import {getCurrentURL} from "../../../configs/baseURLS";
import {v4 as uuid } from 'uuid';


class Class_WS_gio {
    constructor(){
        this.api = baseApi(getCurrentURL() )
        this.tabela = 'gio';
    }
    //Lista os Dados
    async getLista(filtros) {
        return getListaGenerico(this.api,this.tabela,filtros)
    }    
    async getCarga(filtros) {
        return getCargaGenerico(this.api,this.tabela,filtros) 
    }    
    async getLookup(filtros) {
        return getLookupGenerico(this.api,this.tabela,filtros) 
    }    
    async getInsert(insert) {
        return getInsertGenerico(this.api,this.tabela,insert)
    }
    async getUpdate(id,update) {
        return getUpdateGenerico(this.api,this.tabela,id,update)
    }
    async getDelete(id) {
        return getDeleteGenerico(this.api,this.tabela,id)
    }
    async getRow(id) {
        return getRowGenerico(this.api,this.tabela,id)
    }
    getNewRow(){ 
      return {   
        id: uuid(), 
        id_db: null,
        lk_id_db: null,
        dt_inc: new Date(),
        dt_alt: new Date(),
        user_inc: null,
        lk_user_inc: null,
        user_alt: null,
        lk_user_alt: null,
        descricao: null,
       row_status: "new" 
     }  
   } 
    
}

export default Class_WS_gio;
