import React, { Component, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LayoutMedico } from './LayoutMedico';
import api from './api';
import ListItem from './ListItem'
import NewTaskInput from './NewTaskInput'
import { NavMenuMedico } from './NavMenuMedico'
import { RodapeConta } from './RodapeConta'


//<div>
//    <pre>
//        {JSON.stringify(this.state.tasks, null, 8)
//        }
//    </pre>
//</div>


export class PosConsulta extends Component {
    static displayName = PosConsulta.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            idConsulta: -1,
            firstName: '',
            tasks: [],
            observacoes: '',
            escolheCons: false,
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
        // Buscar a lista de consultas agendadas
        api.get(`consultas/listaPos`, {
            params: {
                id: this.state.id
            }
        })
            .then(res => { console.log(res); this.setState({ consultasAgendadas: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
        this.setState({ firstName: localStorage.getItem("nome") });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(this.state.observacoes)
        console.log(this.state.tasks)

        api.post(`consultas/posconsulta`, {
            idconsulta: this.state.idConsulta,
            prescricoes: this.state.tasks,
            observacoes: this.state.observacoes
        })
            .then(conta => {
                console.log(conta)
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => console.log(err));

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
                this.props.history.push("/perfilMedico");
            })
            .catch(err => {
                console.log(err)
                alert("Não foi possível editar perfil");
                this.props.history.push("/perfilMedico");
            });
    }

    myChangeHandler = (event) => {
        let val = event.target.value;
        this.setState({ observacoes: val });
    }

    myChangeHandler2 = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    addNewTask = (task, task1, task2) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.push({ id: this.state.tasks.length, nome: task, quantidade: task1, posologia: task2 });
        this.setState({ tasks: itensCopy });
    }

    updateTask = ({ target }, index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1, { id: index, nome: target.value, quantidade: target.value1, posologia: target.value2 });
        this.setState({ tasks: itensCopy });
    }

    deleteTask = (index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1);
        this.setState({ tasks: itensCopy });
    }

    handlerChoose = (event) => {

        let val = event.target.dataset.consulta;

        console.log("IdConsulta = " + val)

        event.preventDefault();

        this.setState({ idConsulta: val })

        this.setState({ escolheCons: true })
    }

    render() {
        return (
            <>
                <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-blue-200 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">

                    {/* Bem-Vindo */}
                    <div
                        className="md:block text-left text-xl md:pb-2 text-gray-800 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    >
                        Bem Vindo <br /> {this.state.firstName.split(' ', 1)}!
                        </div>

                    {/* Propostas de Consulta */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/perfilMedico"
                            >
                                <FontAwesomeIcon icon="user" /><i className="text-gray-500 mr-2 text-sm"></i> Perfil
                                    </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/propostasConsultaM"
                            >
                                <FontAwesomeIcon icon="syringe" /> <i className="opacity-75 mr-2 text-sm"></i> Propostas de Consulta
                                    </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/posconsulta"
                            >
                                <FontAwesomeIcon icon="paste" /><i className="text-gray-500 mr-2 text-sm"></i> Pos Consulta
                                    </Link>
                        </li>

                        <li className="items-center">
                            <Link
                                className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                                to="/historicoMedico"
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
                                            onChange={this.myChangeHandler2}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type='date'
                                            name='dataNascimento'
                                            placeholder="Data de Nascimento"
                                            onChange={this.myChangeHandler2}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="password"
                                            name='passwordAntiga'
                                            placeholder="Password Atual"
                                            onChange={this.myChangeHandler2}
                                            required
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="password"
                                            name='passwordNova'
                                            placeholder="Nova Password"
                                            onChange={this.myChangeHandler2}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="text"
                                            name='morada'
                                            placeholder="Morada"
                                            onChange={this.myChangeHandler2}
                                        /> </div>
                                    <div>
                                        <input
                                            class="w-full mb-1 rounded"
                                            type="text"
                                            name='codigo_postal'
                                            placeholder="XXXX-XXX"
                                            onChange={this.myChangeHandler2}
                                        /> </div>
                                    <br />
                                    <br />
                                    <input class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-2" type='submit' value="Editar" />
                                </form></div>}
                        </div>
                    </ul>
                    {/* Divider */}
                    <hr className="my-4 md:min-w-full" />

                </nav>
                <main className="relative md:ml-64 historico-page">
                    <NavMenuMedico />
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
                    <section className="relative py-24 bg-gray-300">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words mb-54 bg-white w-full mb-10 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className=" py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <h1 className="text-4xl font-semibold leading-normal mb-4 text-gray-800 mb-2">
                                                    Pós-Consulta
                                                </h1>
                                                {(this.state.escolheCons) ?
                                                    <div>
                                                        <div className="text-2xl font-semibold leading-normal mb-4 text-gray-800 mb-2">
                                                            <br />
                                                            <h3> Adicionar Receita </h3>
                                                        </div>
                                                        <div>
                                                            <div className="w-full font-semibold leading-normal text-gray-800">
                                                                <NewTaskInput onSubmit={this.addNewTask} />
                                                                <form onSubmit={this.onSubmitHandler}>
                                                                    {this.state.tasks.map(({ id, nome, quantidade, posologia }, index) => (
                                                                        <ListItem
                                                                            key={id}
                                                                            value={nome}
                                                                            value1={quantidade}
                                                                            value2={posologia}
                                                                            onChange={(event) => this.updateTask(event, index)}
                                                                            onDelete={() => this.deleteTask(index)}
                                                                        />
                                                                    ))}
                                                                    <br />
                                                                    <div className="text-xl font-semibold leading-normal text-gray-800 -mt-8 mb-2">
                                                                        <br />
                                                                        <h3 className="text-xl font-semibold leading-normal mb-4 text-gray-800 mb-2"> Adicionar Observações </h3>
                                                                        <textarea class="bg-gray-200 border border-gray-300" rows="10" cols="40" maxlength="400" onChange={this.myChangeHandler}></textarea>
                                                                    </div>
                                                                    <button
                                                                        className="bg-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto"
                                                                        type="submit"
                                                                        style={{ transition: "all .15s ease" }}
                                                                        >
                                                                        Finalizar Consulta
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        <table class="border-collapse w-full">
                                                            <thead>
                                                            <tr>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Data</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Hora</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Paciente</th>
                                                                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"></th>
                                                            </tr>
                                                            </thead>
                                                            {this.state.consultasAgendadas.map(consulta =>
                                                                <tr>
                                                                    <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.data}</td>
                                                                    <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">{consulta.hora}</td>
                                                                    <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">Sr(a). {consulta.paciente}</td>
                                                                    <td class="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">
                                                                        <button class="hover:bg-blue-500 bg-blue-400 text-blue-dark font-semibold text-white py-2 px-3 border rounded" key={consulta.id} data-consulta={consulta.id} onClick={this.handlerChoose}> Marcar como Efetuada </button>
                                                                    </td>
                                                                </tr>)
                                                            }
                                                        </table>
                                                    </div>
                                                }
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
