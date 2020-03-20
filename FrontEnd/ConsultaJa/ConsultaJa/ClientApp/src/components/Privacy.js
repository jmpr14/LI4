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
                <item> <h3 dir="ltr">1. Questões</h3>
                    <p>Caso tenha qualquer questão relacionada com o tratamento dos seus dados pessoais 
                            e com o exercício dos direitos que lhe são conferidos pela legislação aplicável 
                            contacte-nos através dos seguintes contactos:
                    </p>
                    <p dir="ltr">E-mail: <a href="mailto:consultaja4@gmail.com">consultaja4@gmail.com</a></p>
                </item>
            </ol>
            </form>
        );
    }
}
