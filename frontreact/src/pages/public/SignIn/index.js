import React, {useState} from 'react';
import {
  Button, Form, Container, Row, Col, Alert
} from 'react-bootstrap';
import {BoxForm, BoxContent} from '../../../shared/styles';
import {Link,withRouter} from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import AdminService from '../../../services/ws_login';
import {login} from '../../../services/auth';
import { useHistory } from 'react-router-dom';


const SignIn = () => {

  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
 
  async function handleSignIn (event) {
      event.preventDefault();

      if(!user || !pass) {
        setError("Informe todos os campos para fazer login");
      }
      else {
        setError("");
        const ws = new AdminService();
        ws.login(user, pass)          
          .then((result)=>{  
            console.log('result...'); 
            console.log(result);        
            login(result)
            history.push("/");
          })
          .catch((error)=>{
            console.log('error...'); 
            console.log(error);
            if (error.message) {
              setError(error.message);
            } else {
              setError("Ocorreu um erro ao logar");
            } 
            
        });
          
       
        
      }
  }
  function renderError (){
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
                  <img src={Logo} alt='Aoti Admin' />
                </BoxContent>
                <BoxForm>
                    <h2> Login</h2>
                    {error && renderError()}
                    <Form onSubmit={handleSignIn}>
                        
                        <Form.Group controlId="emailGroup">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Digite seu e-mail" 
                            onChange={e => setUser(e.target.value)} 
                            value={user}
                            />
                        </Form.Group> 
                        <Form.Group controlId="passwordGroup">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control 
                            type="password"
                            placeholder="Digite sua senha" 
                            onChange={e => setPass(e.target.value)} 
                            value={pass}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Fazer login
                            </Button>
                        </div>
                        
                    </Form>
                </BoxForm>
                
           </Col>
        </Row>          
      </Container> 
    )  
    
}

export default withRouter(SignIn);
