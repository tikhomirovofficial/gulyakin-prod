import React, {FC, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {RouteProps} from "../types/router.types";
import {getUser} from "../features/profile/profileSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {deleteCookie, getCookie} from "../utils/common/CookieUtil";
import useToken from "../hooks/useToken";
import {handleLogin} from "../features/modals/modalsSlice";
import useAuth from "../hooks/useAuth";
import {Preloader} from "../icons";
import Loader from "../components/Preloader";

const REDIRECT_PATH = "/";


const AuthRoute: FC<RouteProps> = ({Component}) => {
    const dispatch = useAppDispatch();
    const token = useToken()
    const auth = useAuth()
    const {isLoading} = useAppSelector(state => state.profile)

    useEffect(() => {
        if (token) {
            dispatch(getUser());
        }
    }, [token]);

    if (!token) {
        if (getCookie('tokens')) {
            deleteCookie("tokens")
        }
        dispatch(handleLogin())
        return <Navigate to={REDIRECT_PATH}/>;
    }


    return !isLoading && auth ? <Component/> : <Loader/>
};


export default AuthRoute;