import { Link } from "react-router-dom";
// import { Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import "./style.css";
// import Home from "../Home";

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
