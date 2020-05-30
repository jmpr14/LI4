﻿import React, { Component } from 'react';
import axios from 'axios';

import { Layout } from './Layout';
import Medicos from './images/medicos.png';
import { CONTAS_URL } from './api';

import './Registar.css';

const InitialState = {
    codR: -1,
    codI: -1,
    isRegistarOn: true,
    name: '',
    dataNascimento: null,
    email: '',
    morada: '',
    codigo_postal: '',
    password: '',
    nif: '',
    contactos: '',
    localidade: '',
    type: ''
};

export class Registar extends Component {
    static displayName = Registar.name;

    constructor(props) {
        super(props);
        this.state = InitialState;
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("Falta definir as acoes para os eventos");
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    // Enviar um mail e receber um codigo
    submitNew = (event) => {
        event.preventDefault();

        axios.get(`${CONTAS_URL}/email`, {
            params: {
                Email: this.state.email
            }
        })
            .then(conta => {
                this.setState({ codR: conta.data });
            })
            .catch(err => console.log(err));

        (this.state.isRegistarOn) ? this.setState({ isRegistarOn: false }) : this.setState({ isRegistarOn: true });

    }

    // Submeter um novo usuario, caso o codigo esteja bem
    handleCheck = (event) => {
        event.preventDefault();

        let codReg = this.state.codR;
        let codIns = this.state.codI;

        if ((parseInt(codReg.toString()) - parseInt(codIns.toString())) == 0) {
            axios.post(`${CONTAS_URL}`, {
                type: this.state.type,
                Nome: this.state.name,
                Email: this.state.email,
                Password: this.state.password,
                DataNascimento: this.state.dataNascimento,
                Morada: this.state.morada,
                Nif: this.state.nif,
                Codigo_postal: this.state.codigo_postal,
                Contactos: this.state.contactos,
                Localidade: this.state.localidade
            })
                .then(conta => {
                    //this.props.addUserToState(conta);
                    //this.props.toggle();
                    alert("Nova Conta Registada");
                })
                .catch(err => console.log(err));
        } else { alert("Código Inserido Inválido"); }
        this.setState(InitialState);
        (this.state.isRegistarOn) ? this.setState({ isRegistarOn: false }) : this.setState({ isRegistarOn: true });
    }

    render() {
        return (
            <Layout>
                {(this.state.isRegistarOn) ?
                    <div class="container">
                        <div class="op2">
                            <img class="imagem" src={Medicos} width="120" height="120" />
                        </div>
                        <div class="op1">
                            <form onSubmit={this.submitNew}>
                                <h1 class="Regp"> Registar {this.state.type}</h1>
                                <p class="Regp"> Tipo de Registo: </p>
                                <div className="radio">
                                    <label class="Regp">
                                        <input
                                            type="radio"
                                            name='type'
                                            value="Medico"
                                            onChange={this.myChangeHandler}
                                        />
                                        Médico &emsp;
                                </label>
                                    <b />
                                    <label class="Regp">
                                        <input
                                            type="radio"
                                            name='type'
                                            value="Paciente"
                                            onChange={this.myChangeHandler}
                                        />
                                        Paciente
                                </label>
                                </div>
                                <p class="Regp">Insira o nome:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='name'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a data de nascimento:</p>
                                <input
                                    class="Regp"
                                    type='date'
                                    name='dataNascimento'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira o email:</p>
                                <input
                                    class="Regp"
                                    type="email"
                                    name='email'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a password:</p>
                                <input
                                    class="Regp"
                                    type="password"
                                    name='password'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a morada:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='morada'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a localidade:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='localidade'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira o NIF:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='nif'
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira a Codigo-Postal:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='codigo_postal'
                                    placeholder="XXXX-XXX"
                                    required pattern="\d{4}-\d{3}"
                                    onChange={this.myChangeHandler}
                                />
                                <p class="Regp">Insira o seu contacto telefónico:</p>
                                <input
                                    class="Regp"
                                    type="text"
                                    name='contactos'
                                    onChange={this.myChangeHandler}
                                />
                                <br />
                                <br />
                                <input class="Regs" type='submit' value="Registar" />
                            </form>
                        </div>
                    </div>
                    : 
                    <div class="container">
                        <div class="op2">
                            <img class="imagem" src={Medicos} width="120" height="120" />
                        </div>
                        <div class="op1">
                            <form onSubmit={this.handleCheck}>
                                <h1> Insira o Código de Registo enviado para o seu email {this.state.codR}</h1>
                                <input
                                    type="text"
                                    name='codI'
                                    placeholder="Insira o código..."
                                    onChange={this.myChangeHandler}
                                />
                                <br />
                                <br />
                                <input type='submit' />
                            </form>
                        </div>
                    </div>
                    }
                </Layout>
        );
    }
}
