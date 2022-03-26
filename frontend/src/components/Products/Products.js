import "./Products.scss";
import Product from './Product/Product';
import { useOutletContext } from "react-router-dom";
import { Spinner } from "../Loading/Spinner";
import { useEffect } from "react";

export default function Products() {

    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites] = useOutletContext();

    useEffect(() => {
        if (productsState.products.length === 0) {
            sessionStorage.removeItem("productAnimation")
        }
    }, [productsState.products]);



    return (
        <ul className="products">
            {
                !productsState.loading
                    ? productsState.products.map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromFavourites={handleDeleteFromFavourites} />)
                    : <Spinner style={{ fontSize: "8rem", color: "white", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto" }} />
            }
        </ul>
    )
}