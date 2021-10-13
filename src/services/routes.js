import React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../pages/Login';
import MovieDetails from '../pages/MovieDetails';
import CreateMovie from '../pages/CreateMovie';
import Library from '../pages/Library';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/movies"><Library /></Route>
            <Route exact path="/movies/:id"><MovieDetails /></Route>
            <Route path="/movies/create"><CreateMovie /></Route>
        </Switch>
    );
}

