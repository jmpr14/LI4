import React, { Component } from 'react';

import './Login.css'

export var TOKEN_KEY = false;
export const isAuthenticated = () => { return TOKEN_KEY };
export const login = (varia) => {
    
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

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                //alert("Falta definir as acoes para os eventos");
                this.state.valido = true;
                login(this.state.valido);
                this.props.history.push("/perfil");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
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
                this.props.history.push("/perfil");
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
            <section>
            <article>
            <form onSubmit={this.mySubmitHandler}>
                <h1> Login </h1>
                {this.state.error && <p class="log">{this.state.error}</p>}
                <br />
                <p>Insira o email:</p>
                <input
                    type="email"
                    name='email'
                    placeholder="email"
                    onChange={this.myChangeHandler}
                />
                <br />
                <p>Insira a password:</p>
                <input
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
        );
    }
}
