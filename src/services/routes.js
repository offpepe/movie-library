import React from 'react';
import { Route, Switch } from 'react-router';
import Library from '../pages/Library';
import CreateMovie from '../pages/CreateMovie';

import Login from '../pages/Login';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/movies"><Library /></Route>
            <Route path="/movies/create"><CreateMovie /></Route>
        </Switch>
    );
}

