import "./Header.css";

import Navbar from "./Navbar/Navbar";

function Header(){
    return (
        <header className="header">
            <img src="/Logo.jpg" alt="Logo" />
            <Navbar />
        </header>
    );
}

export default Header;