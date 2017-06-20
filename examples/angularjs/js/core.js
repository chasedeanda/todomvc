//List of dependency names. Add any dependency name
//that you want to make available through an import.
const deps = [
    '$http',
    '$filter'
];
//Create dependency export object
let exports = _.zipObject(deps, _.map(deps, () => {}));
//Use $injector to assign dependency to exports object
angular.module('todomvc').run(function ($injector) {
    Object.keys(exports).forEach(dep => {
        exports[dep] = $injector.get(dep);
    });
});

module.exports = exports;
