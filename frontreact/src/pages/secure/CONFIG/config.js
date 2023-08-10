import React, {useState, useEffect, useCallback }  from 'react';
import { PageContent } from '../../../shared/styles';
import {Container,  Row, Table, Col,Alert,  Modal  } from 'react-bootstrap';
import {Link, useParams, useHistory} from 'react-router-dom';

import baseApi from "../../../services/api";
import {getCurrentURL} from "../../../configs/baseURLS";
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
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';
import DataSource from 'devextreme/data/data_source';



const Class_Crud = () => {
  const _tabela = 'gio';
  const history = useHistory(); //chamado do hook
  //
  const [data, setData] = useState({});
  const [error, setError]         = useState('');
  const [isLoading, setLoading]   = useState(true);
  const [itens, setItens]         = useState({});

  const niveis =['Nenhum','Debug','Info','Warining','Error','Critial/Fatal']     
  const simpleLookupLabel = { 'aria-label': 'Simple lookup' };      

  const getNivelIndex = (nivel) => {
    const index = niveis.indexOf(nivel);
    return index === -1 ? 'Nível não encontrado' : index;
  }

  async function getDados() {
    try {
      const api = baseApi(getCurrentURL())
      api.get('/json')
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
    const api = baseApi(getCurrentURL() )
      api.post('/json', data)
        .then(
          (res) => {
            console.log(res)
            getDados()
          }
        )
        .catch(err => console.error(err));
                                                                                                        
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
      return (
          <Form
          formData={cellInfo.value}
          colCount={1}
          />
      )
    }
    const setNivel = (e) => {
      console.log(" e value:",e.value)
      data.lognivel = getNivelIndex(e.value)
      setData(data)
  }

    

  const renderLookup= (comp) => {
      console.log("renderLookup",comp)
      console.log("value:",data.lognivel)
      return (
        <Lookup
        items={niveis}
        //grouped={true}
        //value={data.lognivel}
        defaultValue={niveis[data.lognivel]}
       //  displayExpr="Subject"
         onValueChanged={setNivel}
        inputAttr={simpleLookupLabel}
      />
      );
  }
    return (
      <>
        <PageContent>
          <Container>
          <Row>
            <Col>
                <h3>Configuração do Json</h3>
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
                    <SimpleItem 
                      dataField="lognivel" 
                      editorType="dxLookup" 
                      render={renderLookup}
                      />
                   
                    <SimpleItem dataField="logscreen" editorType="dxCheckBox" />
                  </Form>
                  
                    <DataGrid id="dataGrid" dataSource={data.dbs} allowColumnResizing={true}
                columnAutoWidth={true}
                allowColumnReordering={true}
                width={1000}
                height={200}>                 
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
                       allowColumnResizing={true}
                columnAutoWidth={true}
                allowColumnReordering={true}
                width={1000}
                height={200}
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
                    <DataGrid id="dataGrid" 
                    dataSource={data.apis}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    width={1000}
                    height={200}>
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
