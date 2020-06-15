import React, { Component, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { LayoutMedico } from './LayoutMedico';
import api from './api';
import ListItem from './ListItem'
import NewTaskInput from './NewTaskInput'


//<div>
//    <pre>
//        {JSON.stringify(this.state.tasks, null, 8)
//        }
//    </pre>
//</div>

export class PosConsulta extends Component {
    static displayName = PosConsulta.name;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            tasks: [],
            observacoes: ''
        };
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(this.state.observacoes)
        console.log(this.state.tasks)

        //api.get(`${CONSULTAS_URL}/`, {
        //    params: {
        //        Email: this.state.email
        //    }
        //})
        //    .then(conta => {
        //        this.setState({ codR: conta.data });
        //    })
        //    .catch(err => console.log(err));

    }

    myChangeHandler = (event) => {
        let val = event.target.value;
        this.setState({ observacoes: val });
    }

    addNewTask = (task, task1, task2) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.push({ id: this.state.tasks.length, value: task, value1: task1, value2: task2 });
        this.setState({ tasks: itensCopy });
    }

    updateTask = ({ target }, index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1, { id: index, value: target.value, value1: target.value1, value2: target.value2 });
        this.setState({ tasks: itensCopy });
    }

    deleteTask = (index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1);
        this.setState({ tasks: itensCopy });
    }

    render() {
        return (
            <LayoutMedico>
                <div>
                    <h1> Pôs-Consulta </h1>
                </div>
                <div>
                    <div>
                        <br />
                        <h3> Adicionar Receita </h3>
                    </div>
                    <div>
                        <div>
                            <form onSubmit={this.onSubmitHandler}>
                            <NewTaskInput onSubmit={this.addNewTask} />
                            {this.state.tasks.map(({ id, value, value1, value2 }, index) => (
                                <ListItem
                                    key={id}
                                    value={value}
                                    value1={value1}
                                    value2={value2}
                                    onChange={(event) => this.updateTask(event, index)}
                                    onDelete={() => this.deleteTask(index)}
                                />
                            ))}
                            <br />
                            <div>
                                <br />
                                <h3> Adicionar Observações </h3>
                                <textarea rows="10" cols="40" maxlength="400" onChange={this.myChangeHandler}></textarea>
                            </div>
                            <input type='submit' value="MARCAR CONSULTA" />
                            </form>
                        </div>
                    </div>
                </div>
            </LayoutMedico>
        )
    }

}
