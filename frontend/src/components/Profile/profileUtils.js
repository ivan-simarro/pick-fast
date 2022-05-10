import axios from 'axios';
import Swal from 'sweetalert2';
import md5 from 'js-md5';

const ENDPOINT_USERS = 'http://localhost:8000/users/users/';

const ENDPOINT_ORDERS = "http://localhost:8000/api/orders/";

const postUser = (user, setLogged) => axios.post(ENDPOINT_USERS, user)
    .then(response => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Hola " + user.name + ", gracias por registrarte",
            showConfirmButton: true
        })
        setTimeout(() => {
            setLogged(true);
        }, 1000);
    })
    .catch(error => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrió un error en su registro',
            showConfirmButton: false,
            timer: 1500
        })
    });

export const ifDontExistsCreateUser = (user, setLogged) => {
    isExistingUser(user).then(res => {
        if (res.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ya hay un usuario registrado con este correo',
                showConfirmButton: true
            })
        } else {
            postUser(user, setLogged);
        }
    });
}

const isExistingUser = (user) => axios.get(ENDPOINT_USERS)
    .then(response => {
        return response.data.filter(u => u.user === user.user);
    })

export const login = (user, setLogged) => {
    isExistingUser(user).then(u => {
        if (u.length > 0) {
            const resUser = u[0];
            if (resUser.user === user.user && resUser.password === user.password) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "¡Hola de nuevo " + resUser.name + "!",
                    showConfirmButton: false,
                    timer: 1000
                })
                setTimeout(() => {
                    setLogged(true);
                }, 950);
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contraseña incorrecta',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuario incorrecto',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
}

export const validateForm = (user) => {
    if (!user.user.includes('@') || !user.user.includes('.')) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Email incorrecto',
            showConfirmButton: false,
            timer: 1500
        })
        return false;
    } else if (user.password === md5('') || user.password.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Contraseña inválida',
            showConfirmButton: false,
            timer: 1500
        })
        return false;
    }
    return true;
}

export const getUserByUser = (user) => axios.get(ENDPOINT_USERS).then(res => res.data.filter(us => us.user === user));

export const getOrdersByUser = (user) => axios.get(ENDPOINT_ORDERS).then(res => res.data.filter(us => us.user === user)); 