import axios from 'axios';
import Swal from 'sweetalert2';

const ENDPOINT_USERS = 'http://localhost:8000/users/users/';

export const postUser = (user, setLogged) => axios.post(ENDPOINT_USERS, user)
    .then(response => setLogged(true))
    .catch(error => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrió un error en su registro',
            showConfirmButton: false,
            timer: 1500
        })
    });
