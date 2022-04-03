import "./Cart.scss";
import { useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";
import { TYPES } from "../../reducers/productsReducer";
import { useEffect, useState } from "react";


export default function Cart() {
    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites] = useOutletContext();
    const [bill, setBill] = useState(0);

    function handleDeleteFromCart(id) {
        dispatchProducts({ type: TYPES.DELETE_PRODUCT_FROM_CART, payload: { id } })
    }

    useEffect(() => {
        if (productsState.products.filter(p => p.inCart).length !== 0) {
            const total = productsState.products.filter(p => p.inCart).map(p => p.q * p.price).reduce((previousValue, currentValue) => previousValue + currentValue).toFixed(2);
            setBill(total);
        }
    });


    return (
        <div className="cart">
            <ul className="cart__ul">
                {
                    productsState.products.filter(p => p.inCart).length === 0 ? <div className="products__none">
                        <p>Todavía no tienes productos en el carrito...</p>
                    </div> : productsState.products.filter(p => p.inCart).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromCart={handleDeleteFromCart} />)
                }
            </ul>
            {
                <div className="cart__bill">

                    {
                        productsState.products.filter(p => p.inCart).length > 0 && <><hr /><ul>{productsState.products.filter(p => p.inCart).map(p => {
                            return <li key={p.id} className="cart__bill--li">
                                <p>{p.name} x {p.q}: {(p.q * p.price).toFixed(2)}€</p>
                            </li>
                        })
                        }</ul><h1>Total: {productsState.products.filter(p => p.inCart).length === 0 ? "0" : bill}€</h1></>
                    }
                </div>
            }
        </ div>
    )
}