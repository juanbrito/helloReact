import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';

ReactDOM.render((
	<BrowserRouter>
	  <Switch>
	    <Route path="/" component={App} />
	  </Switch>
	</BrowserRouter>
), document.getElementById('root'));
