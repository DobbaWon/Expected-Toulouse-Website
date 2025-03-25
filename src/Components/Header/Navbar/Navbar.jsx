import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/shop">Club Shop</Link>
      <Link to="/fixtures">Fixtures and Results</Link>
      <Link to="/players">Players</Link>
      <Link to="/history">History</Link>
    </nav>
  );
};

export default Navbar;
