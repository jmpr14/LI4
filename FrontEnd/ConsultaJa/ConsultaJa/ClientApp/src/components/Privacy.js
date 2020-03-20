import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


export class Privacy extends Component {
    static displayName = Privacy.name;

    render() {
        return (
            <form>
            <h1> Privacy </h1>
            <ol>
                <item>
                    <h3>1. Questões</h3>
                    <p>Caso tenha qualquer questão relacionada com o tratamento dos seus dados pessoais 
                            e com o exercício dos direitos que lhe são conferidos pela legislação aplicável 
                            contacte-nos através dos seguintes contactos:
                    </p>
                    <p dir="ltr">E-mail: <a href="mailto:consultaja4@gmail.com">consultaja4@gmail.com</a></p>
                </item>

                <item>
                    <h3>2. O que são dados pessoais?</h3>
                    <p>Dados pessoais são qualquer informação, de qualquer natureza e independentemente 
                       do respetivo suporte, incluindo som e imagem, relativa a uma pessoa singular identificada 
                       ou identificável.</p> 
                    <p> É considerada identificável a pessoa singular que possa ser identificada, 
                        direta ou indiretamente, designadamente por referência a um nome, número de identificação, 
                        dados de localização, identificadores por via eletrónica ou a um ou mais elementos específicos 
                        da sua identidade física, fisiológica, genética, mental, económica, cultural ou social.
                    </p>
                </item>

                <item>
                    <h3>3. No que consiste o tratamento de dados pessoais?</h3>
                    <p>O tratamento de dados pessoais consiste numa operação ou conjunto 
                       de operações efetuadas sobre dados pessoais ou conjuntos de dados pessoais, 
                       através de meios automatizados, ou não, nomeadamente a recolha, o registo, 
                       a organização, a estruturação, a conservação, a adaptação, a recuperação, 
                       a consulta, a utilização, a divulgação, difusão, comparação, interconexão, 
                       a limitação, o apagamento ou a destruição. </p>
                </item>
            </ol>
            </form>
        );
    }
}
