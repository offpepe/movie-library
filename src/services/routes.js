import React from 'react';
import { Route, Switch } from 'react-router';

import CreateMovie from '../pages/CreateMovie';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import Credits from '../pages/Credits';
import NotFound from '../pages/NotFound';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/"><Library /></Route>
            <Route exact path="/signIn"><SignIn /></Route>
            <Route exact path="/create"><CreateMovie /></Route>
            <Route exact path="/credits"><Credits /></Route>
            <Route><NotFound /></Route>
        </Switch>
    );
}