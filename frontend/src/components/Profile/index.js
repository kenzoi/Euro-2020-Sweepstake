import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import PoolJoin from "../PoolJoin";
import PoolList from "../PoolList";
import { getPools, postCreatePool, postJoinPool } from "../../httpClient/axios";
import "./style.css";

function Profile() {
  const [data, setData] = useState();
  const [poolText, setPoolText] = useState();

  const { userid } = useParams();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const res = await getPools(userid);
      setData(res.data.pools);
    };
    ayncInUseEffect();
  }, [userid]);

  const createPoolHandler = async () => {
    const res = await postCreatePool(userid);
    setData(res.data.pools);
  };

  const joinPoolChangeHandler = (e) => {
    const text = e.target.value;
    setPoolText(text);
  };

  const joinPoolSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await postJoinPool(poolText, userid);
    setPoolText("");
    setData(res.data.pools);
  };

  return (
    <div className="profile__container">
      <Typography className="profile__header" variant="h4">
        Profile Page
      </Typography>
      <Box m={1}>
        <PoolJoin
          changeHandler={joinPoolChangeHandler}
          submitHandler={joinPoolSubmitHandler}
          value={poolText}
        />
      </Box>
      <Box m={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={createPoolHandler}
        >
          Add New Pool
        </Button>
      </Box>
      <PoolList data={data} />
    </div>
  );
}

export default Profile;
