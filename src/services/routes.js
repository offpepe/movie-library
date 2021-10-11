import React from 'react';
import { Route, Switch } from 'react-router';
import Library from '../pages/Library';

import Login from '../pages/Login';

export default function Routes () {
    return (
        <Switch>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/movies"><Library /></Route>
        </Switch>
    );
}

