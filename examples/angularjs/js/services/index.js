angular.module('todomvc')
    .factory('todoStorage', require('./todoStorage').todoStorage)
    .factory('api', require('./todoStorage').api)
    .factory('_localStorage', require('./todoStorage')._localStorage);
