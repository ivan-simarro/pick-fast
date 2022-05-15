import { useEffect, useReducer, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { TYPES, initialProductsState, productsReducer, ENDPOINT_PRODUCTS } from "../reducers/productsReducer";
import axios from 'axios';
import './App.scss';
import Header from './Header/Header';
import UpButton from './UpButton/UpButton';
import Footer from './Footer/Footer';
import Swal from 'sweetalert2';
import { putFavourites } from './appUtils';

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
        if (logged) {
            let sessionProducts = JSON.parse(sessionStorage.getItem("cart"));
            sessionProducts.map(p => {
                dispatchProducts({ type: TYPES.CART_ASSIGNMENT_AUTOMATIC, payload: { id: p.id, q: p.q } });
                return p;
            });
        }
    }, [logged]);

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
            let productToCart = { id, q };
            dispatchProducts({ type: TYPES.ADD_TO_CART, payload: productToCart });
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

    useEffect(() => {
        if (productsState.products.filter(p => p.inCart).length > 0) {
            sessionStorage.setItem("cart", JSON.stringify(productsState.products.filter(p => p.inCart).map(p => { return { id: p.id, q: p.q } })));
        }
    }, [productsState.products]);

    function handleAddDeleteFromFavourites(id, favourite) {
        if (logged) {
            let products = [];
            if (favourite) {
                products = productsState.products.filter(p => p.favourite).map(p => p.id);
                products.push(id);
            } else {
                products = productsState.products.filter(p => p.favourite && p.id !== id).map(p => p.id);
            }
            putFavourites(sessionStorage.getItem("user"), JSON.stringify(products));
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

    return (
        <div className="app">
            <Header totalProducts={totalProducts} bill={bill} />
            <Outlet context={[productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged]} />
            <UpButton />
            <Footer />
        </div>
    )
}