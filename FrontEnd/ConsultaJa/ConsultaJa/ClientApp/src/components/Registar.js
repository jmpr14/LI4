import React, { Component } from 'react';
import axios from 'axios';

import { Layout } from './Layout';
import Medicos from './images/medicos.png';

import './Registar.css';

export class Registar extends Component {
    static displayName = Registar.name;

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
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

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    submitNew = (event) => {
        event.preventDefault();

        axios.post(`https://localhost:5001/contas`, {
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
                alert("Novo user " + conta.data);
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <Layout>
            <div class="container">
            <div class="op2">
                 <img class="imagem" src={Medicos} width="120" height="120" />
            </div>
            <div class="op1">
            <form onSubmit={this.submitNew}>
                <h1> Registar {this.state.type}</h1>
                <p> Tipo de Registo: </p>
                <div className="radio">
                <label>
                <input 
                    type="radio"
                    name='type'
                    value="Medico"
                    onChange={this.myChangeHandler}
                        />
                        Médico &emsp;
                </label>
                    <b/>
                <label>
                <input
                     type="radio"
                     name='type'
                     value="Paciente"
                     onChange={this.myChangeHandler}
                    />
                    Paciente
                </label>
                </div>
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
                <p>Insira o NIF:</p>
                <input
                    type="text"
                    name='nif'
                    onChange={this.myChangeHandler}
                />
                <p>Insira a Codigo-Postal:</p>
                <input
                    type="text"
                    name='codigo_postal'
                    placeholder="XXXX-XXX"
                    required pattern="\d{4}-\d{3}"
                    onChange={this.myChangeHandler}
                />
                <p>Insira os seus contactos:</p>
                <input
                    type="text"
                    name='contactos'
                    onChange={this.myChangeHandler}
                />
                <br />
                <br />
                <input type='submit' value="Registar"/>
                    </form>
                </div>
                </div>
                </Layout>
        );
    }
}
