import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar__container">
      <Link className="navbar__item" to="/">
        <Typography variant="subtitle1">Home</Typography>
      </Link>
      {/* TODO: investigate other ways to connect after dynamic user ids
      <Link className="navbar__item" to="/profile">
      Profile
      </Link> */}
    </nav>
  );
}

export default Navbar;
