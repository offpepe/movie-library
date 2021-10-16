import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Login from '../pages/Login';
import MovieDetails from '../pages/MovieDetails';
import CreateMovie from '../pages/CreateMovie';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/"><Redirect to="/movies" /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/login/signIn"><SignIn /></Route>
            <Route exact path="/movies/create"><CreateMovie /></Route>
            <Route exact path="/movies"><Library /></Route>
            <Route path="/movies/:id"><MovieDetails /></Route>
            <Route><NotFound /></Route>
        </Switch>
    );
}