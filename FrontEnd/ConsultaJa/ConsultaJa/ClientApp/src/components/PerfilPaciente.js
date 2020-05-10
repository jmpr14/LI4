import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { LayoutPaciente } from './LayoutPaciente';
import ImgPerfil from './images/profile-placeholder.jpg';
import { userId } from './Login';
import { CONTAS_URL } from './Constants';
import { CONSULTAS_URL } from './Constants';

import './PerfilPaciente.css';

export class PerfilPaciente extends Component {
    static displayName = PerfilPaciente.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            dadosPerfil: [],
            consultasAgendadas: []
        };
    }

    componentDidMount() {
        this.state.id = userId();
        this.setState({ id: userId() });
        // Buscar os dados do cliente
        axios.get(`${CONTAS_URL}/${this.state.id}`)
            .then(res => { console.log(res); this.setState({ dadosPerfil: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
        // Buscar a lista de consultas agendadas
        axios.get(`${CONSULTAS_URL}/listaAg`, {
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
        this.props.history.push("/historicoPaciente");
    }

    handleEdit = (event) => {
        event.preventDefault();

        //axios.put(`${CONTAS_URL}/${this.state.id}`, {
        //    Nome: this.state.dadosPerfil.name,
        //    Password: this.state.dadosPerfil.password,
        //    DataNascimento: this.state.dadosPerfil.dataNascimento,
        //    Morada: this.state.dadosPerfil.morada,
        //    Nif: this.state.dadosPerfil.nif,
        //    Codigo_postal: this.state.dadosPerfil.codigo_postal,
        //    Contactos: this.state.dadosPerfil.contactos,
        //    Localidade: this.state.dadosPerfil.localidade
        //})
        //    .then(res => {
        //        //this.props.addUserToState(conta);
        //        //this.props.toggle();
        //        console.log(res);
        //        alert("Novo user " + res.data);
        //    })
        //    .catch(err => console.log(err));
    }

    render() {
        return (
            <LayoutPaciente >
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
                    <div className="perfilB">
                        <h1> {this.state.dadosPerfil.nome} </h1>
                        <h5> {this.state.dadosPerfil.email} </h5>
                        <h5> {this.state.dadosPerfil.dataNascimento} </h5>
                        </div>
                    </div>
                    <div class="op4">
                        <h1 className="title"> Perfil {this.state.dadosPerfil.type}</h1>
                        <div className="linksdiv">
                            <ul> <h2>Lista de Ações</h2>
                                <li><Link tag={Link} className="links" to="/perfilPaciente">Perfil</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoPaciente">Histórico de Consultas</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoPaciente">Marcar Consulta</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoPaciente">Propostas de Consulta</Link></li>
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
                                <th>Médico</th>
                            </tr>
                                {this.state.consultasAgendadas.map(consulta => <tr><td>{consulta.data}</td><td>{consulta.hora}</td><td>Dr(a). {consulta.medico}</td></tr>)}
                        </table>
                        </div>
                        <div>
                            <h3> Total de Consultas Agendadas: {this.state.consultasAgendadas.length} </h3>
                        </div>
                </div>
                </div>
        </LayoutPaciente >
        )
    }
}
