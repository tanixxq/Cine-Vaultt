import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>CineVault</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist" className="watchlist-btn-nav">❤️ Watchlist</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;