import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import ImgPerfil from './images/profile-placeholder.jpg';
import api from './api';

import './PerfilMedico.css';

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
        if (this.state.loggedIn === false) {
            return (<Redirect to="/login" />);
        }
        return (
            <LayoutMedico>
                <div class="container1">
                    <div class="op3">
                        <div>
                            <img class="image" src={ImgPerfil} width="50" height="70" />
                        </div>
                        <div>
                            <button variant="outlined" color="primary" onClick={this.handleOnAccept} >
                                Editar Perfil
                        </button>
                        </div>
                        <div>{(!this.state.isToggleOn) ?
                            <div className="perfilB">
                                <h1> {this.state.dadosPerfil.nome} </h1>
                                <h5> {this.state.dadosPerfil.email} </h5>
                                <h5> {this.state.dadosPerfil.dataNascimento} </h5>
                            </div>
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
                    <div class="op4">
                        <h1 className="title"> Perfil {this.state.dadosPerfil.type}</h1>
                        <div className="linksdiv">
                            <ul> <h2>Lista de Ações</h2>
                                <li><Link tag={Link} className="links" to="/perfilMedico">Perfil</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoMedico">Histórico de Consultas</Link></li>
                                <li><Link tag={Link} className="links" to="/anotarConsultas">Anotar Consulta</Link></li>
                                <li><Link tag={Link} className="links" to="/propostasConsultaM">Propostas de Consulta</Link></li>
                                <li><Link tag={Link} className="links" to="/logout">Logout</Link></li>
                            </ul>
                        </div>
                        <hr className="h3"/>
                        <div className="agendadas">
                            <h2 className="agendadas"> Consultas Agendadas </h2>
                        </div>
                        <div>
                        <table>
                            <tr>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                            </tr>
                                {this.state.consultasAgendadas.map(consulta => <tr><td>{consulta.data}</td><td>{consulta.hora}</td><td>Sr(a). {consulta.paciente}</td></tr>)}
                        </table>
                        </div>
                        <div>
                            <h3> Total de Consultas Agendadas: {this.state.consultasAgendadas.length} </h3>
                        </div>
                </div>
                </div>
            </LayoutMedico>
        )
    }
}
