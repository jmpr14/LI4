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
            error: '',
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                alert("Falta definir as acoes para os eventos");
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

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h1> Login {this.state.email} </h1>
                {this.state.error && <p class="log">{this.state.error}</p>}
                <p>Insira o email:</p>
                <input
                    type="email"
                    name='email'
                    placeholder="email"
                    onChange={this.myChangeHandler}
                />
                <p>Insira a password:</p>
                <input
                    type="password"
                    name='password'
                    placeholder="password"
                    onChange={this.myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' />
            </form>

        );
    }
}
