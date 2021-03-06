import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Payment.scss";
import Swal from 'sweetalert2';
import { useState } from "react";
import creditCard from "../../assets/credit-card.png";
import { TYPES } from "../../reducers/productsReducer";
import { postOrder } from "./paymentUtils";

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
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged] = useOutletContext();
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [card, setCard] = useState({
        number: '',
        expir: '',
        cvv: ''
    });

    let navigate = useNavigate();

    useEffect(() => {
        if (!logged) {
            navigate("/profile");
        } else {
            paymentAlert();
            setTimeout(() => {
                setShow(true);
            }, 3500);
        }
        // eslint-disable-next-line
    }, []);

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

    const user = sessionStorage.getItem("user");

    function handleConfirm() {
        let products = [];
        productsState.products.forEach(p => {
            if (p.inCart) {
                products.push({ id: p.id, q: p.q });
            }
        });

        postOrder(user, bill, JSON.stringify(products))
            .then(res => {
                dispatchProducts({ type: TYPES.DELETE_CART });
                setBill(0);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '??Gracias por su compra!',
                    showConfirmButton: false,
                    timer: 3000
                })
                setTimeout(() => {
                    navigate("/profile");
                }, 1990);
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ocurri?? un error en su compra',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    function separateNumbers(element, len) {
        let numberArr = element.split("");
        let newNumber = '';
        for (let i = 0; i < len; i++) {
            if (i === 4 || i === 8 || i === 12) newNumber += " "
            newNumber += numberArr[i];
        }
        return newNumber;
    }

    useEffect(() => {
        let len = card.number.length;
        if (len === 16) {
            setCard({ ...card, number: separateNumbers(card.number, len) });
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


    return (
        <div className="payment">
            {show &&
                <>
                    <img className="payment__card" src={creditCard} alt="" /><div className="payment__up">
                        <div>
                            <p className="card__text">N??mero tarjeta</p>
                            <input className="payment__card--input" type="text" readOnly value={card.number} />
                        </div>
                        <div className="payment__up--two">
                            <div className="payment__up--two-box">
                                <p className="card__text">Fecha Expiraci??n</p>
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
                            <p>N??mero de la tarjeta</p>
                            <input type="text" onChange={(e) => handleChange(e, "number")} />
                        </div>
                        <div className="payment__down--box">
                            <p>Fecha expiraci??n</p>
                            <input type="text" onChange={(e) => handleChange(e, "expir")} />
                        </div>
                        <div className="payment__down--box">
                            <p>Cvv</p>
                            <input type="text" onChange={(e) => handleChange(e, "cvv")} />
                        </div>
                    </div><div className="payment__btn">
                        <button className={disabled ? "" : "payment__btn--enabled"} disabled={disabled} onClick={handleConfirm} >Pagar {bill}???</button>
                    </div>
                </>
            }
        </div>
    );
}