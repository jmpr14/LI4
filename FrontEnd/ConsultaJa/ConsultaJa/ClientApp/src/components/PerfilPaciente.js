import React, { Component } from 'react';
import axios from 'axios';

import { LayoutPaciente } from './LayoutPaciente';
import ImgPerfil from './images/profile-placeholder.jpg'
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
                    <div/>
                    <div className="perfilB">
                        <h5> Nome: {this.state.dadosPerfil.nome} </h5>
                        <h5> Email: {this.state.dadosPerfil.email} </h5>
                    </div>
                </div>
                <div class="op4">
                        <h1> Perfil {this.state.id}</h1>
                        <ul>{this.state.consultasAgendadas.map(consulta => <li>{consulta.date}</li>)} </ul>
                </div>
                </div>
        </LayoutPaciente >
        )
    }
}
