import { Component, axios } from 'vendors';

import TodoList from './TodoList';

export default class TodoComponent extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <section id="todoapp">
                    <header id="header">
                        <h1>todos</h1>
                        <form id="todo-form" ng-submit="$ctrl.addTodo()">
                            <input id="new-todo" placeholder="What needs to be done?" ng-model="$ctrl.newTodo" ng-disabled="$ctrl.saving" autoFocus />
                        </form>
                    </header>
                    <TodoList todos={[]} />
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
