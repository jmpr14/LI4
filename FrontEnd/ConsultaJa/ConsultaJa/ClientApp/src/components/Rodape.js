import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Privacy } from './Privacy';
import './Rodape.css';

export class Rodape extends Component {
    static displayName = Rodape.name;

    render() {
        return (
            <footer class="border-top footer text-muted">
                <div class="container">
                    &copy; 2020 - ConsultaJa- <a page="/Privacy">Privacy</a>
                </div>
            </footer>
        );
    }
}
