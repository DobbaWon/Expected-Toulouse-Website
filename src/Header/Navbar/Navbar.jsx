import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
       <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Club Shop</Link>
        </li>
        <li>
          <Link to="/fixtures">Fixtures and Results</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
