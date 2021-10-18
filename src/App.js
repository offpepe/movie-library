import React from 'react';
import CreateMovie from './pages/CreateMovie';
import Library from './pages/Library';
import SignIn from './pages/SignIn';
import Credits from './pages/Credits';
import { Route, Switch } from 'react-router';

export default function App() {
  return (
    <Switch>
      <Route exact path="/"><Library /></Route>
      <Route exact path="/signIn"><SignIn /></Route>
      <Route exact path="/create"><CreateMovie /></Route>
      <Route exact path="/credits"><Credits /></Route>
    </Switch>
  );
}

