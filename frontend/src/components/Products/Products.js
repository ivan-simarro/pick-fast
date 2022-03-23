import "./Products.scss";
import Product from './Product/Product';
import { useOutletContext } from "react-router-dom";
import { Spinner } from "../Loading/Spinner";

export default function Products() {

    const [products, setProducts, loading, setLoading] = useOutletContext();

    return (
        <ul className="products">
            {
                !loading ? products.map(product => <Product key={product.id} {...product} />) : <Spinner style={{ fontSize: "20rem", color: "white" }} />
            }
        </ul>
    )
}