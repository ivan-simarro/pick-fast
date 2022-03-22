import "./Products.scss";
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product/Product';

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('api/products/').then(res => {
            setTimeout(() => {
                setProducts(res.data)
                setLoading(false);
            }, 1000);
        })
    }, [])


    return (
        <ul className="products">
            {
                !loading ? products.filter(p => p.type.includes("higiene")).map(product => <Product key={product.id} {...product} />) : "Loading..."
            }
        </ul>
    )
}