import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import SignInPage from './../pages/public/SignIn';
import HomePage   from './../pages/secure/Home';
import CONFIGPage     from './../pages/secure/CONFIG/config';
import CLI00001ListPage  from './../pages/secure/CLI00001/list';
import CLI00001EditPage  from './../pages/secure/CLI00001/edit';
import RoutePrivateUser from './route-user';


export default function Routes () {
  return (
     <Router>
       <Switch>
         
         <Route            exact path="/signin"                        component={SignInPage} />
         <RoutePrivateUser exact path="/"                              component={HomePage} />
         <RoutePrivateUser exact path="/CONFIG"                        component={CONFIGPage} />
         <RoutePrivateUser exact path="/CLI00001"                      component={CLI00001ListPage} />
         <RoutePrivateUser exact path="/CLI00001/row/:chave/:metodo"   component={CLI00001EditPage} />
         
       </Switch>  
     </Router> 
  )  
}



