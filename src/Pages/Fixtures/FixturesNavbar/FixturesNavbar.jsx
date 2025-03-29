import "./FixturesNavbar.css";
import { Link } from "react-router-dom";

const FixturesNavbar = () => {
  return (
    <nav className="fixtures-navbar">
      <Link to="/fixtures/league-table">Table</Link>
      <Link to="/fixtures/fixtures">Fixtures</Link>
      <Link to="/fixtures/results">Results</Link>
    </nav>
  );
};

export default FixturesNavbar;
