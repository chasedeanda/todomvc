angular.module('todomvc', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider, $locationProvider) {

		const routeConfig = {
			template: '<todo-component></todo-component>'
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});

        $locationProvider.html5Mode(true);

	});

require('components');
