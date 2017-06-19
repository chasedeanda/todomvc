const axios = require('axios');
/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */

/* UPDATE PHASE 2 */
/**
 * Remove api factory since it will never be used. Return localstorage instead.
 */

const todoStorage = (function () {

	'use strict';

	var STORAGE_ID = 'todos-angularjs';

	var store = {
		todos: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		},

		clearCompleted: function () {
			return new Promise( (resolve, reject) => {
                const incompleteTodos = store.todos.filter( todo => !todo.completed );

                angular.copy(incompleteTodos, store.todos);

                store._saveToLocalStorage(store.todos);
                resolve(store.todos);
			});
		},

		delete: function (todo) {
			return new Promise( (resolve, reject) => {
                store.todos.splice(store.todos.indexOf(todo), 1);

                store._saveToLocalStorage(store.todos);
                resolve(store.todos);
			});
		},

		get: function () {
			return new Promise( (resolve, reject) => {
                angular.copy(store._getFromLocalStorage(), store.todos);
                resolve(store.todos);
			});
		},

		insert: function (todo) {
			return new Promise( (resolve, reject) => {
                store.todos.push(todo);

                store._saveToLocalStorage(store.todos);
                resolve(store.todos);
			});
		},

		put: function (todo, index) {
			return new Promise( (resolve, reject) => {
                store.todos[index] = todo;

                store._saveToLocalStorage(store.todos);
                resolve(store.todos);
			});
		}
	};

	return store;
})();

module.exports = todoStorage;
