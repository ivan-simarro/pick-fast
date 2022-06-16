import { useState } from "react";
import { getFavouritesByUser, login, validateForm } from "../../profileUtils";
import md5 from "js-md5";
import { TYPES } from "../../../../reducers/productsReducer";

export default function Login({ setLogged, dispatchProducts, setDoingLogin }) {

    const [user, setUser] = useState({
        user: '',
        password: ''
    })

    function onChangeLogin(e) {
        setUser({ ...user, [e.target.name]: e.target.name === 'password' ? md5(e.target.value) : e.target.value });
    }

    function onLogin() {
        if (validateForm(user)) {
            login(user, setLogged);
            sessionStorage.setItem("user", user.user);
            setDoingLogin(true);
            getFavouritesByUser(user.user).then(res => JSON.parse(res.data.products).map(id => {
                dispatchProducts({ type: TYPES.ADD_DELETE_TO_FAVOURITES, payload: { id, favourite: true } });
            }));
        }
    }

    return (
        <div id="login">
            <h1 className="form__h1">¡Hola de nuevo!</h1>

            <form action="/" method="post">
                <div className="field-wrap">
                    <input type="user" name="user" onChange={onChangeLogin} placeholder="Correo electrónico" required />
                </div>
                <div className="field-wrap" >
                    <input type="password" name="password" onChange={onChangeLogin} placeholder="Contraseña" required />
                </div>
            </form >
            <button className="form__button button-block" onClick={onLogin} > Log In</button >
        </div >
    )
}