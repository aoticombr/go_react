import React, {useState, useEffect, useCallback }  from 'react';
import { PageContent } from '../../../shared/styles';
import {Container,  Row, Table, Col,Alert,  Modal  } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

import baseApi from "../../../services/api";
import {getCurrentURL} from "../../../configs/baseURLS";

import { Lookup } from 'devextreme-react/lookup';
import { Button } from 'devextreme-react/button';
import {
  DataGrid,
  ColumnChooser,
  ColumnFixing,
  Column,
  RequiredRule,
  FilterRow,
  SearchPanel,
  GroupPanel,
  Selection,
  Summary,
  GroupItem,
  Editing,
  Grouping,
  Toolbar,
  Item,
  MasterDetail,
  Export
} from 'devextreme-react/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import { DateRangeBox } from 'devextreme-react/date-range-box';
import { DropDownButton } from 'devextreme-react/drop-down-button';


const Class_Crud = () => {

  const history = useHistory(); //chamado do hook
  //
  const [botnames, setBotnames] = useState({});
  const [botname, setBotname] = useState(null);

  const [botdbs, setBotdbs] = useState({});
  const [botdb, setBotdb] = useState(null);

  const [error, setError]        = useState('');
  const [isLoading, setLoading]  = useState(true);
  const [itens, setItens] = useState({});

  const [mov, setMov] = useState([]);
  const [det, setDet] = useState([]);

  const exportFormats = ['xlsx', 'pdf'];
  
  const simpleLookupLabel = { 'aria-label': 'Simple lookup' };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate]     = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [minDate, setMinDate]     = useState(new Date(new Date().setDate(new Date().getDate() - 14)));
  const [maxDate, setMaxDate]     = useState(new Date(new Date().setDate(new Date().getDate() + 14)));

  const [dtini, setDtIni] = useState(new Date(minDate));
  const [dtfim, setDtFim] = useState(new Date(maxDate));

  const [show_det, setShow_det] = useState(false);
  //
  
                                                             
  

  async function getbotnames() {
    console.log("getbotnames:")
    try {
      const api = baseApi(getCurrentURL() )
      api.get('/botnames')
        .then(res => {
          setLoading(false);
          setBotnames(res.data);
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
  async function getbotdbs(botname) {
    console.log("getbotdbs:",botname)
    try {
      if (botname!==undefined && botname!=={} && botname!==null) {
        const api = baseApi(getCurrentURL() )
        api.get('/botdbs?name='+botname)
          .then(res => {
            console.log("getbotdbs 2:",res.data)
            setLoading(false);
            setBotdbs(res.data);
          });
      }
             
   }                                                                      
   catch(erro){                                                           
     if (error.message) {                                                 
       setError(error.message);                                           
     } else {                                                             
       setError("Ocorreu um erro durante a criação do tbaoti_0024. ");    
     }                                                                    
   };                                                                     
           
  }
  async function getmov() {
    console.log("getbotnames:")
    try {
      const api = baseApi(getCurrentURL() )
      api.get('/movlist?bot='+botname+'&db='+botdb+'&dtini='+dtini.toISOString()+'&dtfim='+dtfim.toISOString())
        .then(res => {
          setLoading(false);
          setMov(res.data);
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
  function onValueChangedbotname (e) {
    console.log("onValueChangedbotname:",e)
    setBotname(e.value);
  }
  function onValueChangeddb (e) {
    console.log("onValueChangedDB:",e)
    setBotdb(e.value);
  }
  function exportGrid(e) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook(); 
      const worksheet = workbook.addWorksheet("Main sheet"); 
      exportDataGrid({ 
        worksheet: worksheet, 
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) { 
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx"); 
        }); 
      }); 
      e.cancel = true;
    } 
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('DataGrid.pdf');
      });
    }
  }
  function btnMovimento(row) {
    console.log("btnMovimento:",row)
    console.log("getbotnames:")
    try {
      const api = baseApi(getCurrentURL() )
      api.get('/movdet?bot='+botname+'&db='+botdb+'&id='+row.id)
        .then(res => {
          setLoading(false);
          setDet(res.data);
          console.log("res.data:",res.data)
          setShow_det(true)
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
  useEffect(() => { 
    getbotnames();
    //setBotdb({})
  }, []);

  useEffect(() => { 
    console.log("useEffect botname:", botname)
    getbotdbs(botname);
    setBotdb(null)
  }, [botname]);

   
  const onValueChangedDate = (e) => {
    setDtIni(new Date(e.value[0]));
    setDtFim(new Date(e.value[1]));
  }
  const AcoesDownOptions = { width: 130 };  
    
  return (
      <>
        <PageContent>
          <Container>
          <Row>
            <Col>
                <h3>Movimento</h3>
            </Col>
            <Col>
          
                <Link className='btn btn-success float-right' to={'/'}>Voltar</Link>
            </Col>
          </Row>  
          {error && renderError()}
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <Row>
                <Col lg={6} sm={12}>
                
                <Lookup
                  items={botnames}
                  value={botname}
                 // defaultValue={botname}
                  onValueChanged={onValueChangedbotname}
                  inputAttr={simpleLookupLabel}
                />
                <Lookup
                  items={botdbs}
                  value={botdb}
                 // defaultValue={botdb}
                  onValueChanged={onValueChangeddb}
                  inputAttr={simpleLookupLabel}
                />
                <DateRangeBox
                      startDate={startDate}
                      endDate={endDate}
                      min={minDate}
                      max={maxDate}
                      startDateLabel="Dt. Inicial"
                      endDateLabel="Dt. Final"
                      labelMode="floating"
                      displayFormat="EEEE, MMM d"
                      useMaskBehavior={true}
                      showClearButton={true}
                      openOnFieldClick={false}
                      onValueChanged={onValueChangedDate}
                  />
                <Button
                  text="Procurar"
                  variant={('primary')} 
                  onClick={() => getmov()}
                />
                <DataGrid 
                id="dataGrid" 
                dataSource={mov}
                keyExpr="id"
                allowColumnResizing={true}
                columnAutoWidth={true}
                allowColumnReordering={true}
                width={1000}
                height={400}
                onExporting={exportGrid}
                
                >      
                <Column                                                                                            
                  width={100}  
                  caption="Ações"                                                                        
                  cellRender={(row) => (  <DropDownButton 
                                                                                       
                    height="22" 
                    width="auto"  
                    resizeEnabled="true"                                                                     
                    text="Opções"       
                    dropDownOptions={AcoesDownOptions}                                                               
                    items={[                                                                           
                      { text: 'Ver Movimento' ,minWidth:"420", onClick: () => btnMovimento(row.data)},                      
                    ]}                                                                                 
                    />   )}                                                                                     
                  />  
                <Column dataField="id" caption="Id Mov" />      
                <Column dataField="cod_empresa" caption="Cód. Emp." />
                <Column dataField="nome_empresa" caption="Nome. Emp." />
                <Column dataField="cod_operacao" caption="Cód. Op." />
                <Column dataField="desc_operacao" caption="Desc. Op." />
                
                <Column dataField="tipo_envio" caption="Tipo Envio" />
                <Column dataField="status" caption="Status" />
                <Column dataField="qtd_erros" caption="Qtde. Tentativas" />
                <Column dataField="dt_ref" caption="Dt. Ref." />
                <Column dataField="dt_proc" caption="Dt. Proc." />
                <Column dataField="dtinc" caption="Dt. Inc." />
                <Column dataField="dtalt" caption="Dt. Alt." />
                
                <Column dataField="userinc" caption="User Inc." />
                <Column dataField="useralt" caption="User Alt." />     
                      <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={false}
                            allowAdding={false}
                      />
                  <Export enabled={true} formats={exportFormats} />    
                </DataGrid>  
                <Modal 
                      show={show_det} 
                      backdrop="static"
                      animation={false}
                      id={1}
                      size="xl"
                      >
                      <Modal.Header closeButton>
                        <Modal.Title>{'Detalhe'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        
                      <DataGrid 
                id="dataGrid" 
                dataSource={det}
                keyExpr="id_mov_det"
                allowColumnResizing={true}
                columnAutoWidth={true}
                allowColumnReordering={true}
                width={1000}
                height={400}
                onExporting={exportGrid}
                
                >      
                {/* <Column                                                                                            
                  width={100}  
                  caption="Ações"                                                                        
                  cellRender={(row) => (  <DropDownButton 
                                                                                       
                    height="22" 
                    width="auto"  
                    resizeEnabled="true"                                                                     
                    text="Opções"       
                    dropDownOptions={AcoesDownOptions}                                                               
                    items={[                                                                           
                      { text: 'Ver Movimento' ,minWidth:"420", onClick: () => btnMovimento(row.data)},                      
                    ]}                                                                                 
                    />   )}                                                                                     
                  />   */}
                <Column dataField="tarefa" caption="Id Mov" width={150}/>    
                <Column dataField="status_detalhe" caption="Desc. Op." />                
                <Column dataField="id_art_env_detalhe" caption="Tipo Envio" />
                <Column dataField="id_art_ret_detalhe" caption="Status" />
                <Column dataField="dtinc_detalhe" caption="Qtde. Tentativas" />
                <Column dataField="userinc_detalhe" caption="Dt. Ref." />
                <Column dataField="dtalt_detalhe" caption="Dt. Proc." />
                <Column dataField="useralt_detalhe" caption="Dt. Inc." />
                <Column dataField="versao" caption="Dt. Alt." />                
                <Column dataField="id_operacao" caption="User Inc." />
                      <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={false}
                            allowAdding={false}
                      />
                  <Export enabled={true} formats={exportFormats} />    
                </DataGrid>                                                                     

                      </Modal.Body>
                      <Modal.Footer>
                        {/* <Button variant="secondary" onClick={Form_CLI00006_Close}>
                          Cancelar
                        </Button>
                        <Button variant="secondary" onClick={Remover_CLI00006}>
                          Excluir
                        </Button>
                        <Button variant="primary" onClick={Gravar_CLI00006}>
                          Salvar
                        </Button> */}
                      </Modal.Footer>
                    </Modal>
                </Col>
              </Row>
            )}
          </Container>
        </PageContent>
      </>
  )
  
}

export default Class_Crud;
