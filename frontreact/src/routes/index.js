import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import SignInPage from './../pages/public/SignIn';
import HomePage   from './../pages/secure/Home';
import CONFIGPage     from './../pages/secure/CONFIG/config';
import MOVIMENTOPage     from './../pages/secure/MOVIMENTO/mov';
import RoutePrivateUser from './route-user';


export default function Routes () {
  console.log('window.location.href:',window.location)
  return (
     <Router>
       <Switch>
         
         <Route            exact path="/signin"                        component={SignInPage} />
         <RoutePrivateUser exact path="/"                              component={HomePage} />
         <RoutePrivateUser exact path="/CONFIG"                        component={CONFIGPage} />
         <RoutePrivateUser exact path="/MOVIMENTO"                     component={MOVIMENTOPage} />         
       </Switch>  
     </Router> 
  )  
}



