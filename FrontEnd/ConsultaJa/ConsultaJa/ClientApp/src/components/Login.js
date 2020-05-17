import React, { Component } from 'react';
import axios from 'axios';

import './Login.css'
import { CONTAS_URL } from './api';
import { ADMIN_URL } from './api';
import { Layout } from './Layout';
import { Redirect } from 'react-router-dom';


export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valido: false,
            type: '',
            senha: '',
            error: '',
            error1: '',
            dadosConta: [],
            dadosContaAdmin: []
        };
    }

    // Handler para o login como Paciente ou Medico
    handlerLogin = (event) => {

        event.preventDefault();

        axios.post(`${CONTAS_URL}/login`, {
             Email: this.state.email,
             Password: this.state.password
        })
            .then(response => {
                alert("Successfully logged in!!!");
                console.log(response);
                this.state.valido = true;
                this.setState({ dadosConta: response.data });
                localStorage.clear();
                localStorage.setItem("token", this.state.dadosConta.token);
                if (this.state.dadosConta.type[0] == 'P') {
                    this.state.type = "Paciente";
                    this.props.history.push("/perfilPaciente");
                } else if (this.state.dadosConta.type[0] == 'M') {
                    this.state.type = "Medico";
                    this.props.history.push("/perfilMedico");
                } else {
                    this.setState({
                        error:
                            "Houve um problema com o login, verifique as suas senhas."
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique as suas senhas."
                });
                console.log(error);
            })
    }

    // Handler para o login como Administrador
    mySubmitHandler1 = (event) => {
        event.preventDefault();
        if (!this.state.senha) {
            this.setState({ error1: "Preencha as senhas para continuar!" });
        } else {
            axios.post(`${ADMIN_URL}/login`, {
                Senha: this.state.senha
            })
                .then(response => {
                    alert("Successfully logged in!!!");
                    console.log(response);
                    this.state.valido = true;
                    this.setState({ dadosContaAdmin: response.data });
                    localStorage.clear();
                    localStorage.setItem("token", this.state.dadosContaAdmin.token);
                    if (this.state.dadosContaAdmin.type[0] == 'A') {
                        this.state.type = "Admin";
                        this.props.history.push("/perfilAdmin");
                    } else {
                        this.setState({
                            error1:
                                "Houve um problema com o login, verifique as suas senhas."
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        error1:
                            "Houve um problema com o login, verifique as suas senhas."
                    });
                    console.log(error);
                })
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        if (this.state.valido) {
            if (this.state.type[0] === 'P') return (<Redirect to="/perfilPaciente" />);
            else if (this.state.type[0] === 'M') return (<Redirect to="/perfilMedico" />);
            else return (<Redirect to="/perfilAdmin" />);
        }
        return(
            <Layout>
            <section>
                <article>
                    <form onSubmit={this.handlerLogin}>
                <h1> Login </h1>
                {this.state.error && <p class="log">{this.state.error}</p>}
                <br />
                <i class="fas fa-user"></i>
                <input
                    className="form-control"
                    type="email"
                    name='email'
                    icon="envelope"
                    placeholder="Email"
                    onChange={this.myChangeHandler}
                />
                <br />
                <i class="fas fa-lock"></i>
                <input
                    className="form-control"
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange={this.myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' value="ENTRAR" />
            </form>
            </article>
            <article>
            <form onSubmit={this.mySubmitHandler1}>
                    <h1> Login como Admin </h1>
                    {this.state.error1 && <p class="log">{this.state.error1}</p>}
                    <br />
                    <i class="fas fa-lock"></i>
                    <input
                        className="form-control"
                        type="password"
                        name='senha'
                        placeholder="Senha secreta"
                        onChange={this.myChangeHandler}
                    />
                    <br />
                    <br />
                    <input type='submit' value="ENTRAR" />
            </form>
            </article>
            </section>
            </Layout>
        );
    }
}
