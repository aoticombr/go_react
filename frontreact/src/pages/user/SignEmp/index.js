import React, {useState, useEffect} from 'react';
import {
  Button, Form, Container, Row, Col, Alert
} from 'react-bootstrap';
import {BoxForm, BoxContent} from '../../../shared/styles';
import {Link,withRouter} from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import AdminService from '../../../services/ws_login';
import {login} from '../../../services/auth';
import { useHistory } from 'react-router-dom';



const SignEmp = () => {
   const [id, setId] = useState('');
   const [id_emp, setId_emp] = useState('');
   const [id_grupo, setId_grupo] = useState('');
   const [cgEmp, setCgEmp] = useState([]);
   const [error, setErro] = useState('');
   const history = useHistory();


    function Carga() {
    const ws = new AdminService();
    ws.getEmp()
    .then((result)=>{  
      setCgEmp(result);
    })
    .catch((error)=>{
      console.log('error...'); 
      console.log(error);
      if (error.message) {
        setErro(error.message);
      } else {
        setErro("Ocorreu um erro ao puxar as empresas");
      } 
      
    });
   }

  useEffect( () => { 
     Carga(); 
  }, []);
  useEffect( () => { 
    if (id) {
      const _acess = cgEmp.find((f) => {return f.key === id});
      setId_emp(_acess.id_emp);
      setId_grupo(_acess.id_grupo);
    } else {
      setId_emp(null);
      setId_grupo(null);
    }
    
    
 }, [id]);


  



  async function handleSignIn (event) {
    
      event.preventDefault();
     
      if(!id ) {
        setErro("Escolha uma empresa");
      }
      else {
        setErro("");
        const ws = new AdminService();
        ws.setEmp(id_emp, id_grupo)          
          .then((result)=>{  
            console.log('result...setEmp'); 
            console.log(result);        
            login(result )
            history.push("/");
          })
          .catch((error)=>{
            console.log('error...'); 
            console.log(error);
            if (error.message) {
              setErro(error.message);
            } else {
              setErro("Ocorreu um erro ao logar");
            } 
            
        });
          
       
        
      }
  }
  function renderError() {
    return (
        <Alert variant="danger">
            {error}
        </Alert>
    )
}

    return (
      <Container >
        <Row className="justify-content-md-center"> 
           <Col xs={12} md={6}>
                <BoxContent>
                  <img src={Logo} alt='Escolha de Empresa' />
                </BoxContent>
                <BoxForm>
                    <h2> Escolha de Empresa</h2>
                    {error && renderError()}
                    <Form onSubmit={handleSignIn}>   
                        <Form.Group>                                                                                       
                          <Form.Label>Empresa:</Form.Label>                                      
                          <Form.Select                                                                
                            aria-label="Default select example" size="lg"                                                                     
                            value={id}
                            onChange={e => setId(e.target.value)}                               
                          >                                                                           
                          <option value=""></option>                                                                         
                          {cgEmp?.map((item)=> <option value={item.key}>{item.label}</option>)}    
                          </Form.Select>                                                                 
                        </Form.Group>  


                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Aplicar
                            </Button>
                        </div>
                        
                    </Form>
                </BoxForm>
                <BoxContent>
                    <p>Voltar Para Pagina Principal</p>
                    <Link className="button" to="/">Voltar</Link>
                </BoxContent>
                
           </Col>
        </Row>          
      </Container> 
    )  
  
}

export default withRouter(SignEmp);
