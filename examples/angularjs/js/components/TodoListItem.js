import { PropTypes, Component, classNames, autoBind } from 'vendors';

const { object, func } = PropTypes;

export default class TodoListItem extends Component {
    static propTypes = {
        todo: object,
        editedTodo: object,
        toggleCompleted: func.isRequired,
        editTodo: func.isRequired,
        removeTodo: func.isRequired,
        saveEdits: func.isRequired
    }
    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            completed: props.todo.completed,
            title: props.todo.title,
            editing: false
        }
    }
    toggleEdit(){
        this.setState({
            editing: true
        });
        this.props.editTodo(this.props.todo);
    }
    handleChange(e){
        this.setState({
            title: e.target.value
        });
    }
    handleKeyDown(e){
        // Handle esc key. Replacement for todo-escape component
        if(e.keyCode === 27){
            this.setState({
                editing: false
            });
            this.props.revertEdits(this.props.todo);
        }
    }
    handleSubmit(type){
        this.props.todo.title = this.state.title;
        this.props.saveEdits(this.props.todo, type);
        this.setState({
            editing: false
        });
    }
    componentWillReceiveProps(nextProps){
        // Update completed state
        this.setState({
           completed: nextProps.todo.completed,
           title: nextProps.todo.title
        });
    }
    render(){
        const { todo } = this.props;
        const { completed, title, editing } = this.state;
        return (
            <li className={classNames({'completed': todo.completed}, {'editing': editing })}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={() => this.props.toggleCompleted(todo, !todo.completed)} />
                    <label onDoubleClick={this.toggleEdit}>{todo.title}</label>
                    <button className="destroy" onClick={() => this.props.removeTodo(todo)}></button>
                </div>
                {editing &&
                    <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit('submit')}}>
                        <input className="edit" value={title} onChange={this.handleChange}  onKeyDown={this.handleKeyDown}
                               onBlur={(e) => {e.preventDefault(); this.handleSubmit('blur')}}
                               autoFocus/> {/* autoFocus - replacement for todo-focus directive */}
                    </form>
                }
            </li>
        )
    }
}
