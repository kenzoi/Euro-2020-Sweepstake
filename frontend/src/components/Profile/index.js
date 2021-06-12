import React, { useEffect, useState } from "react";
import PoolJoin from "../PoolJoin";
import PoolList from "../PoolList";
import PoolNew from "../PoolNew";
import { getPools, postPools } from "../../httpClient/axios";
import "./style.css";

function Profile() {
  const [data, setData] = useState();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      // TODO: dynamically pass the user
      const res = await getPools(1);
      setData(res.data.pools);
    };
    ayncInUseEffect();
  }, []);

  const submitHandler = async () => {
    const res = await postPools(1);
    setData(res.data.pools);
  };

  return (
    <div className="profile__container">
      <div>Profile Page</div>
      <PoolJoin />
      <PoolNew submitHandler={submitHandler} />
      <PoolList data={data} />
    </div>
  );
}

export default Profile;
