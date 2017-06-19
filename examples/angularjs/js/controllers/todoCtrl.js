const todoStorage = require('services/todoStorage');

class TodoCtrl {
	constructor($scope, $routeParams, $filter){

		// Assign all $scope variables to this
		this.todos = $scope.todos = todoStorage.todos;
		this.newTodo = '';
		this.originalTodo = null;
		this.editedTodo = null;
		this.remainingCount = null;
		this.completedCount = null;
		this.allChecked = false;
		this.statusFilter = null;
		this.status = '';
		this.saving = false;
		this.saveEvent = null;
		this.reverted = null;

		// Assign scope to this.scope. For forcing digest cycle in functions.
		this.scope = $scope;

		// Bind all class functions to this
		this.addTodo = this.addTodo.bind(this);
		this.editedTodo = this.editTodo.bind(this);
		this.saveEdits = this.saveEdits.bind(this);
		this.revertEdits = this.revertEdits.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.toggleCompleted = this.toggleCompleted.bind(this);
		this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
		this.markAll = this.markAll.bind(this);

		// Fetch todos
		todoStorage.get();

		// Attach any $scope listeners
        $scope.$watch('todos', () => {
            this.remainingCount = $filter('filter')(this.todos, { completed: false }).length;
            this.completedCount = this.todos.length - this.remainingCount;
            this.allChecked = !this.remainingCount;
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$routeChangeSuccess', () => {
            const status = this.status = $routeParams.status || '';
            this.statusFilter = (status === 'active') ?
                { completed: false } : (status === 'completed') ?
                    { completed: true } : {};
        });

	}

	addTodo () {
		const newTodo = {
			title: this.newTodo.trim(),
			completed: false
		};

		if (!newTodo.title) {
			return;
		}

		this.saving = true;
		todoStorage.insert(newTodo)
			.then(() => this.newTodo = '')
			.then(() => this.saving = false)
			.then(() => this.scope.$apply());
	}

	editTodo(todo) {
		this.editedTodo = todo;
		// Clone the original todo to restore it on demand.
        this.originalTodo = angular.extend({}, todo);
	}

	saveEdits(todo, event) {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === 'blur' && this.saveEvent === 'submit') {
            this.saveEvent = null;
			return;
		}

        this.saveEvent = event;

		if (this.reverted) {
			// Todo edits were reverted-- don't save.
            this.reverted = null;
			return;
		}

		todo.title = todo.title.trim();

		if (todo.title === this.originalTodo.title) {
            this.editedTodo = null;
			return;
		}

        todoStorage[todo.title ? 'put' : 'delete'](todo)
			.then(() => {}, () => {
				todo.title = this.originalTodo.title;
			})
			.then(() => {
                this.editedTodo = null;
			});
	}

	revertEdits(todo) {
        this.todos[this.todos.indexOf(todo)] = this.originalTodo;
        this.editedTodo = null;
        this.originalTodo = null;
        this.reverted = true;
	}

	removeTodo(todo) {
		todoStorage.delete(todo);
	}

	saveTodo(todo) {
		todoStorage.put(todo);
	}

	toggleCompleted(todo, completed) {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		todoStorage.put(todo, this.todos.indexOf(todo))
			.then(() => {}, () => {
				todo.completed = !todo.completed;
			});
	}

	clearCompletedTodos() {
		todoStorage.clearCompleted();
	}

	markAll(completed) {
		this.todos.forEach( todo => {
			if (todo.completed !== completed) {
				this.toggleCompleted(todo, completed);
			}
		});
	}
}

module.exports = TodoCtrl;
