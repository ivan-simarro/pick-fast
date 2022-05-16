import { FaUserAlt } from "react-icons/fa";
import "./ProfileLogged.scss";
import { Spinner } from "../../Loading/Spinner";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import bye from "../../../assets/bye.png";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../../../reducers/productsReducer";

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn-alert btn-success',
        cancelButton: 'btn-alert btn-danger'
    },
    buttonsStyling: false
})

export default function ProfileLogged({ products, loadingUser, loadingOrders, user, orders, setLogged, handleToCart, dispatchProducts }) {

    const [buyedProducts, setBuyedProducts] = useState([]);
    const [quantities, setQuantities] = useState([]);

    function logOut() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("cart");
        setLogged(false);
        Swal.fire({
            position: 'center',
            title: '¡Hasta pronto ' + user.name + '!',
            showConfirmButton: false,
            imageUrl: bye,
            imageWidth: 236,
            imageHeight: 264,
            timer: 2000
        })
    }

    useEffect(() => {
        let arrayOrders = [];
        let newQuantities = [];
        if (!loadingOrders && products.length > 0) {
            orders.map((or, i) => {
                let orderIds = JSON.parse(or.products).map(p => p.id);
                newQuantities.push(JSON.parse(or.products).map(p => p.q));
                arrayOrders[i] = products.filter(p => orderIds.filter(id => id === p.id).length > 0);
                return or;
            })
            setQuantities(newQuantities);
            setBuyedProducts(arrayOrders);
        }
    }, [loadingOrders, orders, products]);

    function handleProductDetails(p) {
        Swal.fire({
            title: p.name + " " + p.quantity,
            text: p.description,
            imageUrl: p.image,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: p.name,
        })
    }
    let navigate = useNavigate();

    function handleRepeat(order, index) {
        swalWithBootstrapButtons.fire({
            title: '¿Quieres repetir el pedido?',
            text: "Perderá todos los artículos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Repetir',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchProducts({ type: TYPES.DELETE_CART });
                let q = quantities[index];
                dispatchProducts({ type: TYPES.DELETE_CART });
                for (let i in order) {
                    handleToCart(order[i].id, q[i]);
                }
                navigate("/cart");
            }
        })
    }

    return (
        <div className="profileLogged">
            {
                loadingUser || loadingOrders ?
                    <Spinner style={{ fontSize: "5rem", color: "black", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto", marginTop: "9rem" }} />
                    :
                    <>
                        <div className="profileLogged__left">
                            <FaUserAlt className="profileLogged__left--icon" />
                            <div className="profileLogged__left--user">
                                {user.user}
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Nombre">Nombre </label>
                                <input type="text" id="profileLogged-Nombre" value={user.name} readOnly />
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Apellido">Apellido </label>
                                <input type="text" id="profileLogged-Apellido" value={user.lastName} readOnly />
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Pedidos">Pedidos realizados </label>
                                <input type="text" id="profileLogged-Pedidos" value={orders.length} readOnly />
                            </div>
                            <div className="profileLogged__left--btn">
                                <button onClick={logOut}>Log Out</button>
                            </div>
                        </div>
                        <div className="profileLogged__right">
                            <div className="profileLogged__right--title">
                                <h1>Pedidos anteriores</h1>
                            </div>
                            <div className="profileLogged__right--orders">
                                {
                                    buyedProducts.length > 0 && buyedProducts.map((bp, i) => {
                                        return bp.length > 0
                                            && <React.Fragment key={i}><p className="profileLogged__right--orders-info"><span>{orders[i].date.replaceAll('-', '/')}</span><span style={{ cursor: "pointer" }} onClick={() => handleRepeat(bp, i)}>Repetir pedido</span><span>Total: {orders[i].bill} €</span></p><ul key={i}>
                                                {bp.map((p, j) => {
                                                    return <li className="profileLogged__right--orders-product" onClick={() => handleProductDetails(p)} key={p.id}><img className="profileLogged__right--img" src={p.image} alt="" /><p>x {quantities[i][j]}</p></li>
                                                })}
                                            </ul></React.Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}