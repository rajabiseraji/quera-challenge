import React from 'react';


export default class TodoItem extends React.Component {

    constructor(props) {
        super(props);
    }

    clicked = (e) => {
        e.preventDefault();
        this.props.toggleDone(this.props.todo.id);
    }

    render() {
        return (
            <div className='todo-item' onClick={this.clicked}>
                <p>
                    <span className='name'>
                        {this.props.todo.name}
                    </span>{' '}

                    <span className='priority'>
                        {this.props.todo.priority}
                    </span>{' '}

                    <span className='status'>
                        {this.props.todo.done ? 'Done' : null}
                    </span>
                </p>
            </div>
        )
    }
}