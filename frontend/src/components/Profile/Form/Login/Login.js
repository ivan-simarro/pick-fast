import { useState } from "react";
import { login, validateForm } from "../../profileUtils";
import md5 from "js-md5";

export default function Login({ setLogged }) {

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