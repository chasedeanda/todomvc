import { PropTypes, Component, axios, autoBind } from 'vendors';

import TodoList from './TodoList';

const { array, bool, func, string, number, object } = PropTypes;

export default class TodoComponent extends Component {
    static propTypes = {
        todos: array,
        saving: bool,
        newTodo: string,
        allChecked: bool,
        remainingCount: number,
        completedCount: number,
        status: string,
        statusFilter: object,
        editedTodo: object,
        markAll: func.isRequired,
        clearCompletedTodos: func.isRequired,
        toggleCompleted: func.isRequired,
        editTodo: func.isRequired,
        removeTodo: func.isRequired,
        saveEdits: func.isRequired,
        addTodo: func.isRequired,
        revertEdits: func.isRequired
    }
    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            newTodo: ''
        };
    }
    handleSubmit(e){
        e.preventDefault();
        const val = this.todo.value;
        this.props.addTodo(val);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            newTodo: nextProps.newTodo
        });
    }
    render(){
        const { newTodo } = this.state;
        const { todos, saving } = this.props;
        return (
            <div>
                <section id="todoapp">
                    <header id="header">
                        <h1>todos</h1>
                        <form id="todo-form" onSubmit={this.handleSubmit}>
                            <input
                                id="new-todo"
                                placeholder="What needs to be done?"
                                value={newTodo}
                                onChange={(e) => this.setState({newTodo: e.target.value})}
                                disabled={saving}
                                ref={ ref => this.todo = ref }
                                autoFocus
                            />
                        </form>
                    </header>
                    <TodoList todos={todos} {...this.props} />
                </section>
                <footer id="info">
                    <p>Double-click to edit a todo</p>
                    <p>Credits:
                        <a href="http://twitter.com/cburgdorf">Christoph Burgdorf</a>,
                        <a href="http://ericbidelman.com">Eric Bidelman</a>,
                        <a href="http://jacobmumm.com">Jacob Mumm</a> and
                        <a href="http://blog.igorminar.com">Igor Minar</a>
                    </p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        )
    }
}
