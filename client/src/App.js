import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
//import { saveState } from './localStorage';
var _ = require('lodash');

// store.subscribe(
//   _.throttle(() => {
//     console.log(store.getState());
//     saveState(store.getState());
//   }, 2000)
// );

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
