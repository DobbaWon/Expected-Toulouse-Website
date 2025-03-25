import "./Navbar.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/shop" className="hover:underline">Club Shop</Link>
        </li>
        <li>
          <Link to="/fixtures" className="hover:underline">Fixtures and Results</Link>
        </li>
        <li>
          <Link to="/players" className="hover:underline">Players</Link>
        </li>
        <li>
          <Link to="/history" className="hover:underline">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
