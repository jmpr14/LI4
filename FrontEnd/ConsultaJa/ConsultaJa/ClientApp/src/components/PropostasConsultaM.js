import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';

export class PropostasConsultaM extends Component {
    static displayName = PropostasConsultaM.name;

    constructor(props) {
        super(props);
        this.state = {
            idMedico: '',
            id:-1,
            propostasConsultas: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.idMedico = idD;
        // Buscar a lista de consultas agendadas
        api.get(`consultas/consPropostas`, {
            params: {
                id: this.state.idMedico
            }
        })
            .then(res => { console.log(res); this.setState({ propostasConsultas: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    aceitar = (event) => {

        let val = event.target.dataset.id;

        event.preventDefault();

        api.get(`/consultas/propCons`, {
            params: {
                IdConsulta: val,
                IdMedico: this.state.idMedico
            }
        })
            .then(res => {
                console.log(res);
                alert("Proposta Aceite ");
                this.props.history.push("/perfilMedico");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <LayoutMedico>
                <div>
                    <h1> Propostas Consultas </h1>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Paciente</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                        {this.state.propostasConsultas.map(consulta =>
                            <tr>
                                <td>{consulta.paciente}</td>
                                <td>{consulta.data}</td>
                                <td>{consulta.hora}</td>
                                <td> <button key={consulta.id} data-id={consulta.id} onClick={this.aceitar}> Aceitar </button> </td>
                            </tr>)
                        }
                    </table>
                </div>
            </LayoutMedico>
        )
    }
}
