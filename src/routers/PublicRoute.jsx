import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !isAuthenticated ? (
                        <Component />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/home',
                                state: { from: location }
                            }}
                        />
                    ))
            }
        />
    );
}