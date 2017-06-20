import { PropTypes, autoBind, Component } from 'vendors';

import TodoListItem from './TodoListItem';

export default class TodoList extends Component {
    constructor(){
        super();
        autoBind(this);
    }
    render(){
        return (
            <div>
                <section id="main" ng-show="$ctrl.todos.length" ng-cloak>
                    <input id="toggle-all" type="checkbox" ng-model="$ctrl.allChecked" ng-click="$ctrl.markAll($ctrl.allChecked)" />
                    <label for="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">

                    </ul>
                </section>
                <footer id="footer" ng-show="$ctrl.todos.length" ng-cloak>
                    <span id="todo-count"><strong>{{$ctrl.remainingCount}}</strong>
                        <ng-pluralize count="$ctrl.remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
                    </span>
                    <ul id="filters">
                        <li>
                            <a ng-class="{selected: $ctrl.status == ''} " href="#/">All</a>
                        </li>
                        <li>
                            <a ng-class="{selected: $ctrl.status == 'active'}" href="#/active">Active</a>
                        </li>
                        <li>
                            <a ng-class="{selected: $ctrl.status == 'completed'}" href="#/completed">Completed</a>
                        </li>
                    </ul>
                    <button id="clear-completed" ng-click="$ctrl.clearCompletedTodos()" ng-show="$ctrl.completedCount">Clear completed</button>
                </footer>
            </div>
        )
    }
}