angular.module('todomvc', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		'use strict';

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
	});

require('controllers');
require('directives');
