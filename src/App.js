import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'
import {Frame} from './components'
import {connect} from 'react-redux'

const menus = adminRoutes.filter(route => route.isNav ===true)

const mapStateToProps=(state)=>({
  role: state.user.role
})

@connect(mapStateToProps)
class App extends Component {
  render() {
    return (
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route=>{
              return (
                <Route 
                  key={route.pathname} 
                  path={route.pathname}
                  exact={route.exact} 
                  render={(routeProps)=>{
                   // console.log(route.roles.includes(this.props.role))
                   const hasPermission = route.roles.includes(this.props.role)
                    return hasPermission? <route.component {...routeProps} /> : <Redirect to='/admin/notauth' />
                  }} 
                /> 
              )
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
    )
  }
}



export default App;
