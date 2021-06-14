import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar__container">
      <Link className="navbar__item" to="/">
        Home
      </Link>
      {/* TODO: investigate other ways to connect after dynamic user ids
      <Link className="navbar__item" to="/profile">
      Profile
      </Link> */}
    </nav>
  );
}

export default Navbar;
