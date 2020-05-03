import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { LayoutMedico } from './LayoutMedico';

export class HistoricoMedico extends Component {
    static displayName = HistoricoMedico.name;

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
            <LayoutMedico>
            <div>
                <h1> Histórico Médico </h1>
                </div>
            </LayoutMedico>
        )
    }

}
