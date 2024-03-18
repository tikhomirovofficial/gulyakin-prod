import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/animations.css';
import './styles/tikstyles.css';
import './styles/themes/light.css';
import './styles/themes/dark.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from "./app/store";
import {BrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {addToStorage, getFromStorage} from "./utils/common/LocalStorageExplorer";
import {setMarket} from "./features/main/mainSlice";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Root = () => {
    const {markets, market} = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const marketsIsLoaded = markets?.length > 0 //Магазины загружены
        if(marketsIsLoaded) {
            const marketsFromStorage = getFromStorage('market')
            const marketIsNotDefined = market === -1
            // Если в хранилище нет магазинов или текущий магазин == -1, то устанавливаем первый существующий
            if(!marketsFromStorage || marketIsNotDefined ) {
                const firstMarket = markets[0].id
                dispatch(setMarket(firstMarket))
            }
        }
    }, [markets])

    useEffect(() => {
        addToStorage("market", market)
    }, [market])

    return (
        markets?.length > 0 && market !== -1 ? <App/> : null
    )
}
root.render(
    <BrowserRouter>
        <Provider store={store}>
           <Root/>
        </Provider>
    </BrowserRouter>

);

