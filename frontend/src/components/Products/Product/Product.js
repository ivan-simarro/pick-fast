import "./Product.scss";
import carrito from "../../../assets/carritotick.png";
import emptyHeart from "../../../assets/emptyHeart.png";
import fullHeart from "../../../assets/fullHeart.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

function Product({ product, handleToCart, handleDeleteFromCart, handleDeleteFromFavourites }) {
    const { id, name, image, description, price, brand, stock, type, quantity, inCart, q, favourite } = product;
    const [toCart, setToCart] = useState(q > 0 ? q : 1);
    const [show, setShow] = useState(sessionStorage.getItem("productAnimation") || false);
    const location = useLocation().pathname;
    const [isAvailableToUpdate, setIsAvailableToUpdate] = useState(false);

    useEffect(() => {
        toCart <= 0 && setToCart(1);
        toCart > 100 && setToCart(100);
    }, [toCart]);

    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                setShow(true);
                sessionStorage.setItem("productAnimation", true);
            }, 1000);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (q === toCart) {
            setIsAvailableToUpdate(false);
        }
    }, [q, toCart]);

    function handleProductDetails() {
        Swal.fire({
            title: name + " " + quantity,
            text: description,
            imageUrl: image,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: name,
        })
    }

    return (
        <li className={location === "/cart" ? "cart__product" : !show ? "product short" : "product"}>
            {
                inCart && <Link
                    to={{
                        pathname: "/cart"
                    }}
                >
                    <img className={location === "/cart" ? "cart__product__cart" : "product__cart "} src={carrito} alt="Added to cart" />
                </Link>
            }
            {
                location !== "/cart" && <img className={"product__cart--heart"} src={favourite ? fullHeart : emptyHeart} alt="Favourite" onClick={() => {
                    handleDeleteFromFavourites(id, !favourite);
                }} />
            }

            <div className={location === "/cart" ? "cart__product__top" : "product__top"}>
                <img className={stock ? location === "/cart" ? "product__img" : "cart__product__img" : "product__img cart__product__img product__img--nostock"} src={image} alt="" onClick={handleProductDetails} />
            </div>
            <div className={location === "/cart" ? "cart__product__data" : "product__data"}>
                {show && <>
                    <h1 className={location === "/cart" ? "cart__product__data--price" : "product__data--price"}>{location === "/cart" && <b>Precio: </b>}{`${price} €`}</h1>
                    <h2 className={location === "/cart" ? "cart__product__data--title" : "product__data--title"}>{location === "/cart" && <b>Producto: </b>}{name + " " + quantity}</h2>
                </>
                }
                {
                    location === "/cart" && inCart && <>
                        <h1 className="cart__product__data--price"><b>Marca: </b>{brand}</h1>
                        <h1 className="cart__product__data--price"><b>Tipo de producto: </b>{type}</h1>
                        <h1 className="cart__product__data--price"><b>Descripción: </b>{description}</h1>
                        <h1 className="cart__product__data--add total">Precio para {q} articulos: {(q * price).toFixed(2)}€</h1>
                    </>
                }
                <div className={location === "/cart" ? "cart__product__data--add" : "product__data--add "}>
                    {
                        stock ?
                            <>
                                {show && <><button className={location === "/cart" ? "cart__product__data--add-number" : "product__data--add-number"} onClick={() => {
                                    setIsAvailableToUpdate(true);
                                    setToCart(toCart => toCart - 1);
                                }}>-</button><input type="number" className={location === "/cart" ? "cart__product__data--add-number" : "product__data--add-number"} size="3" value={toCart} min="1" pattern="^[0-9]+" max="100" onChange={(e) => setToCart(e.target.value)}></input><button className={location === "/cart" ? "cart__product__data--add-number" : "product__data--add-number"} onClick={() => {
                                    setToCart(toCart => toCart + 1);
                                    setIsAvailableToUpdate(true);
                                }}>+</button></>}
                                <div className={location === "/cart" ? "cart__product__data--add-btn" : "product__data--add-btn"}>
                                    <button className={!isAvailableToUpdate && q !== 0 ? "btn-disabled" : ""} style={{ cursor: "pointer" }} onClick={() => {
                                        setIsAvailableToUpdate(false);
                                        handleToCart(id, toCart);
                                    }}>{q !== 0 ? "Actualizar cantidad" : "Añadir al carrito"}</button>
                                </div>
                                {inCart && location === "/cart" && <div className={location === "/cart" ? "cart__product__data--add-btn" : "product__data--add-btn"}>
                                    <button style={{ cursor: "pointer", backgroundColor: "red" }} onClick={() => handleDeleteFromCart(id)}>Eliminar articulo</button>
                                </div>}
                            </>
                            : <div className={"product__data--add-btn disabled"}>
                                <button disabled>Fuera de stock</button>
                            </div>
                    }
                </div>
            </div>
        </li >
    )
}

export default Product;