import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
class App extends Component {
  render() {
    return (
      <div>
        <div>这里是导航栏</div>
        <Switch>
          {
            adminRouter.map(route=>{
              return (
                <Route 
                  key={route.pathname} 
                  path={route.pathname}
                  exact={route.exact} 
                  render={(routeProps)=>{
                    return <route.component {...routeProps} />
                  }} 
                /> 
              )
            })
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </div>
    )
  }
}



export default App;
