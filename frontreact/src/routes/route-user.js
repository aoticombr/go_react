import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAuthenticate} from '../services/auth';
import RoutePrivateMenu  from './route-menu';

const RouterWrapper = ({component: Component, ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      isAuthenticate() ? (<>
    
      <RoutePrivateMenu title={'aa'} > 
      <Component /> 
      </RoutePrivateMenu > 
      
      </>    ) : (
        <Redirect to={{pathname:"/signin", state: {from: props.location}}} /> 
      )
     
    }
  />
)

export default RouterWrapper;
