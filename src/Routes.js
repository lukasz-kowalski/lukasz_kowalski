import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/NavBar';
import ListView from './components/ListView/ListView';
import AddCharacter from './components/AddCharacter/AddCharacter';

const Routes = () => (
    <BrowserRouter>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path='/' component={ListView} exact />
          <Route path='/characters/:page' component={ListView} />
          <Route path='/add-character' component={AddCharacter} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
);

export default Routes;
