import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import Navbar from 'react-bootstrap/Navbar';
import {withRouter} from 'react-router-dom';
import {Header, Logo} from './styles';
import {logout} from '../../services/auth';
import img from '../../assets/icone.png';
import { Meta } from '../meta';
import {DtaToTextBr, DtaToTextEn2} from '../../lib/utils.date';
import md5 from 'md5';

function MainMenu({history}) {
  async function handLogout() {
      await logout();
      history.push('/');
  }  
  return (
    <Header>
       <Meta/>
       <Navbar>
         <Container>
            <Navbar.Brand href="/">
              <Logo src={img} alt='aoti'/>
            </Navbar.Brand> 
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>  
              
            </Nav>
            <NavDropdown title="Config. Sistema" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/USER">Usuários</NavDropdown.Item>    
              <NavDropdown.Item href="/EMPRESAS">Grupo de Empresas</NavDropdown.Item>    
              <NavDropdown.Item href="/USEREMP">Usuario x Grupo</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Entidades" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/CLI00001">Clientes</NavDropdown.Item>    
              <NavDropdown.Item href="/CLI00010">Profissão</NavDropdown.Item>    
              <NavDropdown.Item href="/CLI00009">Paises</NavDropdown.Item>    
              <NavDropdown.Item href="/CLI00008">Nacionalidades</NavDropdown.Item>    
              <NavDropdown.Item href="/CLI00007">Estado Civil</NavDropdown.Item>    
              <NavDropdown.Item href="/gio">gio</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Config. Imobilizado" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/IMOB0010">Veiculos</NavDropdown.Item>    
              <NavDropdown.Item href="/IMOB0004">Combustivel</NavDropdown.Item>    
              <NavDropdown.Item href="/IMOB0001">Equipamentos</NavDropdown.Item>    
              <NavDropdown.Item href="/IMOB0002">Categoria de Equipamentos</NavDropdown.Item>    
              <NavDropdown.Item href="/IMOB0003">Situação de Equipamentos/Veiculos</NavDropdown.Item>    
              <NavDropdown.Item href="/EVENT0002">Tipo de Instrumentos</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Config. Eventos" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/EVENT0001">Locais de Eventos</NavDropdown.Item>    
              <NavDropdown.Item href="/EVENT0006">Tom</NavDropdown.Item>    
              <NavDropdown.Item href="/EVENT0004">Tipo de Eventos</NavDropdown.Item>    
              <NavDropdown.Item href="/EVENT0007">Funções</NavDropdown.Item>    
              <NavDropdown.Item href="/EVENT0008">Tipo Repertorio</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Config. Produtos" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/PROD0012">Serviço</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0002">Marca</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0001">Unidade</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0003">Modelo</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0005">Grupo</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0006">Sub Grupo</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0011">Produtos</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0004">Categoria</NavDropdown.Item>    
              <NavDropdown.Item href="/PROD0008">Cor</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Config. Financeiro" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/FIN0002">Moeda</NavDropdown.Item>    
              <NavDropdown.Item href="/FIN0001">Banco</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Config. Comercial" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/PROD0007">Tabela de Preço</NavDropdown.Item>    
            </NavDropdown>
            <NavDropdown title="Comercial" id="basic-nav-dropdown" href="/">        
              <NavDropdown.Item href="/EVENT0003">Proposta</NavDropdown.Item>    
            </NavDropdown>
            <Nav>
              <Nav.Link onClick={handLogout}>Sair</Nav.Link>   
              
            </Nav>
         </Container>
       </Navbar> 
    </Header>  
  )
}
export default withRouter(MainMenu);
