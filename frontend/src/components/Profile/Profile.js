import { useOutletContext } from "react-router-dom";
import Form from "./Form/Form";
import "./Profile.scss";
import ProfileLogged from "./ProfileLogged/ProfileLogged";
import { useState, useEffect } from "react";
import { getOrdersByUser, getUserByUser } from "./profileUtils";


export default function Profile() {

    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged] = useOutletContext();
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (Object.keys(user).length === 0 && logged) {

            let userStorage = sessionStorage.getItem("user");
            getUserByUser(userStorage).then(us => {
                setUser(us[0]);
                setLoadingUser(false);
            });
            getOrdersByUser(userStorage).then(us => {
                setOrders(us);
                setLoadingOrders(false);
            })
        }
    }, [logged]);

    return logged
        ? <ProfileLogged products={productsState.products} loadingUser={loadingUser} loadingOrders={loadingOrders} user={user} orders={orders} setLogged={setLogged} handleToCart={handleToCart} dispatchProducts={dispatchProducts} />
        : <Form setLogged={setLogged} dispatchProducts={dispatchProducts} />
}