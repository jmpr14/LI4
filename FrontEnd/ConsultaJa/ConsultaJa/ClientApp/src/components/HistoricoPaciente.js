import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { NavMenuPaciente } from './NavMenuPaciente';
import { RodapeConta } from './RodapeConta';
import Download from './Download';

import { LayoutPaciente } from './LayoutPaciente';
import api from './api';

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
            .then(res => { console.log(res); this.setState({ historicoConsultas: res.data.reverse() }); })
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
            <>
                <NavMenuPaciente />
                <main className="historico-page">
                    <section className="relative block" style={{ height: "500px" }}>
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1587015456209-760d37cb110c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')"
                            }}
                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            ></span>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: "70px", transform: "translateZ(0)" }}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="text-gray-300 fill-current"
                                    points="2560 0 2560 100 0 100"
                                ></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-gray-300">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words mb-56 bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full px-4">
                                                <p className="text-4xl font-semibold leading-normal mb-4 text-gray-800 mb-2">
                                                    Histórico de Consultas
                                                </p>
                                                {this.state.clicked ? <Download /> : <div />}
                                                <div>
                                                    <table class="border-collapse w-full">
                                                        <thead>
                                                            <tr>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Médico</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Receita</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.historicoConsultas.slice(this.state.numPagina * this.state.tamanhoPag, this.state.numPagina * this.state.tamanhoPag + this.state.tamanhoPag - 1).map(consulta => <tr>
                                                            <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.data}</td>
                                                            <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.hora}</td>
                                                            <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">Dr(a). {consulta.medico}</td>
                                                            <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell"> {
                                                                !this.state.clicked ?
                                                                    < button className="bg-blue-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-0" key={consulta.id} data-id={consulta.id} onClick={this.downloader}> Seleciona </button>
                                                                    : <button className="bg-blue-100 uppercase text-gray-500 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-0" disabled='disabled'> Seleciona </button>}
                                                            </td>
                                                        </tr>)}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative mx-auto h-15 w-50 -mt-48 pb-24">
                            <div class="absolute down-0 left-0 h-8 w-30">
                                < button className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-0"
                                    type="button"
                                    onClick={this.previousPage}> Previous
                                    </button>
                            </div>
                            <div class="absolute down-0 right-0 h-8 w-30">
                                < button className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-0"
                                    type="button"
                                    onClick={this.nextPage}> Next </button>
                            </div>
                        </div>
                    </section>
                </main>

                <RodapeConta />
            </>
        )
    }

}



