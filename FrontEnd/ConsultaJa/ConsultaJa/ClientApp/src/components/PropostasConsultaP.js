﻿import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { NavMenuPaciente } from './NavMenuPaciente';
import { RodapeConta } from './RodapeConta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LayoutPaciente } from './LayoutPaciente';
import api from './api';

export class PropostasConsultaP extends Component {
    static displayName = PropostasConsultaP.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            propostasConsultas: [],
            isToggleOn: false,
            name: null,
            dataNascimento: null,
            morada: null,
            codigo_postal: null,
            passwordAntiga: null,
            passwordNova: null,
            nif: null,
            contactos: null,
            localidade: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
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
        this.setState({ firstName: localStorage.getItem("nome") });
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

    handleOnAccept = () => {
        (this.state.isToggleOn) ? this.setState({ isToggleOn: false }) : this.setState({ isToggleOn: true });
    }

    handleEdit = (event) => {
        event.preventDefault();

        api.put(`contas/${this.state.id}`, {
            Password: this.state.passwordAntiga,
            PasswordNova: this.state.passwordNova,
            Morada: this.state.morada,
            Nome: this.state.name,
            Codigo_postal: this.state.codigo_postal,
            DataNascimento: this.state.dataNascimento
        })
            .then(res => {
                console.log(res);
                alert("Perfil editado com sucesso ");
                this.setState({ isToggleOn: false });
                if (this.state.name != null) {
                    localStorage.setItem("nome", this.state.name);
                    this.setState({ firstName: this.state.name });
                }
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => {
                console.log(err)
                alert("Não foi possível editar perfil");
                this.props.history.push("/perfilPaciente");
            });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <>
                <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-blue-200 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">

                    {/* Brand */}
                    <div
                        className="md:block text-left text-xl md:pb-2 text-gray-800 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-3 px-0"
                    >
                        Bem Vindo <br /> {this.state.firstName.split(' ', 1)}!
                    </div>

                    {/* Navigation */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/perfilPaciente"
                            >
                                <FontAwesomeIcon icon="user" /><i className="text-gray-500 mr-2 text-sm"></i> Perfil
                                </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/propostasConsultaP"
                            >
                                <FontAwesomeIcon icon="syringe" /> <i className="opacity-75 mr-2 text-sm"></i> Propostas de Consulta
                                    </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/marcarConsulta"
                            >
                                <FontAwesomeIcon icon="paste" /><i className="text-gray-500 mr-2 text-sm"></i> Marcar Consulta
                                    </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/historicoPaciente"
                            >
                                <FontAwesomeIcon icon="clipboard-list" /><i className="text-gray-500 mr-2 text-sm"></i> Histórico de Consultas
                                    </Link>
                        </li>

                        <li className="items-center">

                            <button
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                type="button"
                                onClick={this.handleOnAccept}
                            >
                                <FontAwesomeIcon icon="edit" /> Editar Perfil
                                    </button>
                        </li>
                        <div>{(!this.state.isToggleOn) ? ""
                            : <div>
                                <form onSubmit={this.handleEdit}>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="text"
                                            name='name'
                                            placeholder="Nome"
                                            onChange={this.myChangeHandler}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type='date'
                                            name='dataNascimento'
                                            placeholder="Data de Nascimento"
                                            onChange={this.myChangeHandler}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="password"
                                            name='passwordAntiga'
                                            placeholder="Password Atual"
                                            onChange={this.myChangeHandler}
                                            required
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="password"
                                            name='passwordNova'
                                            placeholder="Nova Password"
                                            onChange={this.myChangeHandler}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="text"
                                            name='morada'
                                            placeholder="Morada"
                                            onChange={this.myChangeHandler}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full rounded"
                                            type="text"
                                            name='codigo_postal'
                                            placeholder="XXXX-XXX"
                                            onChange={this.myChangeHandler}
                                        /> </div>
                                    <br />
                                    <br />
                                    <input class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-1" type='submit' value="Editar" />
                                </form></div>}
                        </div>
                    </ul>
                    {/* Divider */}
                    <hr className="my-4 md:min-w-full" />
                </nav>
                <main className="relative md:ml-64 historico-page">
                    <NavMenuPaciente />
                    <section className="relative block" style={{ height: "450px" }}>
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
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell">Médico</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border-top border-gray-300 hidden lg:table-cell"></th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-700 border-right border-top border-gray-300 hidden lg:table-cell"></th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.propostasConsultas.map(consulta =>
                                                            <tr class="border border-gray-300">
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.data}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.hora}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.medico}</td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell"> <button class="hover:bg-blue-500 bg-blue-400 text-blue-dark font-semibold text-white py-2 px-3 border rounded" key={consulta.id} data-id={consulta.id} onClick={this.aceitar}> Aceitar </button> </td>
                                                                <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell"><button class="hover:bg-red-500 bg-red-400 text-blue-dark font-semibold text-white py-2 px-3 border rounded" key={consulta.id} data-id={consulta.id} onClick={this.rejeitar}> Rejeitar </button> </td>
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
                    <RodapeConta />
                </main>
            </>
        )
    }

}





    /*
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

}*/