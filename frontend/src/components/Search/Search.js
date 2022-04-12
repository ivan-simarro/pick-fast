import "./Search.scss";

export default function Search({ setSearchTerm, searchTerm }) {

    return (
        <div className="search">
            <input className="search__input" placeholder="Search..." type="text" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}