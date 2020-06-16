import React, { useState } from 'react';

const NewTaskInput = ({ onSubmit }) => {

    const [newItem, setNewItem] = useState('');
    const [newItem1, setNewItem1] = useState(0);
    const [newItem2, setNewItem2] = useState('');

    function setNewTask(event) {
        setNewItem(event.target.value);
    }

    function setNewTask1(event) {
        setNewItem1(event.target.value);
    }

    function setNewTask2(event) {
        setNewItem2(event.target.value);
    }

    function submit(e) {
        e.preventDefault();
        console.log(newItem);
        console.log(newItem1);
        console.log(newItem2);
        onSubmit(newItem, newItem1, newItem2);
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input
                    placeholder="Nome do Fármaco"
                    type='text'
                    onChange={setNewTask}
                />
                <br/>
                <input
                    placeholder="Quantidade"
                    type='number'
                    onChange={setNewTask1}
                />
                <br />
                <input
                    placeholder="Posologia"
                    type='text'
                    onChange={setNewTask2}
                />
                <br />
                <button type="submit">
                    Adicionar
                </button>
            </form>
        </div>
    )
};

export default NewTaskInput;