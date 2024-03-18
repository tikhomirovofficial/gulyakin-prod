import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import PublicRoute from "./PublicRoute";
import AuthRoute from "./AuthRoute";
import NonAuthRoute from "./NonAuthRoute";

const AppRoutes = ({isAuth = false}) => {
    return (
        <Routes>
            {
                routes.auth.map(({path, Component}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<AuthRoute isAuth={isAuth} Component={Component}/>}
                    />
                ))
            }
            {
                routes.non_auth.map(({path, Component}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<NonAuthRoute isAuth={isAuth} Component={Component}/>}
                    />
                ))
            }
            {
                routes.public.map(({path, Component}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<PublicRoute isAuth={isAuth} Component={Component}/>}
                    />
                ))
            }

        </Routes>
    );
};

export default AppRoutes;