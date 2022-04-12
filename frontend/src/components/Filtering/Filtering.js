import { useState } from "react";
import Search from "../Search/Search";
import FilteringButton from "./FilteringButton";

export default function Filtering({ productsState, setProducts, setSearchTerm, searchTerm }) {

    const [isReverse, setIsReverse] = useState(false);

    return (
        <div className="filteringBar">
            <p className="filteringBar__text">
                Ordenar por:
            </p>
            <div className="filteringBar__buttons">
                <FilteringButton setProducts={setProducts} text={"Nombre"} productsState={productsState} productKey={"name"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton setProducts={setProducts} text={"Precio"} productsState={productsState} productKey={"price"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton setProducts={setProducts} text={"Stock"} productsState={productsState} productKey={"stock"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton setProducts={setProducts} text={"En carrito"} productsState={productsState} productKey={"inCart"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton setProducts={setProducts} text={"Favoritos"} productsState={productsState} productKey={"favourite"} isReverse={isReverse} setIsReverse={setIsReverse} />
            </div>
            <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
    )
}