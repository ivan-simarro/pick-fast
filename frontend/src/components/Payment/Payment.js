import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Payment.scss";
import Swal from 'sweetalert2';
import { useState } from "react";
import creditCard from "../../assets/credit-card.png";
import { TYPES } from "../../reducers/productsReducer";

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
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected] = useOutletContext();
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [card, setCard] = useState({
        number: '',
        expir: '',
        cvv: ''
    });

    let navigate = useNavigate();

    function handleChange(e, key) {
        let eValue = e.target.value;
        if (Number.isNaN(Number(eValue)) || (eValue.length > 16 && key === "number") || (eValue.length > 4 && key === "expir") || (eValue.length > 3 && key === "cvv")) {
            e.target.value = eValue.substring(0, eValue.length - 1);
        }
        if (key === "expir" && eValue.length === 2) {
            if (Number(eValue) > 12) {
                e.target.value = 12;
            }
        }
        setCard({
            ...card,
            [key]: e.target.value
        });
    }

    function handleConfirm() {
        dispatchProducts({ type: TYPES.DELETE_CART });
        setBill(0);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Gracias por su compra!',
            showConfirmButton: false,
            timer: 2000
        })
        setTimeout(() => {
            navigate("/profile");
        }, 1990);
    }

    useEffect(() => {
        let len = card.number.length;
        if (len === 16) {
            let numberArr = card.number.split("");
            let newNumber = '';
            for (let i = 0; i < len; i++) {
                if (i === 4 || i === 8 || i === 12) newNumber += " "
                newNumber += numberArr[i];
            }
            setCard({ ...card, number: newNumber });
        }
        // eslint-disable-next-line
    }, [card.number]);

    useEffect(() => {
        let len = card.expir.length;
        if (len === 4) {
            let newExpir = card.expir.split("");
            let auxNumber = newExpir[newExpir.length - 1];
            newExpir[3] = newExpir[2];
            newExpir[2] = "/";
            newExpir.push(auxNumber);
            newExpir = newExpir.join('');
            setCard({ ...card, expir: newExpir });
        }
        // eslint-disable-next-line
    }, [card.expir]);

    useEffect(() => {
        if (card.number.length === 19 && card.expir.length === 5 && card.cvv.length === 3) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [card.number, card.expir, card.cvv]);

    useEffect(() => {
        paymentAlert();
        setTimeout(() => {
            setShow(true);
        }, 3500);
    }, []);

    return (
        <div className="payment">
            {show &&
                <>
                    <img className="payment__card" src={creditCard} alt="" /><div className="payment__up">
                        <div>
                            <p className="card__text">Número tarjeta</p>
                            <input className="payment__card--input" type="text" readOnly value={card.number} />
                        </div>
                        <div className="payment__up--two">
                            <div className="payment__up--two-box">
                                <p className="card__text">Fecha Expiración</p>
                                <input type="text" className="payment__card--input" readOnly value={card.expir} />
                            </div>
                            <div className="payment__up--two-box">
                                <p className="card__text">CVV</p>
                                <input type="text" className="payment__card--input" readOnly value={card.cvv} />
                            </div>
                        </div>
                    </div>
                    <div className="payment__down">
                        <div className="payment__down--box">
                            <p>Número de la tarjeta</p>
                            <input type="text" onChange={(e) => handleChange(e, "number")} />
                        </div>
                        <div className="payment__down--box">
                            <p>Fecha expiración</p>
                            <input type="text" onChange={(e) => handleChange(e, "expir")} />
                        </div>
                        <div className="payment__down--box">
                            <p>Cvv</p>
                            <input type="text" onChange={(e) => handleChange(e, "cvv")} />
                        </div>
                    </div><div className="payment__btn">
                        <button className={disabled ? "" : "enabled"} disabled={disabled} onClick={handleConfirm} >Confirmar el pago</button>
                    </div>
                </>
            }
        </div>
    );
}