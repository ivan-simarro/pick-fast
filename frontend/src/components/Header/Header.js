import './Header.scss';
import { FaHeart, FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import carritoLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import pages from '../Products/Home/homeAssets';
import React from 'react';
import Logo from '../Logo/Logo';

export default function Header() {
    return (
        <header className="header">
            <Logo />
            <ul className="header__options">
                <li className="header__options--home">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                        <FaHome className="header__options--item" />
                    </Link>
                    <ul className="header__options--home-list">
                        {
                            pages.map(page => {
                                return <React.Fragment key={page.id}><li><Link to={"/" + page.name} onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}>
                                    {page.name}
                                </Link></li><hr /></React.Fragment>
                            })
                        }
                    </ul>
                </li>
                <li>
                    <Link to="/cart" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                        <FaShoppingCart className="header__options--item" />
                    </Link>
                </li>
                <li>
                    <Link to="/favourites" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                        <FaHeart className="header__options--item" />
                    </Link>
                </li>
                <li>
                    <Link to="/profile" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                        <FaUserAlt className="header__options--item" />
                    </Link>
                </li>
                <li>
                    <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                        <BsChatSquareDotsFill className="header__options--item" />
                    </Link>
                </li>
            </ul >
            <div className="header__img">
                <img src={carritoLogo} alt="" />
            </div>
        </header >
    )
}