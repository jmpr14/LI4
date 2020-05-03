﻿import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { LayoutPaciente } from './LayoutPaciente';
import { userId } from './Login';
import { CONSULTAS_URL } from './Constants';

export class HistoricoPaciente extends Component {
    static displayName = HistoricoPaciente.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            historicoConsultas: []
        };
    }

    componentDidMount() {
        this.state.id = userId();
        this.setState({ id: userId() });
        // Buscar a lista de consultas agendadas
        axios.get(`${CONSULTAS_URL}/listaH`, {
            params: {
                id: this.state.id
            }
        })
            .then(res => { console.log(res); this.setState({ historicoConsultas: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    handleOnAccept = () => {
    }

    render() {
        return (
            <LayoutPaciente>
            <div>
                <h1> Histórico Consultas </h1>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Médico</th>
                        </tr>
                        {this.state.historicoConsultas.map(consulta => <tr><td>{consulta.date}</td><td>{consulta.date}</td><td>Dr(a). {consulta.medico}</td></tr>)}
                        <tr>
                            <td>06/05/2020</td>
                            <td>19:25:00</td>
                            <td>Dr(a). João Henriques</td>
                        </tr>
                        <tr>
                            <td>15/05/2020</td>
                            <td>14:30:00</td>
                            <td>Dr(a). Maria Castro</td>
                        </tr>
                        <tr>
                            <td>31/05/2020</td>
                            <td>09:00:00</td>
                            <td>Dr(a). José Carlos Santos</td>
                        </tr>
                        <tr>
                            <td>06/06/2020</td>
                            <td>19:25:00</td>
                            <td>Dr(a). João Henriques</td>
                        </tr>
                    </table>
                </div>
            </LayoutPaciente>
        )
    }

}
