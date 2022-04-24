import "./Cart.scss";
import { useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";
import { TYPES } from "../../reducers/productsReducer";
import { useEffect } from "react";


export default function Cart() {
    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill] = useOutletContext();

    function handleDeleteFromCart(id) {
        dispatchProducts({ type: TYPES.DELETE_PRODUCT_FROM_CART, payload: { id } })
    }

    if (productsState.products.filter(p => p.inCart).length === 0) {
        setBill(0);
    }

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
                        productsState.products.filter(p => p.inCart).length > 0 && <><hr /><div className="cart__total" ><p>Total: <b>{productsState.products.filter(p => p.inCart).length === 0 ? "0" : bill}€</b></p><button className="cart__total--btn">Tramitar pedido</button></div></>
                    }
                </div>
            }
        </ div>
    )
}