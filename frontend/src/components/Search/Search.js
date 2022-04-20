import "./Search.scss";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Search({ setSearchTerm, searchTerm }) {

    const location = useLocation().pathname;

    return (
        <div className="search">
            {location === "/favourites" && <p className="search__text">Aquí están tus productos favoritos <FaHeart style={{ color: "red", fontSize: "1.2rem" }} /></p>}
            <p>¿Que producto estás buscando?</p>
            <input className="search__input" placeholder="Search..." type="text" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}