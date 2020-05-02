import React, { Component } from 'react';

import { login } from './Login';

import { Layout } from './Layout';

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
            <Layout>
            <form onSubmit={this.handleSubmit}>
                <label>
                    VOCÊ SAIU DA APLICAÇÃO!!!
                </label>
                <input type="submit" value="Voltar à Home" />
            </form>
            </Layout>
        );
    }
}
