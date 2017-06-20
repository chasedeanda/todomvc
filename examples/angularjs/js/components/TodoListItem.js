import { PropTypes, Component, classNames } from 'vendors';

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
        this.state = {
            completed: props.todo.completed,
            title: props.todo.title
        }
    }
    componentWillReceiveProps(nextProps){
        // Update completed state
        this.setState({
           completed: nextProps.todo.completed,
           title: nextProps.todo.title
        });
    }
    render(){
        const { todo, editedTodo } = this.props;
        const { completed, title } = this.state;
        return (
            <li className={classNames({'completed': todo.completed}, {'editing': todo === editedTodo})}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={() => this.props.toggleCompleted(todo, !todo.completed)} />
                    <label onDoubleClick={() => this.props.editTodo(todo)}>{todo.title}</label>
                    <button className="destroy" onClick={() => this.props.removeTodo(todo)}></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); this.props.saveEdits(todo, 'submit') }}>
                    <input className="edit" value={title} onChange={(e) => this.setState({ title: e.target.value })} onBlur={() => this.props.saveEdits(todo, 'blur')} /> {/*todo-escape="$ctrl.revertEdits(todo)" todo-focus="todo == $ctrl.editedTodo" />*/}
                </form>
            </li>
        )
    }
}
