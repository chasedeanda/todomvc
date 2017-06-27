import { ReactDOM, React } from 'vendors';

import TodoComponent from 'components/TodoComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const ReactRouter = (
    <Router>
        <Route path="/:status" component={TodoComponent} />
    </Router>
);

ReactDOM.render(ReactRouter, document.querySelector('#root'));

module.exports = ReactRouter;
