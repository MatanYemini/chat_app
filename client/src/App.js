import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { loadUser } from './actions/auth';

//Alerts
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// -----------------------------------------
// Storage
//import { saveState } from './localStorage';
//var _ = require('lodash');

// store.subscribe(
//   _.throttle(() => {
//     console.log(store.getState());
//     saveState(store.getState());
//   }, 2000)
// );
// ----------------------------------------

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
