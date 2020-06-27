import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import ImgPerfil from './images/profile-placeholder.jpg';
import api from './api';
import { NavMenuMedico } from './NavMenuMedico';
import { RodapeConta } from './RodapeConta';


export class PerfilMedico extends Component {
    static displayName = PerfilMedico.name;

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            id: '',
            loggedIn,
            dadosPerfil: [],
            consultasAgendadas: [],
            notificacoes: [],
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
        // Buscar os dados do medico
        api.get(`/contas/${this.state.id}`)
            .then(res => {
                console.log(res);
                this.setState({ dadosPerfil: res.data });
            })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
        // Buscar a lista de consultas agendadas
        api.get(`/consultas/listaAg`, {
            params: {
                id: this.state.id
            }
        })
            .then(res => { console.log(res); this.setState({ consultasAgendadas: res.data }); })
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
                if (this.state.nome != null) this.state.dadosPerfil.nome = this.state.nome;
                if (this.state.dataNascimento != null) this.state.dadosPerfil.dataNascimento = this.state.dataNascimento;
                if (this.state.codigo_postal != null) this.state.dadosPerfil.codigo_postal = this.state.codigo_postal;
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <NavMenuMedico />
                <main className="profile-page">
                    <section className="relative block" style={{ height: "400px" }}>
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
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    alt="..."
                                                    src={require("./images/profile-placeholder.jpg")}
                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                    style={{ maxWidth: "150px" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <Link tag={Link} className="links" to="/historicoMedico">
                                                    <button
                                                        className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1"
                                                        type="button"
                                                    >
                                                        Histórico de Consultas
                                                </button>
                                                </Link>
                                            </div>
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <Link tag={Link} className="links" to="/posconsulta">
                                                    <button
                                                        className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1"
                                                        type="button"
                                                    >
                                                        Pós Consulta
                                                </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <Link tag={Link} className="links" to="/propostasConsultaM">
                                                    <button
                                                        className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1"
                                                        type="button"
                                                    >
                                                        Propostas de Consulta
                                                </button>
                                                </Link>
                                            </div>
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button
                                                    className="bg-blue-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1"
                                                    type="button"
                                                    onClick={this.handleOnAccept}
                                                >
                                                    Editar Perfil
                                                </button>
                                            </div>

                                            <div>{(!this.state.isToggleOn) ? ""
                                                : <div>
                                                    <form onSubmit={this.handleEdit}>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name='name'
                                                                placeholder="Nome"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <div>
                                                            <input
                                                                type='date'
                                                                name='dataNascimento'
                                                                placeholder="Data de Nascimento"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <div>
                                                            <input
                                                                type="password"
                                                                name='passwordAntiga'
                                                                placeholder="Password Atual"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <div>
                                                            <input
                                                                type="password"
                                                                name='passwordNova'
                                                                placeholder="Nova Password"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name='morada'
                                                                placeholder="Morada"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name='codigo_postal'
                                                                placeholder="XXXX-XXX"
                                                                onChange={this.myChangeHandler}
                                                            /> </div>
                                                        <br />
                                                        <br />
                                                        <input type='submit' value="Editar" />
                                                    </form></div>}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="text-center mt-0">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                            {this.state.dadosPerfil.nome}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-xl text-gray-500"></i>{" "}
                                            {this.state.dadosPerfil.email}
                                        </div>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-xl text-gray-500"></i>
                                            {this.state.dadosPerfil.dataNascimento}
                                        </div>
                                    </div>

                                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-2xl text-bold leading-relaxed text-gray-800">
                                                    Consultas Agendadas: {this.state.consultasAgendadas.length}
                                                </p>
                                                <div>
                                                    <table class="border-collapse w-full">
                                                        <thead>
                                                            <tr>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Paciente</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.consultasAgendadas.map(consulta =>
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
                        </section>
                    </main>
                <RodapeConta />
            </>
        )
    }
}