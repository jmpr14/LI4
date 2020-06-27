import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';

function string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}


export class AnotarConsultas extends Component {
    static displayName = AnotarConsultas.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loading: false, // to keep track of when form submitted
            errors: null, // for displaying errors
            file: '', // the file type the user chooses to download
            recebido: ''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            errors: null,
            loading: true,
        }, () => {
            api.get(`consultas/receitas`, {
                params: {
                    file: this.state.file
                }
            })
                .then(response => {
                    console.log("Got the PDF file!");

                    // Do with the PDF data as you please.
                    this.setState({ recebido: response.data.conteudo });

                    console.log(this.state.recebido);

                    var downloadLink = document.createElement('a')
                    downloadLink.target = '_blank'
                    downloadLink.download = 'receita'
                    var blob = new Blob([this.state.recebido], { type: 'application/pdf', charset: 'default' })
                    var URL = window.URL || window.webkitURL
                    var downloadUrl = URL.createObjectURL(blob)
                    downloadLink.href = downloadUrl
                    //document.body.append(downloadLink) // THIS LINE ISN'T NECESSARY
                    downloadLink.click()
                    //document.body.removeChild(downloadLink);  // THIS LINE ISN'T NECESSARY
                    URL.revokeObjectURL(downloadUrl);
                    this.setState({
                        loading: false
                    });
                })
                .catch(error => {
                    this.setState({
                        errors: error.data,
                        loading: false
                    });
                });
        });
    }

    handleChange = (event) => {
        this.setState({
            // substring to is to limit to 3 characters
            file: event.currentTarget.value.substring(0, 3)
        });
    }
    render() {
        const { loading, errors, file } = this.state;
        return (
            <LayoutMedico>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h1> Anotar Consultas </h1>
                    </div>
                    {(errors)
                        ? (<div className="form-group">
                            <div className="alert alert-danger"><strong>Error!</strong> {errors.message || 'Something went wrong.'}</div>
                        </div>
                        )
                        : null
                    }
                    <input disabled={loading} onChange={this.handleChange} className="form-control" value={file} type="text" name="file" placeholder="File type, ex csv, pdf, png, etc" autoComplete="off" />
                    <div className="form-group">
                        <button disabled={loading} className="btn btn-primary">{(loading) ? 'Downloading...' : 'Download'}</button>
                    </div>
                </form>
            </LayoutMedico>
        )
    }

}