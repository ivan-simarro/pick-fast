import "./Favourites.scss";
import { useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";
import Search from "../Search/Search";
import { useEffect } from "react";
import { useState } from "react";


export default function Favourites() {
    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged] = useOutletContext();
    const [isAnyFavourite, setIsAnyFavourite] = useState(false);

    useEffect(() => {
        setIsAnyFavourite(productsState.products.filter(p => p.favourite).length !== 0);
    }, [logged]);

    return (
        <>{isAnyFavourite && <div style={{ marginBottom: "3.5rem", display: "flex", justifyContent: "center", alignItems: "center" }} ><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>}<ul className="products">
            {!isAnyFavourite && <div className="products__none">
                <p>Todavía no tienes productos favoritos...</p>
            </div>}
            {productsState.products.filter(p => p.favourite === true && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()))).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleAddDeleteFromFavourites={handleAddDeleteFromFavourites} setIsReverse={setIsReverse} setSelected={setSelected} />)}
        </ul></>
    )
}