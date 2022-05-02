import "./Filtering.scss";
import Search from "../Search/Search";
import FilteringButton from "./FilteringButton";

export default function Filtering({ productsState, setProducts, setSearchTerm, searchTerm, isReverse, selected, setSelected, setIsReverse }) {

    return (
        <div className="filteringBar">
            <div className="filteringBar__buttons">
                <FilteringButton selected={selected} setSelected={setSelected} setProducts={setProducts} text={"Nombre"} productsState={productsState} productKey={"name"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton selected={selected} setSelected={setSelected} setProducts={setProducts} text={"Precio"} productsState={productsState} productKey={"price"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton selected={selected} setSelected={setSelected} setProducts={setProducts} text={"Stock"} productsState={productsState} productKey={"stock"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton selected={selected} setSelected={setSelected} setProducts={setProducts} text={"En carrito"} productsState={productsState} productKey={"inCart"} isReverse={isReverse} setIsReverse={setIsReverse} />
                <FilteringButton selected={selected} setSelected={setSelected} setProducts={setProducts} text={"Favoritos"} productsState={productsState} productKey={"favourite"} isReverse={isReverse} setIsReverse={setIsReverse} />
            </div>
            <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
    )
}