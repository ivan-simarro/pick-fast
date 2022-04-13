import { useEffect, useReducer, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { TYPES, initialProductsState, productsReducer, ENDPOINT_PRODUCTS } from "../reducers/productsReducer";
import axios from 'axios';
import './App.scss';
import Header from './Header/Header';
import UpButton from './UpButton/UpButton';
import Footer from './Footer/Footer';

export default function App() {

    const [productsState, dispatchProducts] = useReducer(productsReducer, initialProductsState);
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm") || "");

    useEffect(() => {
        dispatchProducts({ type: TYPES.PRODUCTS_FETCH_INIT });
        axios.get(ENDPOINT_PRODUCTS)
            .then(res => {
                setTimeout(() => {
                    dispatchProducts({ type: TYPES.PRODUCTS_FETCH_SUCCESS, payload: res.data });
                }, 1500);
            })
            .catch(err => {
                dispatchProducts({ type: TYPES.PRODUCTS_FETCH_FAILURE })
            })
    }, []);

    useEffect(() => {
        sessionStorage.setItem("searchTerm", searchTerm);
    }, [searchTerm]);


    function handleToCart(id, q) {
        dispatchProducts({ type: TYPES.ADD_TO_CART, payload: { id, q } });
    }

    function handleDeleteFromFavourites(id, favourite) {
        dispatchProducts({ type: TYPES.ADD_DELETE_TO_FAVOURITES, payload: { id, favourite } });
    }

    return (
        <div className="app">
            <Header />
            <Outlet context={[productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites, searchTerm, setSearchTerm]} />
            <UpButton />
            <Footer />
        </div>
    )
}