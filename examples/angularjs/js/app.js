import ReactRouter from './components/Router';

angular.module('todomvc', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider, $locationProvider) {

		const routeConfig = {
			controller: 'TodoCtrl as $ctrl',
			templateUrl: '../views/todomvc-index.html'
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', { template: ReactRouter })
			.otherwise({
				redirectTo: '/'
			});

        $locationProvider.html5Mode(true);

	});

require('controllers');
require('components');
