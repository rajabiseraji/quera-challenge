import React from 'react';


export default class FilterTodo extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleFilter();
    }

    render() {
        return (
            <div className='filter-todo'>
                undone only <input type='checkbox' onChange={this.handleClick} checked={this.props.undoneOnly}/>
            </div>
        )
    }
}