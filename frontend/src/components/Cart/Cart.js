import "./Cart.scss";
import { Link, useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";
import { TYPES } from "../../reducers/productsReducer";
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn-alert btn-success',
        cancelButton: 'btn-alert btn-danger'
    },
    buttonsStyling: false
})

export default function Cart() {
    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill] = useOutletContext();

    function handleDeleteFromCart(id) {
        swalWithBootstrapButtons.fire({
            title: '¿Quieres eliminarlo del carrito?',
            text: "El precio será descontado del total",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchProducts({ type: TYPES.DELETE_PRODUCT_FROM_CART, payload: { id } });
                swalWithBootstrapButtons.fire(
                    '¡Eliminado!',
                    'Borrado correctamente',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    '¡Sigue siendo todo tuyo!',
                    'error'
                )
            }
        })
    }

    function handleDeleteCart() {
        swalWithBootstrapButtons.fire({
            title: '¿Quieres vaciar el carrito?',
            text: "Perderá todos los artículos seleccionados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchProducts({ type: TYPES.DELETE_CART });
                swalWithBootstrapButtons.fire(
                    '¡Vaciado!',
                    'Se han eliminado todos los productos de su carrito',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    '¡Sigue siendo todo tuyo!',
                    'error'
                )
            }
        })
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
                        productsState.products.filter(p => p.inCart).length > 0 && <><hr />
                            <div className="cart__total" >
                                <button className="cart__total--btn empty" onClick={handleDeleteCart}>Vaciar carrito</button>
                                <p>Total: <b>{productsState.products.filter(p => p.inCart).length === 0 ? "0" : bill}€</b></p>
                                <Link to="/payment">
                                    <button className="cart__total--btn">Tramitar pedido</button>
                                </Link>
                            </div></>
                    }
                </div>
            }
        </ div>
    )
}