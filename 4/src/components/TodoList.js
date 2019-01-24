import React from 'react';
import TodoItem from './TodoItem'


export default class TodoList extends React.Component {

    render() {
        const todoList = this.props.undoneOnly ? this.props.todoList.filter(todo => (!todo.done)) : this.props.todoList;
        return (
            <div className='todo-list'>
                {todoList.map(todo => {
                    return (
                        <TodoItem key={todo.id} todo={todo} toggleDone={this.props.toggleDone}/>
                    )
                })}
            </div>
        )
    }
}