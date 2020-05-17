﻿import React from "react";
import { Home } from './components/Home';
import { Registar } from './components/Registar';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { HistoricoPaciente } from './components/HistoricoPaciente';
import { PerfilPaciente } from './components/PerfilPaciente';
import { PerfilAdmin } from './components/PerfilAdmin';
import { Privacy } from './components/Privacy';
import { PerfilMedico } from './components/PerfilMedico';
import { HistoricoMedico } from './components/HistoricoMedico';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import decode from 'jwt-decode';

//const PrivateRoute = ({ component: Component, ...rest }) => (
//    <Route {...rest} render={props => (
//        isAuthenticated() ? (
//            <Component {...props} />
//        ) : (
//                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//            )
//    )} />
//);

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        // { exp: 56654564 }
        var decoded = decode(token);
        console.log(decoded);

        console.log(new Date().getTime() / 1000);
        if (decoded.exp < new Date().getTime() / 1000) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
);

const PrivateRouteP = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            (decode(localStorage.getItem('token')).Store[0] == 'P') ?
                <Component {...props} />
                : (decode(localStorage.getItem('token')).Store[0] == 'M') ?
                    <Redirect to={{ pathname: '/perfilMedico', state: { from: props.location } }} />
                    : < Redirect to={{ pathname: '/perfilAdmin', state: { from: props.location } }} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
);

const PrivateRouteA = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            (decode(localStorage.getItem('token')).Store[0] == 'A') ?
                <Component {...props} />
                : (decode(localStorage.getItem('token')).Store[0] == 'M') ?
                    <Redirect to={{ pathname: '/perfilMedico', state: { from: props.location } }} />
                    : < Redirect to={{ pathname: '/perfilPaciente', state: { from: props.location } }} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
);

const PrivateRouteM = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            (decode(localStorage.getItem('token')).Store[0] == 'M') ?
                <Component {...props} />
                : (decode(localStorage.getItem('token')).Store[0] == 'P') ?
                    <Redirect to={{ pathname: '/perfilPaciente', state: { from: props.location } }} />
                    : < Redirect to={{ pathname: '/perfilAdmin', state: { from: props.location } }} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
);


const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !isAuthenticated() ? (
            <Component {...props} />
        ) : (
                (decode(localStorage.getItem('token')).Store[0] == 'P') ?
                    <Redirect to={{ pathname: '/perfilPaciente', state: { from: props.location } }} />
                    : (decode(localStorage.getItem('token')).Store[0] == 'M') ?
                        <Redirect to={{ pathname: '/perfilMedico', state: { from: props.location } }} />
                        : < Redirect to={{ pathname: '/perfilAdmin', state: { from: props.location } }} />
            )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <AuthRoute exact path='/' component={Home} />
            <AuthRoute path='/privacy' component={Privacy} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/registar' component={Registar} />
            <PrivateRouteP path='/perfilPaciente' component={PerfilPaciente} />
            <PrivateRouteP path='/historicoPaciente' component={HistoricoPaciente} />
            <PrivateRoute path='/logout' component={Logout} />
            <PrivateRouteA path='/perfilAdmin' component={PerfilAdmin} />
            <PrivateRouteM path='/perfilMedico' component={PerfilMedico} />
            <PrivateRouteM path='/historicoMedico' component={HistoricoMedico} />
        </Switch>
    </BrowserRouter>
);

export default Routes;