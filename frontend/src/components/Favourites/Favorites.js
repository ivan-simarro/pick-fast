import "./Favourites.scss";
import { useOutletContext } from "react-router-dom";
import Product from "../Products/Product/Product";


export default function Favourites() {
    const [productsState, dispatchProducts, handleToCart, handleDeleteFromFavourites] = useOutletContext();

    return (
        <ul className="products">
            {
                productsState.products.filter(p => p.favourite).map(product => <Product key={product.id} product={product} handleToCart={handleToCart} handleDeleteFromFavourites={handleDeleteFromFavourites} />)
            }
        </ul>
    )
}