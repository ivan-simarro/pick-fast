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
    const [totalProducts, setTotalProducts] = useState(0);
    const [bill, setBill] = useState(0);
    const [isReverse, setIsReverse] = useState(false);
    const [selected, setSelected] = useState('');

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


    useEffect(() => {
        if (productsState.products.filter(p => p.inCart).length !== 0) {
            const total = productsState.products.filter(p => p.inCart).map(p => p.q * p.price).reduce((previousValue, currentValue) => previousValue + currentValue).toFixed(2);
            setBill(total);
        }
    }, [productsState.products]);

    function handleToCart(id, q) {
        dispatchProducts({ type: TYPES.ADD_TO_CART, payload: { id, q } });
    }

    useEffect(() => {
        let total = 0;
        // eslint-disable-next-line
        productsState.products.map(p => {
            if (p.inCart) {
                total += p.q;
            }
        })
        setTotalProducts(total);
    }, [bill, productsState.products]);

    function handleAddDeleteFromFavourites(id, favourite) {
        dispatchProducts({ type: TYPES.ADD_DELETE_TO_FAVOURITES, payload: { id, favourite } });
    }

    // useEffect(() => {
    //     window.onbeforeunload = function (e) {
    //         return "Perderás los productos de tu carrito";
    //     };
    // }, []);

    return (
        <div className="app">
            <Header totalProducts={totalProducts} bill={bill} />
            <Outlet context={[productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected]} />
            <UpButton />
            <Footer />
        </div>
    )
}