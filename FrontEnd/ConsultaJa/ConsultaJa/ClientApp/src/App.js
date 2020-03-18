import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from './components/Layout';
import { Layout2 } from './components/Layout2';
import { Home } from './components/Home';
import { Registar } from './components/Registar';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { isAuthenticated } from './components/Login';

import './custom.css'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
     )} />
)


export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          !isAuthenticated() ? (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                  <Route path='/registar' component={Registar} />
                  <PrivateRoute path='/perfil' component={() => <h1> Hello World! </h1>} />
              </Layout>
          ) : (
                  <Layout2>
                      <Route path='/perfil' component={() => <h1> Hello World! </h1>} />
                      <Route path='/logout' component={Logout} />
                  </Layout2>      
                  )
    );
  }
}