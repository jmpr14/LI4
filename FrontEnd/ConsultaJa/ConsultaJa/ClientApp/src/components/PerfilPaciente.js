import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LayoutPaciente } from './LayoutPaciente';
import { MarcarConsulta } from './MarcarConsulta';
import ImgPerfil from './images/profile-placeholder.jpg';
import api from './api';
import decode from 'jwt-decode';
import { NavMenuPaciente } from './NavMenuPaciente';
import { RodapeConta } from './RodapeConta';


export class PerfilPaciente extends Component {
    static displayName = PerfilPaciente.name;

    constructor(props) {
        super(props);
        const token = localStorage.getItem('token')

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            id: '',
            loggedIn,
            firstName: '',
            notificacoes: [],
            dadosPerfil: [],
            consultasAgendadas: [],
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
        if (localStorage.getItem('intervalo') == null) {
            var notifications = localStorage.getItem('notify')
            if (notifications == null) {
                notifications = []
            }
            api.get(`consultas/notify`, {
                params: {
                    id: this.state.id
                }
            })
                .then(res => {
                    if (!notifications.includes(res.data)) {
                        notifications.push(res.data)
                        localStorage.setItem('notify', notifications)
                        alert("[NOVA NOTIFICAÇÃO]\n" + res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            const idIntervalo = setInterval(() => {
                var notifications = localStorage.getItem('notify')
                if (notifications == null) {
                    notifications = []
                }
                const token = localStorage.getItem('token');
                var decoded = decode(token);
                const idD = decoded.Id;
                api.get(`consultas/notify`, {
                    params: {
                        id: idD
                    }
                })
                    .then(res => {
                        if (!notifications.includes(res.data)) {
                            notifications.push(res.data)
                            localStorage.setItem('notify', notifications)
                            alert("[NOVA NOTIFICAÇÃO]\n" + res.data);
                        }
                    })
                    .catch(error => {
                        //alert(error.data);
                        console.log(error);
                    });
            }, 60000);
            localStorage.setItem('intervalo', idIntervalo);
        }
        // Buscar os dados do cliente
        api.get(`contas/${this.state.id}`)
            .then(res => {
                console.log(res);
                this.setState({ dadosPerfil: res.data });
                this.setState({ firstName: res.data.nome });
                if (localStorage.getItem("nome") == null) {
                    localStorage.setItem("nome", this.state.firstName);
                }
            })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
        // Buscar a lista de consultas agendadas
        api.get(`consultas/listaAg`, {
            params: {
                id: this.state.id
            }
        })
            .then(res => {
                console.log(res);
                this.setState({ consultasAgendadas: res.data });
            })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    handleOnAccept = () => {
        (this.state.isToggleOn) ? this.setState({ isToggleOn: false }) : this.setState({ isToggleOn: true });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleEdit = (event) => {
        event.preventDefault();

        var dataNasc = (this.state.dataNascimento != null) ? this.state.dataNascimento : this.state.dadosPerfil.dataNascimento;

        api.put(`contas/${this.state.id}`, {
            Password: this.state.passwordAntiga,
            PasswordNova: this.state.passwordNova,
            Morada: this.state.morada,
            Nome: this.state.name,
            Codigo_postal: this.state.codigo_postal,
            DataNascimento: dataNasc
        })
            .then(res => {
                console.log(res);
                alert("Perfil editado com sucesso ");
                this.setState({ isToggleOn: false });
                if (this.state.passwordNova != null) this.state.dadosPerfil.password = this.state.passwordNova;
                if (this.state.morada != null) this.state.dadosPerfil.morada = this.state.morada;
                if (this.state.nome != null) this.state.dadosPerfil.nome = this.state.name;
                if (this.state.dataNascimento != null) this.state.dadosPerfil.dataNascimento = this.state.dataNascimento;
                if (this.state.codigo_postal != null) this.state.dadosPerfil.codigo_postal = this.state.codigo_postal;
                this.setState({ firstName: this.state.name });
                if (this.state.name != null) {
                    localStorage.setItem("nome", this.state.name);
                    this.setState({ firstName: this.state.name });
                }
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err)
                alert("Não foi possível editar perfil");
                this.props.history.push("/perfilPaciente");
            });
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
            <main className="relative md:ml-64 profile-page">
                <NavMenuPaciente />
                <section className="relative block" style={{ height: "400px" }}>
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
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center pb-32">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src={require("./images/profile-placeholder.jpg")}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                style={{ maxWidth: "150px" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-0">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                        {this.state.dadosPerfil.nome}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                        {this.state.dadosPerfil.email}
                                    </div>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                                        {this.state.dadosPerfil.dataNascimento}
                                    </div>
                                </div>

                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-xl text-bold leading-relaxed text-gray-800">
                                                    Consultas Agendadas: {this.state.consultasAgendadas.length}
                                                </p>
                                            <div>
                                                <table class="border-collapse w-full">
                                                    <thead>
                                                        <tr>
                                                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Data</th>
                                                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                            <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Médico</th>
                                                        </tr>
                                                    </thead>
                                                    {this.state.consultasAgendadas.map(consulta => <tr><td>{consulta.data}</td><td>{consulta.hora}</td><td>Dr(a). {consulta.medico}</td></tr>)}
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