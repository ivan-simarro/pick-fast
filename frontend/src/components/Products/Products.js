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

    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected] = useOutletContext();
    const [products, setProducts] = useState([]);
    const [toShow, setToShow] = useState(10);
    const [isPaginating, setIsPaginating] = useState(false);
    const location = useLocation().pathname;

    useEffect(() => {
        if (productsState.products.length === 0) {
            sessionStorage.removeItem("productAnimation")
        } else {
            setProducts(sortProducts(productsState.products, "inCart", false));
        }
    }, [productsState.products]);

    useEffect(() => {
        toShow !== 10 && setToShow(10);
        // eslint-disable-next-line
    }, [searchTerm, products]);

    function paginating() {
        setIsPaginating(true);
        setTimeout(() => {
            setToShow(toShow => toShow + 5);
            setIsPaginating(false);
        }, 1500);
    }

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
                        ? <><Filtering productsState={productsState.products} setProducts={setProducts} setSearchTerm={setSearchTerm} isReverse={isReverse} selected={selected} searchTerm={searchTerm} setSelected={setSelected} setIsReverse={setIsReverse} />
                            <ul className="products"> {products.filter(p => filtering(p, type, searchTerm)).map((product, i) => {
                                return location === "/cart" ?
                                    <Product key={product.id} product={product} handleToCart={handleToCart} handleAddDeleteFromFavourites={handleAddDeleteFromFavourites} />
                                    : i < toShow && < Product key={product.id} product={product} handleToCart={handleToCart} handleAddDeleteFromFavourites={handleAddDeleteFromFavourites} setSelected={setSelected} setIsReverse={setIsReverse} />
                            })}</ul>{
                                location !== "/cart" && !isPaginating ? products.filter(p => filtering(p, type, searchTerm)).length >= toShow && <button className="paginado" onClick={paginating}>Show more</button>
                                    : <Spinner style={{ fontSize: "5rem", color: "black", position: "absolute", bottom: "0", right: "0", left: "0", margin: "auto", marginBottom: "9.5rem" }} />
                            }</>
                        : <Spinner style={{ fontSize: "5rem", color: "black", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto", marginTop: "9rem" }} />
                }
            </> : <Home />
        }</>
    )
}