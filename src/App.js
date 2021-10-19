import React from 'react';
import CreateMovie from './pages/CreateMovie';
import Login from './pages/Login';
import Library from './pages/Library';
import MovieDetails from './pages/MovieDetails';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import Credits from './pages/Credits';
import { Route, Switch } from 'react-router';

export default function App() {
  return (
    <Switch>
      <Route exact path="/"><Library /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/signIn"><SignIn /></Route>
      <Route exact path="/create"><CreateMovie /></Route>
      <Route exact path="/:id"><MovieDetails /></Route>
      <Route path="*" exact ><NotFound/></Route>
    </Switch>
  );
}

