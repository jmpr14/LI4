import React, { Component } from 'react';

import { LayoutAdmin } from './LayoutAdmin';
import api from './api';

import './PerfilAdmin.css';

export class PerfilAdmin extends Component {
    static displayName = PerfilAdmin.name;

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            idMed: [],
            loggedIn,
            dadosAdmin: [],
            medicosPendentes: []
        };
    }

    componentDidMount() {
        // Buscar os dados do preco
        api.get('admin', {
            params: {
                admin: 'admin'
            }
        })
            .then(res => { console.log(res); this.setState({ dadosAdmin: res.data }); })
            
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });

        // Buscar a lista de medicos pendentes
        api.get('/admin/listaMed', { })
            .then(res => { console.log(res); this.setState({ medicosPendentes: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    handleOnAccept = () => {
        this.props.history.push("/perfilAdmin");
    }

    aceitar = (event) => {

        let val = event.target.dataset.medico;

        event.preventDefault();

        api.get('/admin/aceitaMed', {
            params: {
                id: val,
                action: 'true'
            }
        })
            .then(res => {
                console.log(res);
                alert("Novo Medico aceite ")
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.loggedIn === false) {
            return this.props.history.push("/login");
        }
        return (
            <LayoutAdmin >
                <h1> Perfil Administrador </h1>
                <form>
                <div class="op3Admin">
                    <div>
                        <button variant="outlined" color="primary" onClick={this.handleOnAccept} >
                            Alterar Preço por Consulta
                        </button>
                    </div>
                    <div />
                    <div className="perfilAdmin">
                        <h5> Preço por Consulta: {this.state.dadosAdmin.preco} € </h5>
                        <h5> Número de Médicos: {this.state.dadosAdmin.numMedicos} </h5>
                        <h5> Número de Pacientes: {this.state.dadosAdmin.numPacientes} </h5>
                    </div>
                    </div>
                </form>
                <form>
                <div class="op4Admin">
                    <h1 className="title"> Pedidos de inscrição de Médicos </h1>
                    <div>
                        
                        </div>
                        <table>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data de Nascimento</th>
                            </tr>
                            {this.state.medicosPendentes.map(medico =>
                                <tr>
                                    <td>{medico.nome}</td>
                                    <td>{medico.email}</td>
                                    <td>{medico.dataNascimento}</td>
                                    <td> <button key={medico.id} data-medico={medico.id} onClick={this.aceitar}> Aceitar </button> </td>
                                </tr>)
                            }
                        </table>
                        <div>
                            <h3> Número de Pedidos de Médico: {this.state.medicosPendentes.length}</h3>
                        </div>
                    </div>
                </form>
            </LayoutAdmin >
        )
    }
}
