import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

import reducers from './reducers';

import Components from 'containers/Components';
import Foundations from 'containers/Foundations';
import WhatsNew from 'containers/WhatsNew';
import GettingStarted from 'containers/GettingStarted';
import Templates from 'containers/Templates';

import './less/base.less';

const store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

ReactDOM.render(
 <Provider store={store}>
   <Router history={browserHistory}>
     <Route path="/components" component={Components} />
     <Redirect from="/" to="components" />
   </Router>
 </Provider>,
 document.getElementById('styleguide')
);
