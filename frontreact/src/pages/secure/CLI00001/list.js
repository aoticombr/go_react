import React, {useState, useEffect,useRef,useCallback}  from 'react';
import {PageContent} from '../../../shared/styles';
import {DtaToTextBr, DtaToTextEn} from '../../../lib/utils.date';
import {BooleanToText} from '../../../lib/utils.boolean'; 
 import {
  Container,
  Button,
   Table, 
   Row as BsRow, 
   Col as BsCol, 
   Alert
} from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import { useHistory } from 'react-router';
import FiltroMenu  from '../../../routes/route-filtro';
import ResponsiveBox, {
  Row,
  Col,
  Item,
  
  Location,
} from 'devextreme-react/responsive-box';
import Form from 'react-bootstrap/Form';
import DataGrid, {
  Column, Editing, ValidationRule, Button as ButtonDev2 
  , Toolbar, //Item, 
  Scrolling,Paging,Pager,FilterRow,Summary,TotalItem,Lookup,LoadPanel
} from 'devextreme-react/data-grid';
import { DropDownButton } from 'devextreme-react/drop-down-button';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';    
import notify from 'devextreme/ui/notify';                                 
import 'devextreme/dist/css/dx.light.css';
import './styles.css';
import Class_WS_gio from './class';
import { locale, loadMessages,formatNumber } from 'devextreme/localization';                      
// Importe os arquivos de tradução do idioma desejado                        
import ptMessages from 'devextreme/localization/messages/pt.json';           
// Carregue as mensagens do idioma                                           
loadMessages(ptMessages);                                                     
// Defina o idioma como "pt"                                                  
locale('pt');                                                                 

const Class_List = () => {
  const tabela = 'gio';
  const navigate = useHistory();                             
  const scrollViewRef = useRef(null);                        
  const {url} = useRouteMatch();                             
  const [isLoading, setIsLoading]   = useState(false);        
  const [popupVisible, setPopupVisible]   = useState(false);  
  const [popupMSG, setPopupMSG]   = useState('');              
  const [_dados, set_Dados]   = useState([]);
  const [filtro, setFiltro]   = useState('A1.descricao');
  const [limit, setLimit]   = useState('50');
  const [pesq, setPesq]   = useState('');
  //filtros por data
  //filtros BOOLEANO
function PopupMSG(MSG) {                   
   setPopupMSG(MSG) ;                         
   setPopupVisible(true);                     
}                                          
function PopupCLOSE(e) {                   
   setPopupMSG('') ;                        
   setPopupVisible(false);                 
 }                                         
 const closeButtonOptions = {              
   text: 'Close',                           
    onClick: PopupCLOSE,                    
 };                                        

  async function procurar (event) {                           
  let _filtros = [];                 
  //filtros por data
  //filtros booleano
  //filtros fixo
  _filtros.push({campo:filtro,tipo:'=%',valor:pesq});                   
 //filtros limite de dados
  const filtros = {filtros:_filtros, limit:limit};                      
    event.preventDefault();
    const ws = new Class_WS_gio();
    
    await ws.getLista(filtros)
    .then((res)=>{
      setIsLoading(false);
      set_Dados(res);
       
    })
  }

useEffect( () => { 
    const filtros = {filtros:[{campo:filtro,tipo:'=%',valor:pesq}], limit:limit};
    const ws = new Class_WS_gio();    
          ws.getLista(filtros)
          .then((res)=>{
            setIsLoading(false);
            set_Dados(res);        
          })
 
  }, []); 
  function btnIncluir(e)  {                                             
    navigate.push(url+'/row/0-0-0-0-0/insert');                        
  }                                                                    
  function btnEditar(data)  {                                            
    navigate.push(url+'/row/'+data.id+'/edit');             
  }                                                                   
  function btnExcluir(data) {                                            
    navigate.push(url+'/row/'+data.id+'/delete');          
  }                                                                   
  return (
    <>
<div id="page">
<Popup                                             
    visible={popupVisible}                          
    dragEnabled={false}                            
    hideOnOutsideClick={true}                       
    showCloseButton={false}                         
    showTitle={true}                                
    title="Information"                             
    width={300}                                     
    height={280}                                    
  >                                                 
    <p>                                             
      <span>{popupMSG}</span>&nbsp;                 
    </p>                                            
    <ToolbarItem                                     
      widget="dxButton"                              
      toolbar="bottom"                              
      location="after"                              
      options={closeButtonOptions}                   
    />                                              
  </Popup>                                          
        <ResponsiveBox
          singleColumnScreen="sm"
         >
          <Row ratio={1}></Row>
          <Row ratio={2}></Row>
          <Row ratio={1}></Row>

          <Col ratio={1}></Col>
          <Col ratio={3} screen="lg"></Col>
          <Item>
            <Location              row={0}              col={0}              colspan={3}              screen="lg"            ></Location>
            <Location              row={0}              col={0}              colspan={2}              screen="sm"            ></Location>
            <div className="header item">
            Cadastro de gio
            </div>
          </Item>
          <Item>
            <Location  row={1}   col={1}  screen="lg"  ></Location>
            <Location  row={1}   col={0}  colspan={2}   screen="sm"  ></Location>
            <div className="content item">
            <Button variant="primary"  onClick={btnIncluir}   >Cadastrar</Button>
            {!isLoading && 
               <DataGrid
                 className={'dx-card wide-card'}
                 height={200}                   
                 showBorders={true}
                 focusedRowEnabled={true}
                 defaultFocusedRowIndex={0}
                 columnAutoWidth={true}
                 columnHidingEnabled={false}
                 dataSource={_dados}
                 keyExpr="id">
<Column                                                                                            
                  width={100}  
            caption="Ações"                                                                        
            cellRender={(row) => (                                                                 
              <DropDownButton                                                                      
                height="22"                                                                        
                text="Opções"                                                                      
                items={[                                                                           
                  { text: 'Editar' , onClick: () => btnEditar(row.data)},                          
                  { text: 'Excluir', onClick: () => btnExcluir(row.data)},                         
                ]}                                                                                 
              />                                                                                   
            )}                                                                                     
          />                                                                                        
                 
                <Column dataField="id" caption="id" 
                  //fixed={false}
                />
                <Column dataField="lk_id_db" caption="id_db" 
                  //fixed={false}
                />
                <Column dataField="dt_inc" caption="dt_inc"  dataType="date" 
                  //fixed={false}
                />
                <Column dataField="dt_alt" caption="dt_alt"  dataType="date" 
                  //fixed={false}
                />
                <Column dataField="lk_user_inc" caption="user_inc" 
                  //fixed={false}
                />
                <Column dataField="lk_user_alt" caption="user_alt" 
                  //fixed={false}
                />
                <Column dataField="descricao" caption="descricao" 
                  //fixed={false}
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} showInfo={true} />
                <FilterRow visible={true} />
                </DataGrid>  }
            </div>
          </Item>
          <Item>
            <Location    row={1}       col={0}    screen="lg"     ></Location>
            <Location    row={2}       col={0}    screen="sm"     ></Location>
            <div className="left-side-bar item">
              <Form onSubmit={procurar}>
                <Form.Group controlId="FiltroGroup">
                  <BsRow>
                    <BsRow>
                      <h3>Filtros</h3>
                    </BsRow>
                    <BsRow>
                      <Form.Group>                                    
                        <Button variant="warning" type="submit">Procurar</Button>
                      </Form.Group>                              
                    </BsRow>                            
                    <BsRow>
                      <Form.Group>
                        <Form.Label>Campo:</Form.Label>
                        <Form.Select 
                          aria-label="Default select example"
                          size="lg"
                          value={filtro}
                          onChange={value => setFiltro(value.target.value)} 
                          >                                 
                                <option value="B2.">id_db</option>
                                <option value="A1.dt_inc">dt_inc</option>
                                <option value="A1.dt_alt">dt_alt</option>
                                <option value="B5.">user_inc</option>
                                <option value="B6.">user_alt</option>
                                <option value="A1.descricao">descricao</option>
                        </Form.Select>
                      </Form.Group>
                    </BsRow>
                    <BsRow>
                      <Form.Group>
                        <Form.Label>Limit:</Form.Label>
                        <Form.Select 
                          aria-label="Default select example"
                          size="lg"
                          onChange={value => setLimit(value.target.value)} 
                          >                                 
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </Form.Select>
                      </Form.Group>  
                    </BsRow>                            
                    <BsRow>
                      <Form.Group>
                          <Form.Label>Conteudo:</Form.Label> 
                          <Form.Control 
                            type="text"
                            size="lg"
                            placeholder="Digite aqui o dado desejado" 
                            onChange={value => setPesq(value.target.value)} 
                            value={pesq}
                          />
                      </Form.Group>                              
                    </BsRow>
                  </BsRow> 
                </Form.Group>                     
              </Form>
            </div>
          </Item>
          <Item>
            <Location              row={2}              col={0}              colspan={3}              screen="lg"            ></Location>
            <Location              row={3}              col={0}              colspan={2}              screen="sm"            ></Location>
            <div className="footer item">
              <p>NBS Sistema Integrados</p>
            </div>
          </Item>
        </ResponsiveBox>
      </div>
    </>
  )



}

export default Class_List;
