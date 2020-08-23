import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ReactVirtualizedTable from './pages/editorDashboard';
import UserDashboard from './pages/userDasboard';
import LoginPage from './pages/login';
import AdminDasboard from './pages/adminDashboard';
import UserDetailsPage from './pages/userDetails';

import './App.css';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <AuthRoute path='/users' component={UserDashboard} />
          <AuthRoute path='/user/:userId' component={UserDetailsPage} />
          <AuthRoute path='/admin' component={AdminDasboard} />
          <AuthRoute path='/hanan' component={ReactVirtualizedTable} />
          {/* <AuthRoute exact path='/user/:id' component={UserDashboard} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
