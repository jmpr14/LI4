import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';

export class HistoricoMedico extends Component {
    static displayName = HistoricoMedico.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            historicoConsultas: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
        // Buscar a lista de consultas agendadas
        api.get(`consultas/listaH`, {
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
            <LayoutMedico>
                <div>
                    <h1> Histórico Consultas </h1>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                        </tr>
                        {this.state.historicoConsultas.map(consulta => <tr><td>{consulta.date}</td><td>{consulta.date}</td><td>Sr(a). {consulta.paciente}</td></tr>)}
                        <tr>
                            <td>06/02/2020</td>
                            <td>19:25:00</td>
                            <td>Sr(a). João Henriques</td>
                        </tr>
                    </table>
                </div>
            </LayoutMedico>
        )
    }

}
