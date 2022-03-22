import "./Navbar.scss";

export default function Navbar() {
    return (
        <ul className="navbar">
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-reorder'></i>
                </a>
            </li>
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-th-large'></i>
                </a>
            </li>
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-bar-chart'></i>
                </a>
            </li>
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-tasks'></i>
                </a>
            </li>
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-bell'></i>
                </a>
            </li>
            <li>
                <a className='navbar__item' href=''>
                    <i className='icon-bell'></i>
                </a>
            </li>
        </ul>

    )
}