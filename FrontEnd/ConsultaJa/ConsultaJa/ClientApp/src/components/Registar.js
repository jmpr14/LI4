import React, { Component } from 'react';

export class Registar extends Component {
    static displayName = Registar.name;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dataNascimento: null,
            email: '',
            morada: '',
            localidade: '',
            password: '',
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let age = this.state.dataNascimento;
        alert("Falta definir as acoes para os eventos");
        if (!Number(age)) {
            alert("A idade deve ser um valor numérico!");
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
                <h1> Registar-se {this.state.email} </h1>
                <p>Insira o nome:</p>
                <input
                    type="text"
                    name='name'
                    onChange={this.myChangeHandler}
                />
                <p>Insira a data de nascimento:</p>
                <input
                    type='date'
                    name='dataNascimento'
                    onChange={this.myChangeHandler}
                />
                <p>Insira o email:</p>
                <input
                    type="email"
                    name='email'
                    onChange={this.myChangeHandler}
                />
                <p>Insira a password:</p>
                <input
                    type="password"
                    name='password'
                    onChange={this.myChangeHandler}
                />
                <p>Insira a morada:</p>
                <input
                    type="text"
                    name='morada'
                    onChange={this.myChangeHandler}
                />
                <p>Insira a localidade:</p>
                <input
                    type="text"
                    name='localidade'
                    onChange={this.myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' />
            </form>

        );
    }
}
