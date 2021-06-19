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
    try {
      e.preventDefault();
      const res = await login(email);
      console.log(res);
      if (res.data !== "") setUser(res.data);
      else setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  const loginOrRedirect = user.id ? (
    <Redirect to={`/user/${user.id}`} />
  ) : (
    <div className="home__container">
      <Box m={1}>
        <Typography className="home__title" variant="h4">
          Euro2020 Sweepstake
        </Typography>
      </Box>
      <Box m={5}>
        <form id="login" noValidate onSubmit={loginHandler}>
          <TextField
            className="home__emailfield"
            name="email"
            label="email"
            id="email"
            variant="outlined"
            onChange={changeHandler}
            value={email}
            placeholder="example@mail.com"
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
      </Box>
      <Box>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/9/96/UEFA_Euro_2020_Logo.svg"
          width="85%"
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
