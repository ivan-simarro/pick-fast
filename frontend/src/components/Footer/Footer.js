import Logo from "../Logo/Logo";
import "./Footer.scss";
export default function Footer() {
    return (
        <footer className="footer">
            <h2>
                © 2022
            </h2>
            <Logo />
            <a href="http://localhost:3000" onClick={(e) => e.preventDefault()}>
                Terms & conditions
            </a>
        </footer >
    )
}