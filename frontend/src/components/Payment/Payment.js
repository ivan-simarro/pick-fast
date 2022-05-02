import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Payment.scss";
import Swal from 'sweetalert2';

function paymentAlert() {
    Swal.fire({
        title: 'Accediendo para finalizar su compra',
        html: 'No olvide confirmar su pago online en la app de su banco',
        timer: 3500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    })

}
export default function Payment() {
    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill] = useOutletContext();

    useEffect(() => {
        paymentAlert();
    }, []);

    return (
        <></>
    );
}