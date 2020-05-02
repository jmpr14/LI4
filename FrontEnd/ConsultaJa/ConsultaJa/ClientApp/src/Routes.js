import React from "react";
import { isAuthenticated } from './components/Login';
import { Home } from './components/Home';
import { Registar } from './components/Registar';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { HistoricoPaciente } from './components/HistoricoPaciente';
import { PerfilPaciente } from './components/PerfilPaciente';
import { PerfilAdmin } from './components/PerfilAdmin';
import { Privacy } from './components/Privacy';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/privacy' component={Privacy} />
            <Route path='/login' component={Login} />
            <Route path='/registar' component={Registar} />
            <PrivateRoute path='/perfilPaciente' component={PerfilPaciente} />
            <PrivateRoute path='/historicoPaciente' component={HistoricoPaciente} />
            <PrivateRoute path='/logout' component={Logout} />
            <PrivateRoute path='/privacy' component={Privacy} />
            <PrivateRoute path='/perfilAdmin' component={PerfilAdmin} />
        </Switch>
    </BrowserRouter>
);

export default Routes;