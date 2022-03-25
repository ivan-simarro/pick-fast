import "./Product.scss";
import carrito from "../../../assets/carritotick.png";
import { useEffect, useState } from "react";

function Product({ product }) {
    const { name, image, description, price, brand, stock, type, quantity } = product;
    const [toCart, setToCart] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [show, setShow] = useState(sessionStorage.getItem("productAnimation") || false);

    useEffect(() => {
        toCart <= 0 && setToCart(1);
    }, [toCart]);

    function handleAddToCart() {
        setIsAdded(true);
    }

    if (!show) {
        setTimeout(() => {
            setShow(true);
            sessionStorage.setItem("productAnimation", true);
        }, 1500);
    }


    return (
        <li className={!show ? "product short" : "product"}>
            {
                isAdded && <img className="product__cart" src={carrito} alt="Added to cart" />
            }
            <div className="product__top">
                <img className={stock ? "product__img" : "product__img product__img--nostock"} src={image} alt="" />
            </div>
            <div className="product__data">
                {show && <>
                    <h1 className="product__data--price">{`${price} €`}</h1>
                    <h2 className="product__data--title">{name + " " + quantity}</h2>
                </>
                }
                <div className="product__data--add">
                    {
                        stock ?
                            <>
                                {show && <><button className="product__data--add-number" onClick={() => setToCart(toCart => toCart - 1)}>-</button><input type="number" className="product__data--add-number" size="3" value={toCart} min="1" pattern="^[0-9]+" max="100" onChange={(e) => setToCart(e.target.value)}></input><button className="product__data--add-number" onClick={() => setToCart(toCart => toCart + 1)}>+</button></>}
                                <div className="product__data--add-btn">
                                    <button style={{ cursor: "pointer" }} onClick={(e) => handleAddToCart(e, name)}>Añadir al carrito</button>
                                </div></>
                            : <div className="product__data--add-btn disabled">
                                <button disabled>Fuera de stock</button>
                            </div>
                    }
                </div>
            </div>
        </li >
    )
}

export default Product;