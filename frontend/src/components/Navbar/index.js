import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar__container">
      <Link className="navbar__item" to="/">
        <HomeIcon />
      </Link>
      {/* TODO: investigate other ways to connect after dynamic user ids
      <Link className="navbar__item" to="/profile">
      Profile
      </Link> */}
    </nav>
  );
}

export default Navbar;
