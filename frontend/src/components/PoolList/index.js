import React, { useEffect, useState } from "react";
import { getPools } from "../../httpClient/axios";
import "./style.css";

function PoolList() {
  const [data, setData] = useState();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const res = await getPools(1);
      setData(res.data.pools);
    };
    ayncInUseEffect();
  }, []);

  const pools = data
    ? data.map((pool) => (
        <div className="pool__list" key={pool.id}>
          <div>{pool.nanoId}</div>
          {/* <div>Owner: {JSON.stringify(pool.user_pool.owner)}</div> */}
        </div>
      ))
    : null;

  return <div className="pool__container">{pools}</div>;
}

export default PoolList;
