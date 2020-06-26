import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import ReactDOM from 'react-dom'

import { LayoutPaciente } from './LayoutPaciente';
import api from './api';
import { Receita } from './Receita';
import Download from './Download';

export class HistoricoPaciente extends Component {
    static displayName = HistoricoPaciente.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            historicoConsultas: [],
            clicked: false,
            currentId: 0,
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

    downloader = (event) => {

        let val = event.target.dataset.id;

        event.preventDefault();

        localStorage.setItem('consulta', val)

        this.setState({ clicked: true });

        this.setState({ currentId: val });

        //ReactDOM.render(Download, document.getElementById(val));
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

    condicaoPdf = (id) => (
        !this.state.clicked && id == this.state.currentId
    );

    render() {
        return (
            <LayoutPaciente>
            <div>
                <h1> Histórico Consultas </h1>
                </div>
                {this.state.clicked ? <Download /> : <div/>}
                <div>
                    <table>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Médico</th>
                            <th>Receita</th>
                        </tr>
                        {this.state.historicoConsultas.slice(this.state.numPagina * this.state.tamanhoPag, this.state.numPagina * this.state.tamanhoPag + this.state.tamanhoPag - 1).map(consulta => <tr>
                            <td>{consulta.data}</td>
                            <td>{consulta.hora}</td>
                            <td>Dr(a). {consulta.medico}</td>
                            <td> {
                                !this.state.clicked ?
                                    < button key={consulta.id} data-id={consulta.id} onClick={this.downloader}> Seleciona </button>
                                    : <button disabled='disabled'> Seleciona </button> }
                            </td>
                        </tr>)}
                    </table>
                </div>
                <div>
                    < button onClick={this.previousPage}> Previous </button>
                    < button onClick={this.nextPage}> Next </button>
                </div>
            </LayoutPaciente>
        )
    }

}
