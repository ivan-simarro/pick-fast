import { useState } from "react";
import "./Form.scss";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

export default function Form({ setLogged }) {

    const [form, setForm] = useState(0);

    return (
        <div className="form" >

            <ul className="tab-group" >
                <li className={form === 0 ? "tab active" : "tab"} onClick={() => setForm(0)}><a className="form__group--nav" href="http://localhost:3000/profile#login" onClick={(e) => e.nativeEvent.preventDefault()}>Sign Up</a></li >
                <li className={form === 1 ? "tab active" : "tab"} onClick={() => setForm(1)} > <a className="form__group--nav" href="http://localhost:3000/profile#login" onClick={(e) => e.nativeEvent.preventDefault()}>Log In</a></li >
            </ul >
            {
                form === 0 ? <SignUp setLogged={setLogged} /> : <Login setLogged={setLogged} />
            }
        </div >
    )
}

