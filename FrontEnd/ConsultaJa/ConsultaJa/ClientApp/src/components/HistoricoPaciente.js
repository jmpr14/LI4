﻿import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { LayoutPaciente } from './LayoutPaciente';

export class HistoricoPaciente extends Component {
    static displayName = HistoricoPaciente.name;

    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    componentDidMount() {
    }

    handleOnAccept = () => {
    }

    render() {
        return (
            <LayoutPaciente>
            <div>
                <h1> Histórico Paciente </h1>
                </div>
            </LayoutPaciente>
        )
    }

}
