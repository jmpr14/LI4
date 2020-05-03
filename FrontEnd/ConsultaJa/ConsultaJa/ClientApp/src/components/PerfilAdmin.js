import React, { Component } from 'react';
import axios from 'axios';

import { LayoutAdmin } from './LayoutAdmin';
import { ADMIN_URL } from './Constants';

import './PerfilAdmin.css';

export class PerfilAdmin extends Component {
    static displayName = PerfilAdmin.name;

    constructor(props) {
        super(props);
        this.state = {
            dadosAdmin: [],
            medicosPendentes: []
        };
    }

    componentDidMount() {
        // Buscar os dados do preco
        axios.get(`${ADMIN_URL}`, {
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
        axios.get(`${ADMIN_URL}/listaMed`, { })
            .then(res => { console.log(res); this.setState({ medicosPendentes: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    handleOnAccept = () => {
        this.props.history.push("/perfilAdmin");
    }

    render() {
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
                <div>

                </div>
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
                                </tr>)
                            }
                        </table>
                    </div>
                </form>
            </LayoutAdmin >
        )
    }
}
