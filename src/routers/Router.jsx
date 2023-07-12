import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Loader from "../components/Loader";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import UserSessionHelper from "../helpers/UserSessionHelper";

// lazy loading components for better performance
const Login = lazy(() => import("../pages/LoginPage/LoginPage"));
const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Register = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const NotFound = lazy(() => import("../components/NotFound"));


const publicRoutes = [
    {
        path: "login",
        component: Login,
        exact: false
    },
    {
        path: "register",
        component: Register,
        exact: false
    },
]

const privateRoutes = [
    {
        path: "home",
        component: Home,
        exact: false
    },
]
export default function Router() {
    const isAuthenticated = UserSessionHelper.isAuthenticated;
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    {
                        publicRoutes.map(({ component: Component, path, exact }) => (
                            <PublicRoute
                                path={`/${path}`}
                                key={path}
                                exact={exact}
                                component={Component}
                                isAuthenticated={isAuthenticated}
                            />
                        ))
                    }
                    {
                        privateRoutes.map(({ component: Component, path, exact }) => (
                            <PrivateRoute
                                path={`/${path}`}
                                key={path}
                                exact={exact}
                                component={Component}
                                isAuthenticated={isAuthenticated}
                            />
                        ))
                    }
                    <Route path="*" component={NotFound} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}
