/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
function todoFocus() {
	'use strict';

	return (scope, elem, attrs) => {
		scope.$watch(attrs.todoFocus, newVal => {
			if (newVal) {
				setTimeout( () => {
					elem[0].focus();
				});
			}
		});
	};
}

module.exports = todoFocus;
