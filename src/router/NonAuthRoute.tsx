import React, {FC} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";

const REDIRECT_PATH = "/profile"
const NonAuthRoute: FC<RouteProps> = ({isAuth, Component}) => {
    const navigate = useNavigate()

    return (
        isAuth ? <Navigate to={REDIRECT_PATH}/> : <Component/>
    )
};

export default NonAuthRoute;