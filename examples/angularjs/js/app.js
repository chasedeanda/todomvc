angular.module('todomvc', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', { template: '<todo-component></todo-component>'})
            .when('/:status', { template: '<react-router></react-router>' });

        $locationProvider.html5Mode(true);

    });
// use require for anything that depends on the angular module being created
// require is synchronous and imports are async
require('components');
