import "./Product.scss";
import { useEffect, useState } from "react";

export default function Product({ name, image, description, price, brand, stock, type, quantity }) {
    const [toCart, setToCart] = useState(1);

    useEffect(() => {
        toCart <= 0 && setToCart(1);
    }, [toCart]);

    return (
        <li className="product">
            <img className={stock ? "product__img" : "product__img product__img--nostock"} src={image} alt="" />
            <div className="product__data">
                <h1 className="product__data--price">{`${price} €`}</h1>
                <h2 className="product__data--title">{name + " " + quantity}</h2>
                {
                    stock ? <div className="product__data--add">
                        <button className="product__data--add-number" onClick={() => setToCart(toCart => toCart - 1)} >-</button>
                        <input type="number" className="product__data--add-number" size="3" value={toCart} min="1" pattern="^[0-9]+" max="100" onChange={(e) => setToCart(e.target.value)}></input>
                        <button className="product__data--add-number" onClick={() => setToCart(toCart => toCart + 1)} >+</button>
                        <div className="product__data--add-btn">
                            <button>Añadir al carrito</button>
                        </div>
                    </div> : <p>Fuera de stock</p>
                }
            </div>
        </li>
    )
}