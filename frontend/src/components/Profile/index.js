import React, { useEffect, useState } from "react";
import PoolList from "../PoolList";
import PoolNew from "../PoolNew";
import { getPools, postPools } from "../../httpClient/axios";
import "./style.css";

function Profile() {
  const [data, setData] = useState();
  // TODO: Find better solution to rerender when new pool is created
  const [render, setRender] = useState();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      // TODO: dynamically pass the user
      const res = await getPools(1);
      setData(res.data.pools);
    };
    ayncInUseEffect();
  }, [render]);

  console.log(render);

  const submitHandler = async () => {
    await postPools(1);
    setRender({});
  };

  return (
    <div className="profile__container">
      <div>Profile Page</div>
      <PoolList data={data} />
      <PoolNew submitHandler={submitHandler} />
    </div>
  );
}

export default Profile;
