import './App.scss';
import Navbar from './Navbar/Navbar';
import Products from './Products/Products';

export default function App() {

    return (
        <div className="app">
            <Navbar />
            <Products />
        </div>
    )
}