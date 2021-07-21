import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    clickTodo: PropTypes.func
};

TodoList.defaultProps = {
    todos: [],
    clickTodo: null
}

function TodoList(props) {
    const {todos, clickTodo} = props;
    function handleClick(todo) {
        if(clickTodo) {clickTodo(todo);}
    }
    return (
        <div>
            <ul>
                { todos.map( (item) => (
                    <li 
                        key={item.id} 
                        onClick={ () => handleClick(item) }
                    > {item.title} 
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default TodoList;