import React from 'react';

const ListItem = ({ onChange, onDelete, value, value1, value2 }) => {
    return (
        <div class="mt-6">
            <input
                class="p-3 font-bold bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell"
                value={value}
                readonly="readonly"
            />
            <input
                class="p-3 font-bold bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell"
                value={value1}
                readonly="readonly"
            />
            <input
                class="p-3 font-bold bg-gray-100 text-gray-600 border border-gray-300 hidden lg:table-cell"
                value={value2}
                readonly="readonly"
            />
            <button class="hover:bg-red-600 bg-red-400 text-blue-dark font-semibold text-white py-2 px-3 border rounded" onClick={onDelete}>Excluir</button>
        </div>
    );
};

export default ListItem;