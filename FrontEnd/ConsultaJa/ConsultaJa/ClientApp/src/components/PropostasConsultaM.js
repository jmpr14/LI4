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
            propostasConsultas: [],
            tamanhoPag: 9,
            numPagina: 0
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

    nextPage = () => {
        var num = this.state.numPagina
        if ((this.state.numPagina + 1) < this.state.propostasConsultas.length / this.state.tamanhoPag) {
            this.setState({ numPagina: num + 1 })
        }
    }

    previousPage = () => {
        var num = this.state.numPagina
        if (this.state.numPagina != 0) {
            this.setState({ numPagina: num - 1 })
        }
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
                        {this.state.propostasConsultas.slice(this.state.numPagina * this.state.tamanhoPag, this.state.numPagina * this.state.tamanhoPag + this.state.tamanhoPag - 1).map(consulta =>
                            <tr>
                                <td>{consulta.paciente}</td>
                                <td>{consulta.data}</td>
                                <td>{consulta.hora}</td>
                                <td> <button key={consulta.id} data-id={consulta.id} onClick={this.aceitar}> Aceitar </button> </td>
                            </tr>)
                        }
                    </table>
                </div>
                <div>
                    < button onClick={this.previousPage}> Previous </button>
                    < button onClick={this.nextPage}> Next </button>
                </div>
            </LayoutMedico>
        )
    }
}
