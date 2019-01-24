import React from 'react';


export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            priority: 'low'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (/\S/.test(this.state.name) && /\S/.test(this.state.priority)) {
            this.props.addTodo(this.state.name, this.state.priority);
            this.setState({name: ''});
        }
    }

    render() {
        return (
            <div className='add-todo'>
                <form>
                    <input name='name' type='text' value={this.state.name} onChange={this.handleChange}/>
                    <select name='priority' onChange={this.handleChange} value={this.state.priority}>
                        <option value='high'>high</option>
                        <option value='low'>low</option>
                    </select>
                    <button type='submit' onClick={this.handleSubmit}>Add</button>
                </form>
            </div>
        )
    }
}