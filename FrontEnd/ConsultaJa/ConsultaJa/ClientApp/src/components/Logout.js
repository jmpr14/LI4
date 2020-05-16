﻿import React, { Component } from 'react';

import { Layout } from './Layout';

export class Logout extends Component {

    constructor(props) {
        super(props);
        localStorage.removeItem("token");
    }

    handleSubmit = () => {

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
