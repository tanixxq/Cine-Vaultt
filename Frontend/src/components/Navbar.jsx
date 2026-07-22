import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <h1>CineVault</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist" className="watchlist-btn-nav">❤️ Watchlist</Link></li>

        {user ? (
          <li>
            <button 
              onClick={logout}
              className="login-btn-nav"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="login-btn-nav">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;