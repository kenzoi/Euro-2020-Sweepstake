import { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { login } from "../../httpClient/axios";
import "./style.css";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    // TODO: set a global user state...
    login(e.target.email.value);
    setLoggedIn(true);
    setEmail("");
  };

  const loginOrRedirect = loggedIn ? (
    <Redirect to="/profile" />
  ) : (
    <div>
      <Typography>Login</Typography>
      <form id="login" noValidate autoComplete="off" onSubmit={loginHandler}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={changeHandler}
          value={email}
        />
      </form>
      <Button
        type="submit"
        form="login"
        value="Submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </div>
  );

  return <div className="home__container">{loginOrRedirect}</div>;
}

export default Home;
