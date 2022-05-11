import { FaUserAlt } from "react-icons/fa";
import "./ProfileLogged.scss";
import { Spinner } from "../../Loading/Spinner";
import { ENDPOINT_PRODUCTS } from "../../../reducers/productsReducer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileLogged({ products, loadingUser, loadingOrders, user, orders }) {

    const [buyedProducts, setBuyedProducts] = useState([]);

    function logOut() {
        sessionStorage.removeItem("user");
    }

    useEffect(() => {
        let arrayOrders = [];
        if (!loadingOrders && products.length > 0) {
            orders.map((or, i) => {
                let orderIds = JSON.parse(or.products);
                arrayOrders[i] = products.filter(p => orderIds.filter(id => id === p.id).length > 0)
            })
            setBuyedProducts(arrayOrders);
        }
    }, [loadingOrders, orders, products]);

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
                            {
                                buyedProducts.length > 0 && buyedProducts.map((bp, i) => {
                                    bp.length > 0 && bp.map((p) => console.log(i, p))
                                })
                            }
                        </div>
                    </>
            }
        </div>
    )
}