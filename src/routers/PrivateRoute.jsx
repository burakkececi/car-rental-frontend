import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};
