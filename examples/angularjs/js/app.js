import { ReactDOM, React } from 'vendors';

import TodoComponent from 'components/TodoComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const ReactRouter =  (
	<Router>
		<div>
			<Route exact path="/" component={TodoComponent} />
			<Route path="/:status" component={TodoComponent} />
		</div>
	</Router>
);

ReactDOM.render(ReactRouter, document.querySelector('#root'));
