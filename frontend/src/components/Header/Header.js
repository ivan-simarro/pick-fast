import './Header.scss';
import { FaHeart, FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import carritoLogo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import pages from '../Products/Home/homeAssets';
import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';

export default function Header({ totalProducts, bill }) {

    const location = useLocation().pathname;

    const [selected, setSelected] = useState(1);

    useEffect(() => {
        location === "/cart" && setSelected(2);
    }, [location]);

    return (
        <header className="header">
            <Logo />
            <ul className="header__options">
                <li className="header__options--home">
                    <Link to="/" onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth", })
                        setSelected(1);
                    }} >
                        <FaHome className={selected === 1 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    {selected === 1 && <p className='header__options--title'>Home</p>}
                    <ul className="header__options--home-list">
                        {
                            pages.map(page => {
                                return <React.Fragment key={page.id}><li><Link to={"/" + page.name} onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth", })
                                    setSelected(1);
                                }}>
                                    {page.name}
                                </Link></li></React.Fragment>
                            })
                        }
                    </ul>
                </li>
                <li>
                    <Link to="/cart" onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth", })
                        setSelected(2);
                    }} >
                        <FaShoppingCart className={selected === 2 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    {selected === 2 && <p className='header__options--title'>Cart</p>}
                </li >
                <li>
                    <Link to="/favourites" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(3);
                    }} >
                        <FaHeart className={selected === 3 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    {selected === 3 && <p className='header__options--title'>Favourites</p>}
                </li >
                <li>
                    <Link to="/profile" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(4);
                    }} >
                        <FaUserAlt className={selected === 4 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    {selected === 4 && <p className='header__options--title'>Profile</p>}
                </li >
                <li>
                    <Link to="/contact" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(5);
                    }} >
                        <BsChatSquareDotsFill className={selected === 5 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    {selected === 5 && <p className='header__options--title'>Contact</p>}
                </li >
            </ul >
            <div className="header__toPay">
                <Link to="/cart" onClick={() => {
                    window.scrollTo({
                        top: 0, behavior: "smooth",
                    })
                    setSelected(2);
                }} >
                    <img className='header__img' src={carritoLogo} alt="" />
                </Link>
                <div id='header-cart' className="header__toPay--circle">
                    <p>{totalProducts}</p>
                </div>
                <p className='header__toPay--bill'>{bill}€</p>
            </div>
        </header >
    )
}