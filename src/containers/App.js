import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import reducer from '../reducers';
import { composeWithDevTools } from  'redux-devtools-extension';
import {
    Route,
    HashRouter,  
  } from "react-router-dom";
import Home from './Home';
import Analysis from './Analysis';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);  

if (module.hot) {
	module.hot.accept();
}

const App = () => (	
	<Provider store={store}>
    <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/analysis" component={Analysis} />
    </HashRouter>
	</Provider>
)

export default App;