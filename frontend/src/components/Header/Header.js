import './Header.scss';
import { FaHeart, FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import carritoLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import pages from '../Products/Home/homeAssets';
import React, { useState } from 'react';
import Logo from '../Logo/Logo';

export default function Header() {

    const [selected, setSelected] = useState(0);

    return (
        <header className="header">
            <Logo />
            <ul className="header__options">
                <li className="header__options--home">
                    <Link to="/" onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth", })
                        setSelected(1);
                    }} >
                        <FaHome className={selected == 1 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                    <ul className="header__options--home-list">
                        {
                            pages.map(page => {
                                return <React.Fragment key={page.id}><li><Link to={"/" + page.name} onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth", })
                                    setSelected(1);
                                }}>
                                    {page.name}
                                </Link></li><hr /></React.Fragment>
                            })
                        }
                    </ul>
                </li>
                <li>
                    <Link to="/cart" onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth", })
                        setSelected(2);
                    }} >
                        <FaShoppingCart className={selected == 2 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                </li >
                <li>
                    <Link to="/favourites" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(3);
                    }} >
                        <FaHeart className={selected == 3 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                </li >
                <li>
                    <Link to="/profile" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(4);
                    }} >
                        <FaUserAlt className={selected == 4 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                </li >
                <li>
                    <Link to="/contact" onClick={() => {
                        window.scrollTo({
                            top: 0, behavior: "smooth",
                        })
                        setSelected(5);
                    }} >
                        <BsChatSquareDotsFill className={selected == 5 ? "header__options--item selected" : "header__options--item"} />
                    </Link>
                </li >
            </ul >
            <div className="header__img">
                <img src={carritoLogo} alt="" />
            </div>
        </header >
    )
}