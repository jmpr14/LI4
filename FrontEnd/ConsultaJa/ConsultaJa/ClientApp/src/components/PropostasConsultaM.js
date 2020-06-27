import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';
import { NavMenuMedico } from './NavMenuMedico';
import { RodapeConta } from './RodapeConta';

export class PropostasConsultaM extends Component {
    static displayName = PropostasConsultaM.name;

    constructor(props) {
        super(props);
        this.state = {
            idMedico: '',
            id: -1,
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
            <>
                <NavMenuMedico />
                <main className="historico-page">
                    <section className="relative block" style={{ height: "450px" }}>
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
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-32 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className=" py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full px-4">
                                                <h1 className="text-4xl font-semibold leading-normal mb-4 text-gray-800 mb-2">
                                                    Propostas de Consultas
                                                </h1>
                                                <div>
                                                    <table class="border-collapse w-full mb-32">
                                                        <thead>
                                                            <tr>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Paciente</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell"></th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.propostasConsultas.map(consulta =>
                                                            <tr class="border border-gray-300">
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.paciente}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.data}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.hora}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell"> <button class="hover:bg-blue-500 bg-blue-400 text-blue-dark font-semibold text-white py-2 px-3 border rounded" key={consulta.id} data-id={consulta.id} onClick={this.aceitar}> Aceitar </button> </td>
                                                            </tr>)
                                                        }

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <RodapeConta />
            </>
        )
    }

}
    /*
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

}*/