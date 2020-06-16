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
            idConsulta: -1,
            tasks: [],
            observacoes: '',
            escolheCons: false,
            consultasAgendadas: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        var decoded = decode(token);
        const idD = decoded.Id;
        //console.log("Id" + idD);
        this.state.id = idD;
        // Buscar a lista de consultas agendadas
        api.get(`consultas/listaAg`, {
            params: {
                id: this.state.id
            }
        })
            .then(res => { console.log(res); this.setState({ consultasAgendadas: res.data }); })
            .catch(error => {
                alert("ERROR! " + error);
                console.log(error);
            });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(this.state.observacoes)
        console.log(this.state.tasks)

        api.post(`consultas/posconsulta`, {
            idconsulta: this.state.idConsulta,
            prescricoes: this.state.tasks,
            observacoes: this.state.observacoes
        })
            .then(conta => {
                console.log(conta)
                this.props.history.push("/perfilPaciente");
            })
            .catch(err => console.log(err));

    }

    myChangeHandler = (event) => {
        let val = event.target.value;
        this.setState({ observacoes: val });
    }

    addNewTask = (task, task1, task2) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.push({ id: this.state.tasks.length, nome: task, quantidade: task1, posologia: task2 });
        this.setState({ tasks: itensCopy });
    }

    updateTask = ({ target }, index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1, { id: index, nome: target.value, quantidade: target.value1, posologia: target.value2 });
        this.setState({ tasks: itensCopy });
    }

    deleteTask = (index) => {
        const itensCopy = Array.from(this.state.tasks);
        itensCopy.splice(index, 1);
        this.setState({ tasks: itensCopy });
    }

    handlerChoose = (event) => {

        let val = event.target.dataset.consulta;

        console.log("IdConsulta = " + val)

        event.preventDefault();

        this.setState({ idConsulta: val })

        this.setState({ escolheCons: true })
    }

    render() {
        return (
            <LayoutMedico>
                <div>
                    <h1> Pós-Consulta </h1>
                </div>
                {(this.state.escolheCons) ?
                    <div>
                        <div>
                            <br />
                            <h3> Adicionar Receita </h3>
                        </div>
                        <div>
                            <div>
                                <NewTaskInput onSubmit={this.addNewTask} />
                                <form onSubmit={this.onSubmitHandler}>
                                    {this.state.tasks.map(({ id, nome, quantidade, posologia }, index) => (
                                        <ListItem
                                            key={id}
                                            value={nome}
                                            value1={quantidade}
                                            value2={posologia}
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
                                    <input type='submit' value="FINALIZAR CONSULTA" />
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <table>
                            <tr>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Marcar como Efetuada</th>
                            </tr>
                            {this.state.consultasAgendadas.map(consulta =>
                                <tr>
                                    <td>{consulta.data}</td>
                                    <td>{consulta.hora}</td>
                                    <td>Sr(a). {consulta.paciente}</td>
                                    <td> <button key={consulta.id} data-consulta={consulta.id} onClick={this.handlerChoose}> Marcar como Efetuada </button> </td>
                                </tr>)
                            }
                        </table>
                    </div>
                    }
            </LayoutMedico>
        )
    }

}
