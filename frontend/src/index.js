import React from 'react';
import './index.scss';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './components/App';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Favourites from './components/Favourites/Favorites';
import Profile from './components/Profile/Profile';
import Contact from './components/Contact/Contact';


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="" element={<Products />} >
                    <Route path="chocolate" element={<></>} />
                    <Route path="chuches" element={<></>} />
                    <Route path="helados" element={<></>} />
                    <Route path="bebida" element={<></>} />
                    <Route path="despensa" element={<></>} />
                    <Route path="snacks" element={<></>} />
                    <Route path="higiene" element={<></>} />
                    <Route path="alcohol" element={<></>} />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="profile" element={<Profile />} />
                <Route path="contact" element={<Contact />} />
            </Route>
        </Routes>
    </BrowserRouter>
    ,
    document.getElementById('root')
);