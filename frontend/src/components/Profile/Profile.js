import { useState } from "react";
import Form from "./Form/Form";
import "./Profile.scss";


export default function Profile() {
    const [logged, setLogged] = useState(false);

    return logged
        ? <h1>Ac</h1>
        : <Form setLogged={setLogged} />
}