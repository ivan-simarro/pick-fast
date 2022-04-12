import "./Products.scss";
import Product from './Product/Product';
import { useLocation, useOutletContext } from "react-router-dom";
import { Spinner } from "../Loading/Spinner";
import { useEffect, useState } from "react";
import Home from "./Home/Home";
import filtering from "./Product/productUtils";
import Filtering from "../Filtering/Filtering";
import { sortProducts } from "../Filtering/sortProducts";


export default function Products() {

    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites, searchTerm, setSearchTerm] = useOutletContext();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (productsState.products.length === 0) {
            sessionStorage.removeItem("productAnimation")
        } else {
            setProducts(sortProducts(productsState.products, "favourite", false));
        }
    }, [productsState.products]);

    const location = useLocation().pathname;

    var type;
    switch (location) {
        case "/chocolate":
            type = "chocolate"
            break;
        case "/chuches":
            type = "chuches"
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
        case "/alcohol":
            type = "alcohol"
            break;
        default:
            break;
    }

    return (
        <>{
            location !== "/" ? <>
                {
                    !productsState.loading
                        ? <><Filtering productsState={productsState.products} setProducts={setProducts} setSearchTerm={setSearchTerm} searchTerm={searchTerm} /> <ul className="products"> {products.filter(p => filtering(p, type, searchTerm)).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromFavourites={handleDeleteFromFavourites} />)}</ul></>
                        : <Spinner style={{ fontSize: "8rem", color: "black", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto", marginTop: "5rem" }} />
                }
            </> : <Home />
        }</>
    )
}