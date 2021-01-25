import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import reducer from './reducers';
import { composeWithDevTools } from  'redux-devtools-extension';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
    Link
  } from "react-router-dom";
import App from './containers/App';
import Analysis from './containers/Analysis';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);  

render(
    <Provider store={store}>
    <HashRouter>
        <Route exact path="/" component={App} />
        <Route path="/analysis" component={Analysis} /> 
    </HashRouter>
    </Provider>,
    document.getElementById('root')   
);

if (module.hot) {
    module.hot.accept();
}


// import React from 'react';
// import { render } from 'react-dom';
// import App from './containers/app';

// const rootEl = document.getElementById('root');


// render(<App />, rootEl);

// if (module.hot) {
//     module.hot.accept();
// }