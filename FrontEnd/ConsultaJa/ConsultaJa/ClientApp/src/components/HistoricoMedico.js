import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { NavMenuMedico } from './NavMenuMedico';
import { RodapeConta } from './RodapeConta';

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
            .then(res => { console.log(res); this.setState({ historicoConsultas: res.data.reverse() }); })
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
            <>
                <NavMenuMedico />
                <main className="historico-page">
                <section className="relative block" style={{ height: "500px" }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80')"
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
                            <div className="relative flex flex-col min-w-0 break-words mb-54 bg-white w-full mb-10 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className=" py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <h1 className="text-4xl font-semibold leading-normal mb-4 text-gray-800 mb-2">
                                                    Histórico de Consultas
                                                </h1>
                                                <div>
                                                    <table class="border-collapse w-full">
                                                        <thead>
                                                            <tr>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Paciente</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.historicoConsultas.slice(this.state.numPagina * this.state.tamanhoPag, this.state.numPagina * this.state.tamanhoPag + this.state.tamanhoPag - 1).map(consulta =>
                                                            <tr>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.data}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.hora}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">Sr(a). {consulta.paciente}</td>
                                                            </tr>)}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative mx-auto h-15 w-50 pb-2">
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
