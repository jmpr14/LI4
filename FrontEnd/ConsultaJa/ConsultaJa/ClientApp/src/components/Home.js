﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './Home.css';
import { Layout } from './Layout';

import Medicos from './images/medicos.png';
import Casa1 from './images/casas3.png';
import Casa2 from './images/casas4.jpg';
import Casa3 from './images/triangulo_casas.png';
import Estetoscopio from './images/estetoscopio.png';
import Trust from './images/trust.jpg';
import Logo from './images/logo_consultaJa.png';


export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            age: null,
        };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        let age = this.state.age;
        if (!Number(age)) {
            alert("Your age must be a number");
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    myFunction = () => {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        return (
            <Layout>
            <div class="wrapper">
            <form>
                <div>
                    <h1>ConsultaJa</h1>
                    <p>Bem vindo à nossa plataforma de consultas ao domicílio.</p>
                    <p>Aqui pode realizar várias ações como:</p>
                    <ul>
                        <li>Criar uma conta, registando-se na nossa aplicação.</li>
                        <li>Fazer login na nossa plataforma para poder explorar mais recursos, como marcação de consultas, assim como os referidos a seguir.</li>
                        <li>Fazer um pedido de marcação de consultas.</li>
                        <li>Consultar a consultas pendentes.</li>
                        <li>Consultar a consultas realizadas.</li>
                        <li>Editar perfil.</li>
                        <li>Entre outros...</li>
                    </ul>
                    <p className="semilargecenter"> Crie uma conta e comece já a usufruir de todos os nossos serviços!</p>
                </div>

                <div className="img">
                    <img src={Medicos} />
                </div>

                <div>
                    <h1>Os Nossos Serviços</h1>
                    <ul>
                        <li>Os nossos serviços refletem-se em consultas ao domicílio, combinadas entre médicos e 
                            clientes/pacientes, de forma a garantir o maior conforto aos nossos clientes.</li>
                        <li>Estes serviços funcionam através de pedidos de consultas que posteriormente serão aceites por médicos,
                        e depois confirmados pelos nossos pacientes, podendos estes aceitar ou não depois a consulta, tendo em conta
                            o horário e a disponibilidade do paciente.</li>
                        <li>Assim, todos os nossos serviços são desenvolvidos tendo em conta a facilidade e conforto de utilização,
                            bem como a sua qualidade, porporcinando os melhores cuidados possíveis.</li>
                    </ul>
                </div>

                <div className="img">
                    <img height={250} src={Casa1} />
                    <img height={250} src={Estetoscopio} />
                    <img height={250} src={Casa3} />
                </div>

                <div>
                    <h1>Quem Somos?</h1>
                    <ul>
                        <li>Somos uma empresa empenhada em fornecer os melhores cuidados de saúde possiveis à população em geral sem a
                            necessidade de se descolarem e esperarem em grandes filas.</li>
                        <li>Assim pretendemos oferecer uma maior comodidade e bem-estar ao máximo de pessoas possiveis, tentando sempre
                            melhorar e desenvolver os nossos serviços.</li>
                    </ul>
                </div>

                <div className="img">
                    <img height={250} src={Casa2} />
                </div>

                <div>
                    <h1> O que fazemos?</h1>
                    <ul>
                        <li>O nosso objetivo é promover o bem-estar às pessoas, da melhor forma possivel. Para isso trabalhamos no
                            sentido de melhorar a nossa aplicação.</li>
                        <li>Pretendemos melhorar este projeto ao máximo possível, para que todos possam usufruir de todos os nossos
                            serviços.</li>
                        <li>Assim, todos os dias trabalhamos para que possamos desenvolver novas ferramentas para oferecer mais recursos
                            e funcionalidades deste projeto aos nossos clientes.</li>
                    </ul>
                </div>

                <div className="img">
                        <img height={200} width={300} src={Trust} />
                        <img height={200} src={Logo} />
                </div>

            </form>
            </div>
            </Layout>
        );
    }
}
