import { react2angular } from 'react2angular';

import 'vendors';

import TodoComponent from 'components/TodoComponent';
import ReactRouter from 'components/Router';

angular.module('todomvc')
    .component('todoComponent', react2angular(TodoComponent))
    .component('reactRouter', react2angular(ReactRouter));
