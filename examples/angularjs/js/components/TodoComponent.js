import { PropTypes, Component, axios, autoBind } from 'vendors';
import { $routeParams } from 'core';

import todoStorage from '../services/todoStorage';

import TodoList from './TodoList';

export default class TodoComponent extends Component {
    constructor(props){
        super(props);
        autoBind(this);

        // Components needs to handle getting params from ngRoute and react-router
        const params = _.get(props.match, 'params') || $routeParams.params || {};

        this.state = {
            newTodo: '',
            todos: [],
            originalTodo: null,
            editedTodo: null,
            remainingCount: null,
            completedCount: null,
            allChecked: false,
            statusFilter: params.status ? { completed: params.status === 'completed' } : {},
            status: params.status || '',
            saving: false,
            saveEvent: null,
            reverted: null
        };
    }
    componentDidMount(){
        this.fetchTodos();
    }
    componentWillReceiveProps(nextProps) {
        // Handle React Router params
        const params = nextProps.match.params;
        if (params) {
            this.setState({
                statusFilter: nextProps.match.params.status ? {completed: nextProps.match.params.status === 'completed'} : {},
                status: nextProps.match.params.status || '',
            });
            this.fetchTodos();
        }
    }
    fetchTodos(){
        // Fetch todos
        todoStorage.get()
            .then( data => {
                const remainingCount = data.filter( todo => !todo.completed ).length;
                this.setState({
                    todos: data,
                    remainingCount: remainingCount,
                    completedCount: data.length - remainingCount,
                    allChecked: !remainingCount
                });
            });
    }
    addTodo (e) {
        e.preventDefault();
        const newTodo = {
            title: this.state.newTodo.trim(),
            completed: false
        };
        if (!newTodo.title) {
            return;
        }
        this.setState({
            saving: true
        });
        todoStorage.insert(newTodo)
            .then(() => {
                this.setState({
                    newTodo: '',
                    saving: false
                });
            });
    }
    editTodo(todo) {
        this.setState({
            editedTodo: todo,
            originalTodo: {...todo} // Clone the original todo to restore it on demand.
        });
    }
    saveEdits(todo, event) {
        const { saveEvent, reverted, originalTodo } = this.state;
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && saveEvent === 'submit') {
            this.setState({
                saveEvent: null
            });
            return;
        }

        this.setState({
            saveEvent: event
        });

        if (reverted) {
            // Todo edits were reverted-- don't save.
            this.setState({
                reverted: null
            });
            return;
        }

        todo.title = todo.title.trim();

        if (todo.title === originalTodo.title) {
            this.setState({
                editedTodo: null
            });
            return;
        }

        todoStorage[todo.title ? 'put' : 'delete'](todo)
            .then(() => {
                this.setState({
                    editedTodo: null
                });
                this.fetchTodos();
            }, () => todo.title = originalTodo.title)
    }
    revertEdits(todo) {
        const { todos, originalTodo } = this.state;
        todos[todos.indexOf(todo)] = originalTodo;
        this.setState({
            editedTodo: null,
            originalTodo: null,
            reverted: true
        });
    }
    removeTodo(todo) {
        todoStorage.delete(todo).
            then(this.fetchTodos());
    }
    saveTodo(todo) {
        todoStorage.put(todo)
            .then(this.fetchTodos());
    }
    toggleCompleted(todo, completed) {
        const { todos } = this.state;
        if (completed != null) {
            todo.completed = completed;
        }
        todoStorage.put(todo, todos.indexOf(todo))
            .then( this.fetchTodos(), () => todo.completed = !todo.completed)
    }
    clearCompletedTodos() {
        todoStorage.clearCompleted()
            .then(this.fetchTodos());

    }
    markAll(completed) {
        const { todos } = this.state;
        console.log(completed)
        todos.forEach( todo => {
            if (todo.completed !== completed) {
                this.toggleCompleted(todo, completed);
            }
        });
        this.setState({
            todos: todos,
            allChecked: completed
        });
    }
    render(){
        const { newTodo, todos, saving } = this.state;
        return (
            <div>
                <section id="todoapp">
                    <header id="header">
                        <h1>todos</h1>
                        <form id="todo-form" onSubmit={this.addTodo}>
                            <input
                                id="new-todo"
                                placeholder="What needs to be done?"
                                value={newTodo}
                                onChange={(e) => this.setState({newTodo: e.target.value})}
                                disabled={saving}
                                autoFocus
                            />
                        </form>
                    </header>
                    <TodoList
                        todos={todos}
                        markAll={this.markAll}
                        clearCompletedTodos={this.clearCompletedTodos}
                        toggleCompleted={this.toggleCompleted}
                        editTodo={this.editTodo}
                        removeTodo={this.removeTodo}
                        saveEdits={this.saveEdits}
                        addTodo={this.addTodo}
                        revertEdits={this.revertEdits}
                        {...this.state}
                    />
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
