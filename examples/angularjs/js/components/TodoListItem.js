export default class TodoListItem extends Component {
    render(){
        return (
            <li ng-repeat="todo in $ctrl.todos | filter:$ctrl.statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo == $ctrl.editedTodo}">
                <div class="view">
                    <input class="toggle" type="checkbox" ng-model="todo.completed" ng-change="$ctrl.toggleCompleted(todo)"/>
                    <label ng-dblclick="$ctrl.editTodo(todo)">{{todo.title}}</label>
                    <button class="destroy" ng-click="$ctrl.removeTodo(todo)"></button>
                </div>
                <form ng-submit="$ctrl.saveEdits(todo, 'submit')">
                    <input class="edit" ng-trim="false" ng-model="todo.title" todo-escape="$ctrl.revertEdits(todo)" ng-blur="$ctrl.saveEdits(todo, 'blur')" todo-focus="todo == $ctrl.editedTodo" />
                </form>
            </li>
        )
    }
}