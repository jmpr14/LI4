import React from 'react';

const ListItem = ({ onChange, onDelete, value, value1, value2 }) => {
    return (
        <div>
            <input
                value={value}
                readonly="readonly"
            />
            <input
                value={value1}
                readonly="readonly"
            />
            <input
                value={value2}
                readonly="readonly"
            />
            <button onClick={onDelete}>Excluir</button>
        </div>
    );
};

export default ListItem;