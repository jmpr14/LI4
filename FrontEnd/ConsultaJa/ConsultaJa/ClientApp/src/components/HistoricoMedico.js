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
            historicoConsultas: [],
            tamanhoPag: 9,
            numPagina: 0
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

    nextPage = () => {
        var num = this.state.numPagina
        if ((this.state.numPagina + 1) < this.state.historicoConsultas.length / this.state.tamanhoPag) {
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
                    <h1> Histórico Consultas </h1>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                        </tr>
                        {this.state.historicoConsultas.slice(this.state.numPagina * this.state.tamanhoPag, this.state.numPagina * this.state.tamanhoPag + this.state.tamanhoPag - 1).map(consulta =>
                            <tr>
                                <td>{consulta.data}</td>
                                <td>{consulta.hora}</td>
                                <td>Sr(a). {consulta.paciente}</td>
                            </tr>)}
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
