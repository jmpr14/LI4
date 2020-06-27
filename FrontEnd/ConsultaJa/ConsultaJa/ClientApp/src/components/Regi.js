import React, { Component } from 'react';
import axios from 'axios';

import { NavBarOut } from './NavBarOut';
import Medicos from './images/medicos.png';
import { CONTAS_URL } from './api';
import { NavBarOut } from './NavBarOut';
import { Rodape } from './Rodape';

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

export class Regi extends Component {
    static displayName = Regi.name;

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
            <>
            <NavBarOut/>
                {(this.state.isRegistarOn) ?
                    
                    <section class="relative w-full h-full ">
                        <div class="op2">
                            <img class="imagem" src={Medicos} width="120" height="120" />
                        </div>
                        
                        <div class="op1">
                            <form class="w-full max-w-lg" onSubmit={this.submitNew}>
                                <p class="uppercase tracking-wide text-gray-700 text-xs font-bold"> Tipo de Registo: </p>
                                <div className="radio">
                                    <label class="uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        <input
                                            type="radio"
                                            name='type'
                                            value="Medico"
                                            onChange={this.myChangeHandler}
                                        />
                                        &ensp; Médico &emsp;
                                </label>
                                    <b />
                                    <label class="uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        <input
                                            type="radio"
                                            name='type'
                                            value="Paciente"
                                            onChange={this.myChangeHandler}
                                        />
                                        &ensp; Paciente
                                </label>
                                </div>
                                <div class="flex flex-wrap -mx-3 ">
                                    <div class="w-full px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                                            Name
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" name='name' type="text" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 ">
                                    <div class="w-full px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-date">
                                            Data de Nascimento
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-date" name='dataNascimento' type="date" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 ">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                            Email
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" name='email' type="email" placeholder="exemplo@email.com" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 ">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Password
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" name='password' type="password" placeholder="******************" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 ">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-morada">
                                            Morada
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-morada" name='morada' type="text" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-3">
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                            Cidade
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" name='localidade' placeholder="Braga" onChange={this.myChangeHandler}/>
                                    </div>
                                    <div class="w-full md:w-1/2 px-3 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                            Zip
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="XXXX-XXX" name='codigo_postal' required pattern="\d{4}-\d{3}" onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-2">
                                    <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-nif">
                                            NIF
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-nif" name='nif' type="text" onChange={this.myChangeHandler} />
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contacto">
                                            Contacto
                                        </label>
                                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contacto" name='contactos' type="text" onChange={this.myChangeHandler} />
                                    </div>
                                </div>

                                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded mb-10" type="submit">
                                    Registar
                                </button>
                            </form>
                        </div>
                    </section>
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
                <Rodape/>
                </>
        );
    }
}
