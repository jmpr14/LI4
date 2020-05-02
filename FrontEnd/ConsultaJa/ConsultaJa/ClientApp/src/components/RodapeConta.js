import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Rodape.css';

export class RodapeConta extends Component {
    static displayName = RodapeConta.name;

    render() {
        return (
            <footer class="border-top footer text-muted">
                <div class="container">
                    &copy; 2020 - ConsultaJa
                </div>
            </footer>
        );
    }
}
