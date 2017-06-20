angular.module('todomvc', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider, $locationProvider) {

		const routeConfig = {
			controller: 'TodoCtrl as $ctrl',
			templateUrl: '../views/todomvc-index.html',
            // resolve: {
            //     store: function () {
            //     	// Import pure js  todoStorage service file and return it as 'store' to controller.
            //     	const todoStorage = require('./services/todoStorage');
            //     	todoStorage.get();
            //     	return todoStorage;
            //     }
            // }
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
        $locationProvider.html5Mode(true);
	});
require('controllers');
require('directives');
require('components');
