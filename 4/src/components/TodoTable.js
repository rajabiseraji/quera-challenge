import React from 'react';
import v4 from 'uuid';

import TodoList from './TodoList';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';


export default class TodoTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            undoneOnly: false,
            todoList: []
        };

        this.toggleDone = this.toggleDone.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    toggleFilter() {
        this.setState(prevState => ({
            undoneOnly: !prevState.undoneOnly
        }));
    }

    toggleDone(id) {
        const {todoList} = this.state;
        let newTodo = todoList;
        newTodo.map((item) => {
            if(item.id === id)
                item.done = !item.done;
            return item;
        });
        this.setState(() => ({
            todoList: newTodo,
        }))
    }

    addTodo(name, priority) {
        const todoItem = {
            name, 
            priority,
            done: false,
            id: v4(),
        }
        const {todoList} = this.state;
        let newTodo = todoList;
        if(!todoList.length || todoList.length === 0){
            newTodo.push(todoItem);
            this.setState(() => ({todoList: newTodo}));
        }
        else {
            let newTodo = todoList;
            newTodo.push(todoItem);
            newTodo.sort((a,b) => {
                if(a.priority !== b.priority && b.priority === 'high')
                    return 1;
                else if (a.priority !== b.priority && a.priority === 'high')
                    return -1;
                
                if(a.priority === b.priority)
                    return a.name.localeCompare(b.name);
                return -1;
            });
            this.setState(() => ({
                todoList: newTodo,
            }))
        }
        
    }

    render() {
        return (
            <div className='todo-table'>
                <AddTodo addTodo={this.addTodo}/>
                <FilterTodo undoneOnly={this.state.undoneOnly} toggleFilter={this.toggleFilter}/>
                <TodoList todoList={this.state.todoList} toggleDone={this.toggleDone}
                          undoneOnly={this.state.undoneOnly}/>
            </div>
        )
    }
}
