import "./Header.css";

import Navbar from "./Navbar/Navbar";
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="header">
            <Link to="/">
                <img src="/Logo.jpg" alt="Logo" />
            </Link>
            <Navbar />
        </header>
    );
}

export default Header;