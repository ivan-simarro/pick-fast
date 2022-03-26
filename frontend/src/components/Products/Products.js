import "./Products.scss";
import Product from './Product/Product';
import { useLocation, useOutletContext } from "react-router-dom";
import { Spinner } from "../Loading/Spinner";
import { useEffect } from "react";
import Home from "./Home/Home";

export default function Products() {

    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites] = useOutletContext();

    useEffect(() => {
        if (productsState.products.length === 0) {
            sessionStorage.removeItem("productAnimation")
        }
    }, [productsState.products]);

    const location = useLocation().pathname;
    var type;
    switch (location) {
        case "/chocolate":
            type = "chocolate"
            break;
        case "/helados":
            type = "helados"
            break;
        case "/bebida":
            type = "bebida"
            break;
        case "/despensa":
            type = "despensa"
            break;
        case "/snacks":
            type = "snacks"
            break;
        case "/higiene":
            type = "higiene"
            break;
        default:
            break;
    }


    return (
        <>{
            location !== "/" ? < ul className="products">
                {
                    !productsState.loading
                        ? productsState.products.filter(p => p.type == type || p.type.includes(type)).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromFavourites={handleDeleteFromFavourites} />)
                        : <Spinner style={{ fontSize: "8rem", color: "white", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto" }} />
                }
            </ul> : <Home />
        }</>
    )
}