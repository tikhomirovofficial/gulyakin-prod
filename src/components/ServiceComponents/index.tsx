import React, { useEffect } from 'react';
import {Navigate, useLocation} from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    const pathnamesNotScroll: string[] = [];

    useEffect(() => {
        if (!pathnamesNotScroll.includes(pathname)) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);
    return null;
};

export const BaseRedirect = () => {
    const firstMarketId = 1
    return (
        <Navigate to={"/market/" + firstMarketId}/>
    )
}
