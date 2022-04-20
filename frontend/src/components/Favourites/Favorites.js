import "./Favourites.scss";
import { useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";
import Search from "../Search/Search";


export default function Favourites() {
    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites, searchTerm, setSearchTerm] = useOutletContext();

    return (
        <>{productsState.products.filter(p => p.favourite).length !== 0 && <div style={{ marginBottom: "3.5rem", display: "flex", justifyContent: "center", alignItems: "center" }} ><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>}<ul className="products">
            {productsState.products.filter(p => p.favourite).length === 0 && <div className="products__none">
                <p>Todavía no tienes productos favoritos...</p>
            </div>}
            {productsState.products.filter(p => p.favourite == true && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()))).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromFavourites={handleDeleteFromFavourites} />)}
        </ul></>
    )
}