import React from 'react';
import { Route, Switch } from 'react-router';

import CreateMovie from '../pages/CreateMovie';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import Credits from '../pages/Credits';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/movies"><Library /></Route>
            <Route exact path="/signIn"><SignIn /></Route>
            <Route exact path="/movies/create"><CreateMovie /></Route>
            <Route exact path="/credits"><Credits /></Route>
        </Switch>
    );
}