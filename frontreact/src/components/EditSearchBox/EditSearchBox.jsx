import React, {useState}  from 'react';

import "./EditSearchBox.css";
import Form from 'react-bootstrap/Form';
import {  Row, Table, Col,Alert, Button, Modal  } from 'react-bootstrap';
//import {Container,Button,Table, Row, Col, Alert} from 'react-bootstrap';

const EditSearchBox = (props) => {
    const [showSearch, setshowSearch] = useState(false);
    const [limit, setLimit]   = useState('50');
    const [pesq, setPesq]   = useState('');
    const [isLoading]   = useState(false);
    const [_dados, set_Dados]   = useState([]);
    //
   // const [id, setID]       = useState(props?.valueID);
   // const [desc, setDESC]   = useState(props?.valueDESC);
    //
    function ShowModel(value) {  
        
          setshowSearch(value);
         
    }
    async function procurar(event){
        event.preventDefault();
        let _filtros = [];                 
        //filtros por data
        _filtros.push({campo:props.descricao,tipo:'=%',valor:pesq});                   
        //filtros limite de dados
        const filtros = {filtros:_filtros, limit:limit};  
        const ws = new props.classSearch();          
        await ws.getLista(filtros)
          .then((res)=>{            
            set_Dados(res);
             
        })
    }
    async function selecionar(value){
      
       if (props?.onChangeID) props?.onChangeID(value.id);
       if (props?.onChangeDESC) props?.onChangeDESC(value.desc);
       //setshowSearch(false);
       ShowModel(false);
    }
    function RenderLine({row}) {
      const coluns = [];
      for (let index = 0; index < props.coluns_data.length; index++) {   
        coluns.push(
        <td>
            {row[props.coluns_data[index]]}
        </td>);
      }
      //
      return (
            <tr key={row.id}>
               <td>
                 <Button variant="success"  onClick={()=>selecionar({id:row.id,desc:row[props.descricao]})} >Selecionar</Button>
               </td>                
               {coluns}                 
            </tr>
        )
    }
    //=========================
    function RenderTable({dados}) {
      const coluns = [];
      for (let index = 0; index < props.coluns_title.length; index++) {   
        coluns.push(        
        <th>{props.coluns_title[index]}</th> 
        );
      }
          return (
              <Table striped bordered hover>
                  <thead>
                      <tr>
                        <th width="100">Selecionar</th>                        
                        {coluns}  
                      </tr>
                  </thead>
                  <tbody>
                      {dados.map((item)=> <RenderLine key={item.id} row={item}/>)}
                  </tbody>
              </Table>
          )
    }
   

  return (
    <div className="EditSearchBox">
      <Form.Group>
      <Row>
      <Form.Label>{props?.titulo}</Form.Label> 
      </Row>
       
      <Row>
        <Col xs={12} md={10}>
          <Form.Control
                          disabled={true}
                          type={props?.type}
                          placeholder={props?.placeholder}
                          value={props?.valueDESC}
          />
        </Col>
        <Col xs={12} md={2}>
          <Button 
             disabled={props?.disabled}
             variant="secondary" 
             onClick={() => {ShowModel(true)}}
          >
                            Procurar
          </Button>
        </Col>
      </Row>
      
      
      </Form.Group>
      
      <Modal 
      show={showSearch} 
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => {ShowModel(false)}}
      keyboard={false}
      animation={false}
    //  id={_row_now.id}
      >
      <Modal.Header closeButton>
        <Modal.Title>{props?.modaltitle}</Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
      
          <Row>
              <Row>
              <h3>Filtros</h3>
              </Row>
              <Row>
                <Col xs={12} md={3}>
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
                </Col>                            
                <Col xs={12} md={5}>
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
                </Col>
                <Col xs={12} md={2}>
                  <Form.Group>    
                    <Form.Label>.        .</Form.Label>                                 
                    <Button variant="warning" onClick={procurar}>Procurar</Button>
                  </Form.Group>                              
                </Col> 
                <Col xs={12} md={2}>
                  <Form.Group>   
                    <Form.Label>.        .</Form.Label>                                   
                    <Button variant="secondary" onClick={() => {ShowModel(false)}} > Cancelar </Button>
                  </Form.Group>                              
                </Col> 
              </Row>  
          </Row>
          
        {!isLoading &&  <RenderTable dados={_dados} />  }
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>                
    </div>
  );
};
//onChange={e => setId(e.target.value)}
export default EditSearchBox;
