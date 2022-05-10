import { useEffect, useReducer, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { TYPES, initialProductsState, productsReducer, ENDPOINT_PRODUCTS } from "../reducers/productsReducer";
import axios from 'axios';
import './App.scss';
import Header from './Header/Header';
import UpButton from './UpButton/UpButton';
import Footer from './Footer/Footer';
import Swal from 'sweetalert2';

export default function App() {

    const [productsState, dispatchProducts] = useReducer(productsReducer, initialProductsState);
    const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm") || "");
    const [totalProducts, setTotalProducts] = useState(0);
    const [bill, setBill] = useState(0);
    const [isReverse, setIsReverse] = useState(false);
    const [selected, setSelected] = useState('');
    const [logged, setLogged] = useState(false);

    let navigate = useNavigate();

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
        if (logged) {
            dispatchProducts({ type: TYPES.ADD_TO_CART, payload: { id, q } });
        } else {
            navigate("/profile");
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Registrate o inicia sesión antes de añadir este producto',
                showConfirmButton: false,
                timer: 2500
            })
        }
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
        if (logged) {
            dispatchProducts({ type: TYPES.ADD_DELETE_TO_FAVOURITES, payload: { id, favourite } });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Registrate o inicia sesión antes de añadir este producto',
                showConfirmButton: false,
                timer: 2500
            })
            setTimeout(() => {
                navigate("/profile");
            }, 2490);
        }
    }

    // useEffect(() => {
    //     window.onbeforeunload = function (e) {
    //         return "Perderás los productos de tu carrito";
    //     };
    // }, []);

    return (
        <div className="app">
            <Header totalProducts={totalProducts} bill={bill} />
            <Outlet context={[productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged]} />
            <UpButton />
            <Footer />
        </div>
    )
}