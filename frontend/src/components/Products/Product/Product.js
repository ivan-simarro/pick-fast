import "./Product.scss";

export default function Product({ name, image, description, price, brand, stock, type, quantity }) {
    return (
        <li className="product">
            <img className={stock ? "product__img" : "product__img--nostock"} src={image} alt="" />
            <div className="product__data">
                <h1 className="product__data--price">{`${price} €`}</h1>
                <h2 className="product__data--title">{name + " " + quantity}</h2>
            </div>
        </li>
    )
}