import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import axios from 'axios';
import './App.scss';

export default function App() {

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
        <div className="app">
            <Navbar />
            <Outlet context={[products, setProducts, loading, setLoading]} />
        </div>
    )
}