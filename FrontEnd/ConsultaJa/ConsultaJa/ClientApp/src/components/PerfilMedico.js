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
            consultasAgendadas: []
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
        this.props.history.push("/historicoMedico");
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
                    <div/>
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
                                <li><Link tag={Link} className="links" to="/perfilMedico">Perfil</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoMedico">Histórico de Consultas</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoMedico">Marcar Consulta</Link></li>
                                <li><Link tag={Link} className="links" to="/historicoMedico">Propostas de Consulta</Link></li>
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
                            <tr>
                                <td>06/05/2020</td>
                                <td>19:25:00</td>
                                <td>Sr(a). João Henriques</td>
                            </tr>
                            <tr>
                                <td>15/05/2020</td>
                                <td>14:30:00</td>
                                <td>Sr(a). Maria Castro</td>
                            </tr>
                            <tr>
                                <td>31/05/2020</td>
                                <td>09:00:00</td>
                                <td>Sr(a). José Carlos Santos</td>
                            </tr>
                            <tr>
                                <td>06/06/2020</td>
                                <td>19:25:00</td>
                                <td>Sr(a). João Henriques</td>
                            </tr>
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
