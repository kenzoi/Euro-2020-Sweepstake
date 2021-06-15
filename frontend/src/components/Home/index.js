import { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { login } from "../../httpClient/axios";
import "./style.css";

function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await login(e.target.email.value);
    if (res.data !== "") setUser(res.data);
    else setEmail("");
  };

  const loginOrRedirect = user.id ? (
    <Redirect to={`/profile/${user.id}`} />
  ) : (
    <div className="home__container">
      <div>
        <Typography variant="h5">Login</Typography>
        <form id="login" noValidate autoComplete="off" onSubmit={loginHandler}>
          <TextField
            className="home__emailfield"
            name="email"
            label="Email"
            variant="outlined"
            onChange={changeHandler}
            value={email}
          />
        </form>
        <Box m={1}>
          <Button
            type="submit"
            form="login"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Box>
      </div>
      <Box m={1} mt={5}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/9/96/UEFA_Euro_2020_Logo.svg"
          width="50%"
          alt="EUFA Euro 2020 Logo"
        />
        <div>
          <a
            href="//en.wikipedia.org/wiki/File:UEFA_Euro_2020_Logo.svg"
            title="Fair use of copyrighted material in the context of UEFA Euro 2020"
          >
            <Typography variant="caption">
              By The logo is from the UEFA.,{" "}
            </Typography>
          </a>
          <a href="https://en.wikipedia.org/w/index.php?curid=51705124">
            <Typography variant="caption">Fair use</Typography>
          </a>
        </div>
      </Box>
    </div>
  );

  return <div className="home__container">{loginOrRedirect}</div>;
}

export default Home;
