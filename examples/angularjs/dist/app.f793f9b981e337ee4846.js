webpackJsonp([ 0 ], {
19: function(module, exports) {
angular.module("todomvc", [ "ngRoute", "ngResource" ]).config([ "$routeProvider", function($routeProvider) {
"use strict";
const routeConfig = {
controller: "TodoCtrl",
templateUrl: "todomvc-index.html",
resolve: {
store: function(todoStorage) {
return todoStorage.then(function(module) {
return module.get(), module;
});
}
}
};
$routeProvider.when("/", routeConfig).when("/:status", routeConfig).otherwise({
redirectTo: "/"
});
} ]);
},
43: function(module, exports, __webpack_require__) {
module.exports = __webpack_require__(19);
}
}, [ 43 ]);