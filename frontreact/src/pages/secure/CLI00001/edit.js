import React, {useState, useEffect}  from 'react';
import Header from '../../../shared/header';
import { PageContent } from '../../../shared/styles';
import {DtaToTextEn} from '../../../lib/utils.date';
import {getDescJson,getDescJson2, getTotal, setValueJson} from '../../../lib/utils.json';
import {onGenericoFocus, onGenericoBlur, localStringToNumber} from '../../../lib/utils.currency';  
import {Container,  Row, Table, Col,Alert, Button, Modal  } from 'react-bootstrap';
import {CheckNumberNull, CheckBoolNull} from '../../../lib/utils.check';
import {Link, useParams, useHistory} from 'react-router-dom';
import {v4 as uuid } from 'uuid';
import Form from 'react-bootstrap/Form';
import EditSearchBox from '../../../components/EditSearchBox/EditSearchBox';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InputGroup from 'react-bootstrap/InputGroup';
import InputMask from 'react-input-mask';
import Accordion from 'react-bootstrap/Accordion'; 
import md5 from 'md5';
import Class_WS_gio from './class';


const Class_Crud = () => {
  const _tabela = 'gio';
  const history = useHistory(); //chamado do hook
  //
  const {chave, metodo} = useParams();
  //
  const [id, setId]   = useState('');
  const [id_db, setId_db]   = useState('');
  const [dt_inc, setDt_inc]   = useState('');
  const [dt_alt, setDt_alt]   = useState('');
  const [user_inc, setUser_inc]   = useState('');
  const [user_alt, setUser_alt]   = useState('');
  const [descricao, setDescricao]   = useState('');
  //
  const [_dados, set_Dados]      = useState([]);
  const [_row_now,set_row_now]   = useState({}); 
  const [_row_mode,set_row_mode] = useState(''); 
  const [isLoading, setLoading]  = useState(true);
  const [error, setError]        = useState('');
  //
  
const _CPVisivel =                       
[                                        
  {C:'id', I:true, U:true, D:true},
  {C:'id_db', I:true, U:true, D:true},
  {C:'dt_inc', I:true, U:true, D:true},
  {C:'dt_alt', I:true, U:true, D:true},
  {C:'user_inc', I:true, U:true, D:true},
  {C:'user_alt', I:true, U:true, D:true},
  {C:'descricao', I:true, U:true, D:true},
];                                       
function getAcess(cp,value) {                                    
  const _acess = cp.find((f) => {return f.C === value});
  let check = false;                                             
  if (metodo === 'insert') check = _acess.I;                     
  if (metodo === 'edit')   check = _acess.U;                     
  if (metodo === 'delete') check = _acess.D;                     
  return check;                                                  
}                                                              
  

  async function getDados(chave) {
    try {
        console.log('getDados......');
        if ((metodo === 'edit') |  (metodo === 'delete')) {
          let res = await (new Class_WS_gio()).getRow(chave);
          set_Dados(res);
          setLoading(false);
          //
          setId(res.id);
          setId_db(res.id_db);
          setDt_inc(DtaToTextEn(res.dt_inc));
          setDt_alt(DtaToTextEn(res.dt_alt));
          setUser_inc(res.user_inc);
          setUser_alt(res.user_alt);
          setDescricao(res.descricao);
        } else if (metodo === 'insert') {
          let res = await (new Class_WS_gio()).getNewRow();
          setId(res.id);
          setId_db(res.id_db);
          setDt_inc(DtaToTextEn(res.dt_inc));
          setDt_alt(DtaToTextEn(res.dt_alt));
          setUser_inc(res.user_inc);
          setUser_alt(res.user_alt);
          setDescricao(res.descricao);
          setLoading(false);
        } else {
          console.log('metodo......outros');
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

  function renderError (){
   
  
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    )
  }

  async function SalvarNoBanco (event)  {
    try {  
      event.preventDefault();
           if ((metodo === 'insert') & (1===2)){ 
    } else if ((metodo === 'insert') & (CheckNumberNull(id))) { setError(`Informe todos os campos para adicionar o gio insert[id]`);
    } else if ((metodo === 'insert') & (CheckNumberNull(id_db))) { setError(`Informe todos os campos para adicionar o gio insert[id_db]`);
    } else if ((metodo === 'insert') & (!dt_inc)) { setError(`Informe todos os campos para adicionar o gio insert[dt_inc]`);
    } else if ((metodo === 'insert') & (!dt_alt)) { setError(`Informe todos os campos para adicionar o gio insert[dt_alt]`);
    } else if ((metodo === 'insert') & (CheckNumberNull(user_inc))) { setError(`Informe todos os campos para adicionar o gio insert[user_inc]`);
    } else if ((metodo === 'insert') & (CheckNumberNull(user_alt))) { setError(`Informe todos os campos para adicionar o gio insert[user_alt]`);
    } else if ((metodo === 'insert') & (!descricao)) { setError(`Informe todos os campos para adicionar o gio insert[descricao]`);
    } else if ((metodo === 'edit') & (CheckNumberNull(id))) { setError(`Informe todos os campos para adicionar o gio insert[id]`);
    } else if ((metodo === 'edit') & (CheckNumberNull(id_db))) { setError(`Informe todos os campos para adicionar o gio insert[id_db]`);
    } else if ((metodo === 'edit') & (!dt_inc)) { setError(`Informe todos os campos para adicionar o gio insert[dt_inc]`);
    } else if ((metodo === 'edit') & (!dt_alt)) { setError(`Informe todos os campos para adicionar o gio insert[dt_alt]`);
    } else if ((metodo === 'edit') & (CheckNumberNull(user_inc))) { setError(`Informe todos os campos para adicionar o gio insert[user_inc]`);
    } else if ((metodo === 'edit') & (CheckNumberNull(user_alt))) { setError(`Informe todos os campos para adicionar o gio insert[user_alt]`);
    } else if ((metodo === 'edit') & (!descricao)) { setError(`Informe todos os campos para adicionar o gio insert[descricao]`);
    } else {                                                                                                   
       if (metodo === 'edit') {                                                                          
         let ok = await (new Class_WS_gio()).getUpdate(id,{id_db,dt_inc,dt_alt,user_inc,user_alt,descricao,row_status: "old"});    
       //  window.close();//                                                                            
           history.push('/'+_tabela);                                                                         
       } else if (metodo === 'insert') {                                                                      
         let ok = await (new Class_WS_gio()).getInsert({id,id_db,dt_inc,dt_alt,user_inc,user_alt,descricao});    
        // window.close();//                                                                       
           history.push('/'+_tabela);                                                                         
       } else if (metodo === 'delete') {                                                                      
         let ok = await (new Class_WS_gio()).getDelete(id);                
        // window.close();//                                                                             
           history.push('/'+_tabela);                                                                          
       }                                                                                                      
      }                                                                                                      
    }catch(erro){                                                                                           
      if (error.message) {                                                                                  
        setError(error.message);                                                                            
      } else {                                                                                              
        setError("Ocorreu um erro durante a criação do gio. ");                                     
      }                                                                                                     
    };                                                                                                      
  }

   useEffect(() => { 
        getDados(chave);
   }, []);
  //totalizador vem deseabilitado ative somente se precisar                                                                                                               
  // useEffect(() => {                                                                                             
  //    set_row_now(_row_now=>({..._row_now, total:((Number(_row_now.qtde)*Number(_row_now.valor)).toFixed(2))})); 
  //  }, [_row_now.qtde, _row_now.valor]);                                                                         


    return (
      <>
        <PageContent>
          <Container>
          <Row>
            <Col>
                <h3>Dados do gio</h3>
            </Col>
            <Col>
                <Link className='btn btn-success float-right' to={'/gio'}>Voltar</Link>
            </Col>
          </Row>  
          {error && renderError()}
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <Row>
                <Col lg={6} sm={12}>
              
                  <Form onSubmit={SalvarNoBanco}>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'id')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>id*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                          disabled
                          placeholder="Digite um id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'id_db')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>id_db*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                          disabled
                          placeholder="Digite um id_db"
                        value={id_db}
                        onChange={e => setId_db(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'dt_inc')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>dt_inc*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="date"
                          disabled
                        placeholder="Digite um dt_inc"
                        value={dt_inc}
                        onChange={e => setDt_inc(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'dt_alt')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>dt_alt*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="date"
                          disabled
                        placeholder="Digite um dt_alt"
                        value={dt_alt}
                        onChange={e => setDt_alt(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'user_inc')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>user_inc*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                          disabled
                          placeholder="Digite um user_inc"
                        value={user_inc}
                        onChange={e => setUser_inc(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'user_alt')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>user_alt*:</Form.Label>
                        <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                          disabled
                          placeholder="Digite um user_alt"
                        value={user_alt}
                        onChange={e => setUser_alt(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group 
                     style={{ display: (getAcess(_CPVisivel,'descricao')===false) ? 'none' : 'block' }}
                    >
                      <Form.Label>descricao*:</Form.Label>
                        <InputGroup className="mb-3">
                        <InputGroup.Text >@</InputGroup.Text>
                      <Form.Control
                        type="text"
                          disabled
                          maxLength={100}
                          placeholder="Digite um descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                      />
                        </InputGroup>
                    </Form.Group>
 <Tabs                                         
             defaultActiveKey="tab0"         
             id="uncontrolled-tab-example"      
             className="mb-3"  >                
  </Tabs>
                    <Button variant={((metodo === 'edit')|(metodo === 'insert'))?('primary'):('danger')} type="submit">{((metodo === 'edit')|(metodo === 'insert'))?('Gravar'):('Confirmar')}</Button>
                  </Form>
                </Col>
              </Row>
            )}
          </Container>
        </PageContent>
      </>
    )
  
}

export default Class_Crud;
