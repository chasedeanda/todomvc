import { ReactDOM, React } from 'vendors';

import TodoComponent from 'components/TodoComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class ReactRouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={TodoComponent}/>
                    <Route path="/:status" component={TodoComponent}/>
                </div>
            </Router>
        )
    }
}
