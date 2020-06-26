import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutPaciente } from './LayoutPaciente';
import Medicos from './images/medicos.png';
import api from './api';

export class MarcarConsulta extends Component {
    static displayName = MarcarConsulta.name;

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            data: '',
            hora: '',
            precoCons: ''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
        api.get(`consultas/precoCons`)
            .then(res => {
                this.setState({ precoCons: res.data })
            })
            .catch(err => { console.log(err) });
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
            <LayoutPaciente>
                    <div class="container">
                        <div class="op2">
                            <img class="imagem" src={Medicos} width="120" height="120" />
                        </div>
                        <div class="op1">
                            <form onSubmit={this.handleSubmit}>
                            <h1 class="Regp"> Marcar Consulta </h1>
                            <div>
                                <p class="Regp"> Preco da Consulta = {this.state.precoCons}€ </p>
                            </div>
                                <p class="Regp">Insira a data:</p>
                                <input
                                   class="Regp"
                                   type='date'
                                   name='data'
                                   onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a hora:</p>
                                <input
                                    class="Regp"
                                    type='time'
                                    name='hora'
                                    onChange={this.myChangeHandler}
                                />
                                <br />
                                <br />
                                <input class="Regs" type='submit' value="Marcar" />
                            </form>
                        </div>
                    </div>
            </LayoutPaciente>
        )
    }

}
