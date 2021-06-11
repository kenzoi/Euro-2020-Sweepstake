// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar__container">
      <Link className="navbar__item" to="/">
        Home
      </Link>
      <Link className="navbar__item" to="/leaderboard">
        Leaderboard
      </Link>
      <Link className="navbar__item" to="/pool">
        Pool
      </Link>
      <Link className="navbar__item" to="/prediction">
        Prediction
      </Link>
      <Link className="navbar__item" to="/profile">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;
