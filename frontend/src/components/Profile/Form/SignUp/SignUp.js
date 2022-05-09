import { useState } from 'react';
import md5 from 'js-md5';
import Swal from 'sweetalert2';
import { postUser } from '../../profileUtils';

export default function SignUp({ setLogged }) {
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        user: '',
        password: ''
    })

    function onChangeSignUp(e) {
        setUser({ ...user, [e.target.name]: e.target.name === 'password' ? md5(e.target.value) : e.target.value });
    }

    function signup() {
        if (!user.user.includes('@') || !user.user.includes('.')) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Email incorrecto',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (user.password === md5('') || user.password.length === 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Contraseña inválida',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            postUser(user, setLogged);
        }
    }

    return (
        <div className="signup" >
            <h1 className="form__h1">Registrarse</h1>
            <form action="/" method="post">
                <div className="top-row">
                    <div className="field-wrap">
                        <input type="text" name='name' onChange={onChangeSignUp} maxLength={15} placeholder="Nombre" required />
                    </div>
                    <div className="field-wrap" >
                        <input type="text" name='lastName' onChange={onChangeSignUp} maxLength={20} placeholder="Apellido" required />
                    </div >
                </div >
                <div className="field-wrap" >
                    <input type="email" name='user' onChange={onChangeSignUp} placeholder="Correo electrónico" required />
                </div >
                <div className="field-wrap" >
                    <input type="password" name='password' onChange={onChangeSignUp} maxLength={20} placeholder="Contraseña" required />
                </div>
            </form >
            <button className="form__button button-block" onClick={signup}>Empezar</button >
        </div >
    )
}