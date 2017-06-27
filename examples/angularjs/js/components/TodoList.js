import { PropTypes, autoBind, Component, pluralize, classNames, Link } from 'vendors';

import TodoListItem from './TodoListItem';

const { array, func, number, string, object, bool } = PropTypes;

export default class TodoList extends Component {
    static propTypes = {
        todos: array,
        remainingCount: number,
        completedCount: number,
        status: string,
        statusFilter: object,
        editedTodo: object,
        allChecked: bool,
        markAll: func.isRequired,
        clearCompletedTodos: func.isRequired,
        toggleCompleted: func.isRequired,
        editTodo: func.isRequired,
        removeTodo: func.isRequired,
        saveEdits: func.isRequired
    }
    constructor(){
        super();
        autoBind(this);
    }
    renderListItems(){
        const statusFilter = this.props.statusFilter || {};
        return this.props.todos.filter( todo => Object.keys(statusFilter).length === 0 || todo.completed === statusFilter.completed )
            .map( todo => {
               return <TodoListItem
                        key={todo.title}
                        todo={todo}
                        {...this.props}
                      />
            });
    }
    render(){
        const listItems = this.renderListItems();
        const { todos, remainingCount, completedCount, status, allChecked, markAll, clearCompletedTodos } = this.props;
        // Only return content if there are todos
        if(todos.length === 0){
            return null
        }
        return (
            <div>
                <section id="main">
                    <input id="toggle-all" type="checkbox" checked={allChecked} onChange={() => markAll(!allChecked)}/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        {listItems}
                    </ul>
                </section>
                <footer id="footer">
                    <span id="todo-count">
                        <strong>{remainingCount}</strong>
                        <span>{` ${pluralize('item', remainingCount)} left`}</span>
                    </span>
                    <ul id="filters">
                        <li>
                            <Link className={classNames({ 'selected': !status })} to="/">All</Link>
                        </li>
                        <li>
                            <Link className={classNames({ 'selected': status === 'active' })} to="/active">Active</Link>
                        </li>
                        <li>
                            <Link className={classNames({ 'selected': status === 'completed' })} to="/completed">Completed</Link>
                        </li>
                    </ul>
                    {completedCount > 0 && <button id="clear-completed" onClick={clearCompletedTodos}>Clear completed</button>}
                </footer>
            </div>
        )
    }
}
