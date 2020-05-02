import React, { Component } from 'react';
import axios from 'axios';

import { LayoutAdmin } from './LayoutAdmin';
import { CONTAS_URL } from './Constants';
import { CONSULTAS_URL } from './Constants';

import './PerfilAdmin.css';

export class PerfilAdmin extends Component {
    static displayName = PerfilAdmin.name;

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <LayoutAdmin >
                <h1> Perfil </h1>
            </LayoutAdmin >
        )
    }
}
