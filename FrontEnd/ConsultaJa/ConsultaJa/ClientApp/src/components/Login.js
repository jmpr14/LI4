import React, { Component } from 'react';
import axios from 'axios';

import './Login.css'
import { CONTAS_URL } from './Constants';
import { Layout } from './Layout';

export var TOKEN_KEY = false;
export var userid = '';
export const isAuthenticated = () => { return TOKEN_KEY };
export const userId = () => { return userid };
export const login = (varia, id) => {
    userid = id;
    TOKEN_KEY = varia;
};

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
        };
    }

    handlerLogin = (event) => {

        event.preventDefault();

        axios.get(`${CONTAS_URL}/login`, {
            params: {
                Email: this.state.email,
                Password: this.state.password
            }
        })
            .then(response => {
                alert("Successfully logged in!!!");
                console.log(response);
                this.state.valido = true;
                login(this.state.valido, response.data);
                if (response.data[0] == 'P') {
                    this.props.history.push("/perfilPaciente");
                } else if (response.data[0] == 'M') {
                    this.props.history.push("/perfilMedico");
                }
            })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            })
    }

    mySubmitHandler1 = (event) => {
        event.preventDefault();
        if (!this.state.senha) {
            this.setState({ error1: "Preencha senhas para continuar!" });
        } else {
            try {
                //alert("Falta definir as acoes para os eventos");
                this.state.valido = true;
                login(this.state.valido);
                this.props.history.push("/perfilAdmin");
            } catch (err) {
                this.setState({
                    error1:
                        "Houve um problema com o login, verifique as suas senhas."
                });
            }
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <Layout>
            <section>
                <article>
                    <form onSubmit={this.handlerLogin}>
                <h1> Login </h1>
                {this.state.error && <p class="log">{this.state.error}</p>}
                <br />
                <p>Insira o email:</p>
                <input
                    className="form-control"
                    type="email"
                    name='email'
                    icon="envelope"
                    placeholder="Your e-mail"
                    onChange={this.myChangeHandler}
                />
                <br />
                <p>Insira a password:</p>
                <input
                    className="form-control"
                    type="password"
                    name='password'
                    placeholder="password"
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
                    <p>Insira a senha de acesso:</p>
                    <input
                        className="form-control"
                        type="password"
                        name='senha'
                        placeholder="senha"
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
