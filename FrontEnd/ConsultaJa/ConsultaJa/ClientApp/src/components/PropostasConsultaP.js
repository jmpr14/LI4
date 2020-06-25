import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutPaciente } from './LayoutPaciente';
import api from './api';

export class PropostasConsultaP extends Component {
    static displayName = PropostasConsultaP.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            propostasConsultas: [],
            notificacoes: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
        const notify = localStorage.getItem('notify')
        if (notify != null) {
            this.state.notificacoes.push(notify)
        }
        // Buscar a lista de consultas agendadas
        api.get(`consultas/consPropostas`, {
            params: {
                id: this.state.id
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

        api.get(`/consultas/aceitarCons`, {
            params: {
                id: val,
                action: true
            }
        })
            .then(res => {
                console.log(res);
                alert("Proposta Aceite ");
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => {
                console.log(err);
            })
    }

    rejeitar = (event) => {

        let val = event.target.dataset.id;

        event.preventDefault();

        api.get(`/consultas/aceitarCons`, {
            params: {
                id: val,
                action: false
            }
        })
            .then(res => {
                console.log(res);
                alert("Proposta Rejeitada ");
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <LayoutPaciente>
                <div>
                    <h1> Propostas Consultas </h1>
                </div>
                <div>
                        <table>
                        <tr>
                             <th>Data</th>
                             <th>Hora</th>
                             <th>Médico</th>
                        </tr>
                        {this.state.propostasConsultas.map(consulta =>
                                <tr>
                                    <td>{consulta.data}</td>
                                    <td>{consulta.hora}</td>
                                    <td>{consulta.medico}</td>
                                    <td> <button key={consulta.id} data-id={consulta.id} onClick={this.aceitar}> Aceitar </button> </td>
                                    <td> <button key={consulta.id} data-id={consulta.id} onClick={this.rejeitar}> Rejeitar </button> </td>
                                </tr>)
                        }
                    </table>
                </div>
            </LayoutPaciente>
        )
    }

}
