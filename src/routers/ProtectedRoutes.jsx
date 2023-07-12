import routes from './routes';
import Loader from '../components/Loader';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

export default function ProtectedRoutes() {
    return (
        <Switch>
            <Suspense
                fallback={<Loader />}
            >
                {routes.map(({ component: Component, path, exact }) => (
                    <Route
                        path={`/${path}`}
                        key={path}
                        exact={exact}
                    >
                        <Component />
                    </Route>
                ))}
            </Suspense>
        </Switch>
    );
}