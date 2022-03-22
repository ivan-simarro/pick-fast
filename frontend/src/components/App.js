import { Outlet } from 'react-router-dom';
import './App.scss';
import Navbar from './Navbar/Navbar';

export default function App() {

    return (
        <div className="app">
            <Navbar />
            <Outlet />
        </div>
    )
}