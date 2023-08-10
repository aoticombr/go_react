import React from 'react';
import {PageContent} from '../../../shared/styles';
import {Container} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {  };
  }
   
  async componentDidMount() {
  } 
 

  render () {
    return (
        <>
            <PageContent>
            <Container>
            </Container>
            </PageContent>
        </>
    )  
    
  }
    
    
}

export default withRouter(Home);
