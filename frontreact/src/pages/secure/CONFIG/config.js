import React, {useState, useEffect }  from 'react';
import { PageContent } from '../../../shared/styles';
import {Container,  Row,  Col,Alert  } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import baseApi from "../../../services/api";
import {getCurrentURL} from "../../../configs/baseURLS";
import {DataGrid, Column,  FormItem,  Editing} from 'devextreme-react/data-grid';
import {TagBox} from 'devextreme-react/tag-box';
import {Form, SimpleItem} from 'devextreme-react/form';
import {Button} from 'devextreme-react/button';
import {Lookup} from 'devextreme-react/lookup';



const Class_Crud = () => {
  //
  const [data, setData] = useState({});
  const [error, setError]         = useState('');
  const [isLoading, setLoading]   = useState(true);
  const [itens]         = useState({});

  const niveis =['Nenhum','Debug','Info','Warining','Error','Critial/Fatal']     
  const simpleLookupLabel = { 'aria-label': 'Simple lookup' };      

  const getNivelIndex = (nivel) => {
    const index = niveis.indexOf(nivel);
    return index === -1 ? 'Nível não encontrado' : index;
  }

  async function ObtemDados() {
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
            ObtemDados()
          }
        )
        .catch(err => console.error(err));
                                                                                                        
  }

   

  useEffect(() => { 
    async function fetchDados() {
        ObtemDados();
    }
    fetchDados();    
  }, []);

  

  function onEditorPreparingbots(e) {
      console.log("DataField",e.dataField,"parentType",e.parentType)
      if(e.dataField === "dbs" && e.parentType === "dataRow") {
           e.editorName = "dxTagBox"; 
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
