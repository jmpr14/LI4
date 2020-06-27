import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutPaciente } from './LayoutPaciente';
import Medicos from './images/medicos.png';
import api from './api';
import { NavMenuPaciente } from './NavMenuPaciente';
import { RodapeConta } from './RodapeConta';
import { Rodape } from './Rodape';

export class MarcarConsulta extends Component {
    static displayName = MarcarConsulta.name;

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            data: '',
            hora: ''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        api.post(`consultas/regCons`, {
            Paciente: this.state.id,
            Data: this.state.data,
            Hora: this.state.hora
        })
            .then(res => {
                console.log(res);
                alert("Consulta Marcada à espera de resposta ");
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => { console.log(err); alert("Erro na Marcação"); });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }


    render() {
        return (
            <>
                <NavMenuPaciente />
                <main>
                    <section className="absolute w-full h-full">
                        <div
                            className="absolute top-20 w-full h-full bg-blue-200"
                            style={{
                                backgroundImage:
                                    "url(" + require("./images/este.png") + ")",
                                backgroundSize: "40%",
                                backgroundRepeat: "no-repeat"
                            }}
                        ></div>
                        <div className="container mx-auto px-4 h-full -mb-10">
                            <div className="flex content-center items-center justify-center h-full">
                                <div className="w-1/2 lg:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">

                                        <div className="flex-auto px-4 lg:px-24 py-12 pt-0">
                                            <div className="block text-gray-700 uppercase text-4xl text-center mb-3 font-semibold">
                                                <large>Marcar Consulta</large>
                                            </div>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-l font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Insira a data:
                            </label>
                                                    <input
                                                        type='date'
                                                        class="appearance-none block w-70% bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        name='data'
                                                        onChange={this.myChangeHandler}
                                                    />
                                                </div>
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-l font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Insira a hora:
                            </label>
                                                    <input
                                                        type='time'
                                                        class="appearance-none block w-70% g-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        name='hora'
                                                        onChange={this.myChangeHandler}
                                                    />
                                                </div>


                                                <div className="text-center mt-6">
                                                    <button
                                                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                        type="submit"
                                                        style={{ transition: "all .15s ease" }}
                                                    >
                                                        Solicitar Consulta
                            </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="-mt-1">
                            <RodapeConta />
                        </div>
                    </section>
                </main>
            </>

        );
    }
}