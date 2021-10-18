import React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../pages/Login';
import MovieDetails from '../pages/MovieDetails';
import CreateMovie from '../pages/CreateMovie';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import Credits from '../pages/Credits';
import NotFound from '../pages/NotFound';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/login/signIn"><SignIn /></Route>
            <Route exact path="/create"><CreateMovie /></Route>
            <Route exact path="/"><Library /></Route>
            <Route exact path="/:id"><MovieDetails /></Route>
            <Route exact path="/credits"><Credits /></Route>
            <Route><NotFound /></Route>
        </Switch>
    );
}