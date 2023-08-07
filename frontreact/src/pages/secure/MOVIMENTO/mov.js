import React, {useState, useEffect, useCallback }  from 'react';
import { PageContent } from '../../../shared/styles';
import {Container,  Row, Table, Col,Alert,  Modal  } from 'react-bootstrap';
import {Link, useParams, useHistory} from 'react-router-dom';

import baseApi from "../../../services/api";
import baseURLS from "../../../configs/baseURLS";
import { DropDownButton } from 'devextreme-react/drop-down-button';
import {
  DataGrid,
  MasterDetail,
  Column,
  FormItem,
  Label,
  // ...
  RequiredRule,
  Editing
} from 'devextreme-react/data-grid';
import { TagBox } from 'devextreme-react/tag-box';
import {
  Form,
  SimpleItem,
  NumericRule
} from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import {
  List
} from 'devextreme-react/list';


const Class_Crud = () => {
  const _tabela = 'gio';
  const history = useHistory(); //chamado do hook
  //
  const [data, setData] = useState({});
  const [error, setError]        = useState('');
  const [isLoading, setLoading]  = useState(true);
  const [itens, setItens] = useState({});
  //
  
                                                             
  

  async function getDados() {
    try {
      const api = baseApi(baseURLS.API_ADMIN)
      api.get('/config')
        .then(res => {
          setLoading(false);
          setData(res.data);
        });
       
   }                                                                      
   catch(erro){                                                           
     if (error.message) {                                                 
       setError(error.message);                                           
     } else {                                                             
       setError("Ocorreu um erro durante a criação do tbaoti_0024. ");    
     }                                                                    
   };                                                                     
           
  }

  function renderError (){
   
  
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    )
  }

  const onSubmit = data => {
    const api = baseApi(baseURLS.API_ADMIN)
      api.post('/config', data)
        .then(
          (res) => {
            console.log(res)
            getDados()
          }
        )
        .catch(err => console.error(err));
    // try {  
    //   event.preventDefault();
    //        if ((metodo === 'insert') & (1===2)){ 
    // } else if ((metodo === 'insert') & (CheckNumberNull(id))) { setError(`Informe todos os campos para adicionar o gio insert[id]`);
    // } else if ((metodo === 'insert') & (CheckNumberNull(id_db))) { setError(`Informe todos os campos para adicionar o gio insert[id_db]`);
    // } else if ((metodo === 'insert') & (!dt_inc)) { setError(`Informe todos os campos para adicionar o gio insert[dt_inc]`);
    // } else if ((metodo === 'insert') & (!dt_alt)) { setError(`Informe todos os campos para adicionar o gio insert[dt_alt]`);
    // } else if ((metodo === 'insert') & (CheckNumberNull(user_inc))) { setError(`Informe todos os campos para adicionar o gio insert[user_inc]`);
    // } else if ((metodo === 'insert') & (CheckNumberNull(user_alt))) { setError(`Informe todos os campos para adicionar o gio insert[user_alt]`);
    // } else if ((metodo === 'insert') & (!descricao)) { setError(`Informe todos os campos para adicionar o gio insert[descricao]`);
    // } else if ((metodo === 'edit') & (CheckNumberNull(id))) { setError(`Informe todos os campos para adicionar o gio insert[id]`);
    // } else if ((metodo === 'edit') & (CheckNumberNull(id_db))) { setError(`Informe todos os campos para adicionar o gio insert[id_db]`);
    // } else if ((metodo === 'edit') & (!dt_inc)) { setError(`Informe todos os campos para adicionar o gio insert[dt_inc]`);
    // } else if ((metodo === 'edit') & (!dt_alt)) { setError(`Informe todos os campos para adicionar o gio insert[dt_alt]`);
    // } else if ((metodo === 'edit') & (CheckNumberNull(user_inc))) { setError(`Informe todos os campos para adicionar o gio insert[user_inc]`);
    // } else if ((metodo === 'edit') & (CheckNumberNull(user_alt))) { setError(`Informe todos os campos para adicionar o gio insert[user_alt]`);
    // } else if ((metodo === 'edit') & (!descricao)) { setError(`Informe todos os campos para adicionar o gio insert[descricao]`);
    // } else {                                                                                                   
    //    if (metodo === 'edit') {                                                                          
    //      let ok = await (new Class_WS_gio()).getUpdate(id,{id_db,dt_inc,dt_alt,user_inc,user_alt,descricao,row_status: "old"});    
    //    //  window.close();//                                                                            
    //        history.push('/'+_tabela);                                                                         
    //    } else if (metodo === 'insert') {                                                                      
    //      let ok = await (new Class_WS_gio()).getInsert({id,id_db,dt_inc,dt_alt,user_inc,user_alt,descricao});    
    //     // window.close();//                                                                       
    //        history.push('/'+_tabela);                                                                         
    //    } else if (metodo === 'delete') {                                                                      
    //      let ok = await (new Class_WS_gio()).getDelete(id);                
    //     // window.close();//                                                                             
    //        history.push('/'+_tabela);                                                                          
    //    }                                                                                                      
    //   }                                                                                                      
    // }catch(erro){                                                                                           
    //   if (error.message) {                                                                                  
    //     setError(error.message);                                                                            
    //   } else {                                                                                              
    //     setError("Ocorreu um erro durante a criação do gio. ");                                     
    //   }                                                                                                     
    // };                                                                                                      
  }
  const getDBNames = (data) => {
    // Ensure `data` is defined and has a `dbs` property.
    if (!data || !Array.isArray(data.dbs)) {
      console.error('Invalid data passed to getDBNames');
      return [];
    }
    
    return data.dbs.map(db => db.name);
  };  

   useEffect(() => { 
        getDados();
   }, []);

   useEffect(() => {
    setItens(getDBNames(data));
    console.log("useEffect data itens:",itens);
   }, [data.dbs]);

   
   
  //totalizador vem deseabilitado ative somente se precisar                                                                                                               
  // useEffect(() => {                                                                                             
  //    set_row_now(_row_now=>({..._row_now, total:((Number(_row_now.qtde)*Number(_row_now.valor)).toFixed(2))})); 
  //  }, [_row_now.qtde, _row_now.valor]);                                                                         

    function onEditorPreparingbots(e) {
      console.log("DataField",e.dataField,"parentType",e.parentType)
      if(e.dataField == "dbs" && e.parentType === "dataRow") {
          // const defaultValueChangeHandler = e.editorOptions.onValueChanged;
           e.editorName = "dxTagBox"; // Change the editor's type
        
          // e.editorOptions.onValueChanged = function (args) {  // Override the default handler
          //     // ...
          //     // Custom commands go here
          //     // ...
          //     // If you want to modify the editor value, call the setValue function:
          //     // e.setValue(newValue);
          //     // Otherwise, call the default handler:
          //     defaultValueChangeHandler(args);
          // }
      }
    }
    function onEditorPreparingApi(e) {
      console.log("DataField",e.dataField,"parentType",e.parentType)
      if(e.dataField == "gateway" && e.parentType === "dataRow") {
          // const defaultValueChangeHandler = e.editorOptions.onValueChanged;
           e.editorName = "dxForm"; // Change the editor's type
        
          // e.editorOptions.onValueChanged = function (args) {  // Override the default handler
          //     // ...
          //     // Custom commands go here
          //     // ...
          //     // If you want to modify the editor value, call the setValue function:
          //     // e.setValue(newValue);
          //     // Otherwise, call the default handler:
          //     defaultValueChangeHandler(args);
          // }
      }
    }

    function renderDBS(cellInfo) {
      const setEditedValue = ((e)=>{
        console.log("setEditedValue",e.value)
        cellInfo.setValue(e.value);
      })
      console.log("cellInfo",cellInfo)

      return (
          <TagBox
              dataSource={itens}
           //   value={cellInfo.value}
              defaultValue={cellInfo.value}
              onValueChanged={setEditedValue}
          />
      )
    }
    function renderGATWAY(cellInfo) {
      // const setEditedValue = ((e)=>{
      //   console.log("setEditedValue",e.value)
      //   cellInfo.setValue(e.value);
      // })
      console.log("cellInfo",cellInfo)

      return (
          <Form
          formData={cellInfo.value}
          colCount={1}
          
           //   value={cellInfo.value}
           //   defaultValue={cellInfo.value}
           //   onValueChanged={setEditedValue}
          />
      )
    }
    return (
      <>
        <PageContent>
          <Container>
          <Row>
            <Col>
                <h3>Movimento</h3>
            </Col>
            <Col>
            <Button
                text="Gravar"
                variant={('primary')} 
                      onClick={() => onSubmit(data)}
                  />
                <Link className='btn btn-success float-right' to={'/'}>Voltar</Link>
            </Col>
          </Row>  
          {error && renderError()}
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <Row>
                <Col lg={6} sm={12}>
                
                  <Form        formData={data}  colSpan={1}   >                  
                    <SimpleItem dataField="path" />
                    <SimpleItem dataField="lognivel" >
                      <NumericRule />
                    </SimpleItem>
                    <SimpleItem dataField="logscreen" editorType="dxCheckBox" />
                  </Form>
                    <DataGrid id="dataGrid" dataSource={data.dbs}>                 
                      <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}
                      />
                    </DataGrid>
                    <DataGrid 
                       id="dataGrid" 
                       dataSource={data.bots}
                       onEditorPreparing={onEditorPreparingbots}
                      >  
                      <Column
                          dataField="name"
                      />  
                      <Column
                          dataField="ativo"
                      />  
                       <Column
                          dataField="dbs"
                          editCellRender={renderDBS}
                      />            
                      <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}
                      />
                       <FormItem colSpan={1}/>
                    </DataGrid>
                    <DataGrid id="dataGrid" dataSource={data.apis}>
                    <Column
                          dataField="name"
                      />
                       <Column
                          dataField="protocolo"
                      />
                       <Column
                          dataField="host"
                      />
                       <Column
                          dataField="port"
                      /> 
                       <Column
                          dataField="ativo"
                      /> 
                      <Column
                          dataField="gateway"
                          editCellRender={renderGATWAY}
                      />  
                       <Column
                          dataField="dbs"
                          editCellRender={renderDBS}
                      />              
                      <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}
                      />
                    </DataGrid>
                  
                </Col>
              </Row>
            )}
          </Container>
        </PageContent>
      </>
    )
  
}

export default Class_Crud;
