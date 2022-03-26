import { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom';
import { TYPES, initialProductsState, productsReducer, ENDPOINT_PRODUCTS } from "../reducers/productsReducer";
import Navbar from './Navbar/Navbar';
import axios from 'axios';
import './App.scss';

export default function App() {

    const [productsState, dispatchProducts] = useReducer(productsReducer, initialProductsState);

    useEffect(() => {
        dispatchProducts({ type: TYPES.PRODUCTS_FETCH_INIT });
        axios.get(ENDPOINT_PRODUCTS)
            .then(res => {
                setTimeout(() => {
                    dispatchProducts({ type: TYPES.PRODUCTS_FETCH_SUCCESS, payload: res.data });
                }, 1000);
            })
            .catch(err => {
                dispatchProducts({ type: TYPES.PRODUCTS_FETCH_FAILURE })
            })
    }, [])


    function handleToCart(id, q) {
        dispatchProducts({ type: TYPES.ADD_TO_CART, payload: { id, q } });
    }

    function handleDeleteFromFavourites(id, favourite) {
        dispatchProducts({ type: TYPES.ADD_DELETE_TO_FAVOURITES, payload: { id, favourite } });
    }

    return (
        <div className="app">
            <Navbar />
            <Outlet context={[productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites]} />
        </div>
    )
}