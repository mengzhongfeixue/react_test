import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'

import {mainRoutes} from './routes'


ReactDOM.render(
   <Router>
       <Switch>
           <Route path="/admin" render={(routeProps) =>{
               //TODO 权限， 需要登录才能访问 /admin
               return <App {...routeProps} />
           }} />
           {
               mainRoutes.map(route =>{
                   return <Route key={route.pathname} path={route.pathname} component={route.component} />
               })
           }
           <Redirect to="/admin" from="/" exact />
           <Redirect to="/404" />
       </Switch>
   </Router>, 
   document.getElementById('root')
);


