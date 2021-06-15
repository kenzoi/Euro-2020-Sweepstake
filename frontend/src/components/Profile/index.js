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
    (async () => {
      const res = await getPools(userid);
      setData(res.data.pools);
    })();
  }, [userid]);

  const createPoolHandler = async () => {
    const res = await postCreatePool(userid);
    setData(res.data.pools);
  };

  const joinPoolSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await postJoinPool(poolText, userid);
      setData(res.data.pools);
    } catch (e) {
      console.log(e);
    }
    setPoolText("");
  };

  return (
    <div className="profile__container">
      <Typography className="profile__header" variant="h5">
        Join / Create Pool
      </Typography>
      <Box m={1}>
        <PoolJoin
          changeHandler={(e) => setPoolText(e.target.value)}
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
