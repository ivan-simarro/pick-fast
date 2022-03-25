import "./Products.scss";
import Product from './Product/Product';
import { useOutletContext } from "react-router-dom";
import { Spinner } from "../Loading/Spinner";

export default function Products() {

    const [products, setProducts, loading, setLoading] = useOutletContext();

    if (products.length === 0) {
        sessionStorage.removeItem("productAnimation")
    }

    return (
        <ul className="products">
            {
                !loading
                    ? products.map(product => <Product key={product.id} product={product} />)
                    : <Spinner style={{ fontSize: "8rem", color: "white", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto" }} />
            }
        </ul>
    )
}