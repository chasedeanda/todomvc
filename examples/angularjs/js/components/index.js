import { react2angular } from 'react2angular';

import 'vendors';
import 'core';

import TodoComponent from 'components/TodoComponent';

angular.module('todomvc')
    .component('todoComponent', react2angular(TodoComponent));
