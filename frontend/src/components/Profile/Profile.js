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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Object.keys(user).length === 0 && logged) {

            let userStorage = sessionStorage.getItem("user");
            getUserByUser(userStorage).then(us => {
                setUser(us[0]);
                setLoading(false);
            });
            getOrdersByUser(userStorage).then(us => {
                setOrders(us);
            })
        }
    }, [logged]);

    return logged
        ? <ProfileLogged loading={loading} user={user} orders={orders} />
        : <Form setLogged={setLogged} />
}