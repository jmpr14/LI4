import React, { Component } from 'react';

import { login } from './Login';


export class Logout extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        let variable = false;

        login(variable);

        this.props.history.push("/");
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    VOCÊ SAIU DA APLICAÇÃO!!!
                </label>
                <input type="submit" value="Voltar à Home" />
            </form>
        );
    }
}
