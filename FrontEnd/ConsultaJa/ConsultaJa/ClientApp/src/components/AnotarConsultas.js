import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';

export class AnotarConsultas extends Component {
    static displayName = AnotarConsultas.name;

    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
    }

    render() {
        return (
            <LayoutMedico>
                <div>
                    <h1> Anotar Consultas </h1>
                </div>
            </LayoutMedico>
        )
    }

}
