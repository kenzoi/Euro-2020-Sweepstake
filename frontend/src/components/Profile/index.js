import React, { useEffect, useState } from "react";
import PoolJoin from "../PoolJoin";
import PoolList from "../PoolList";
import PoolNew from "../PoolNew";
import { getPools, postCreatePool, postJoinPool } from "../../httpClient/axios";
import "./style.css";

function Profile() {
  const [data, setData] = useState();
  const [poolText, setPoolText] = useState();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      // TODO: dynamically pass the user
      const res = await getPools(1);
      setData(res.data.pools);
    };
    ayncInUseEffect();
  }, []);

  const createPoolHandler = async () => {
    // TODO: dynamically pass the user
    const res = await postCreatePool(1);
    setData(res.data.pools);
  };

  const joinPoolChangeHandler = (e) => {
    const text = e.target.value;
    setPoolText(text);
  };

  const joinPoolSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await postJoinPool(poolText, 1);
    setPoolText("");
    setData(res.data.pools);
  };

  return (
    <div className="profile__container">
      <div>Profile Page</div>
      <PoolJoin
        changeHandler={joinPoolChangeHandler}
        submitHandler={joinPoolSubmitHandler}
        value={poolText}
      />
      <PoolNew createPoolHandler={createPoolHandler} />
      <PoolList data={data} />
    </div>
  );
}

export default Profile;
