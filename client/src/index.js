import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';

// Ascyn Await get or post requests
import 'regenerator-runtime/runtime'

// Bootstrap-css and local index.css
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENTS
import App from './components/App';
import Login from './components/Login';
import SignIn from './components/SignIn';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';
import Home from './components/Home';
import updateName from './components/updateName';
import updatePassword from './components/updatePassword';

render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/Login' component={Login} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/AddTask' component={AddTask} />
            <Route path='/ViewTask' component={ViewTask} />
            <Route path='/home' component={Home} />
            <Route path='/updateName' component={updateName} />
            <Route path='/updatePassword' component={updatePassword} />
        </Switch>
    </Router>,
    document.getElementById('root')
);