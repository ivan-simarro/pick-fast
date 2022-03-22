import "./Navbar.scss";
import { FaHeart, FaHome, FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <ul className="navbar">
            <li>
                <Link className={location.pathname === "/" ? 'navbar__item selected' : 'navbar__item'} to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <FaHome style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
            <li>
                <Link className={location.pathname === "/search" ? 'navbar__item selected' : 'navbar__item'} to="/search" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <FaSearch style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
            <li>
                <Link className={location.pathname === "/cart" ? 'navbar__item selected' : 'navbar__item'} to="/cart" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <FaShoppingCart style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
            <li>
                <Link className={location.pathname === "/favourites" ? 'navbar__item selected' : 'navbar__item'} to="/favourites" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <FaHeart style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
            <li>
                <Link className={location.pathname === "/profile" ? 'navbar__item selected' : 'navbar__item'} to="/profile" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <FaUserAlt style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
            <li>
                <Link className={location.pathname === "/contact" ? 'navbar__item selected' : 'navbar__item'} to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} >
                    <BsChatSquareDotsFill style={{ fontSize: "1.7rem" }} />
                </Link>
            </li>
        </ul >

    )
}