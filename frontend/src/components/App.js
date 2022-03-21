import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('api/products/').then(res => {
            setProducts(res.data)
            setLoading(false);
        })
    }, [])


    return (
        <div className="App">
            <h1>MY APP</h1>
            {
                !loading && <ul>{products.map(product => <li key={product.id}>
                    <img src={product.image} alt="" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </li>)}</ul>
            }
        </div>
    )
}