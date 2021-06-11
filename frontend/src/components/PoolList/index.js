import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPools } from "../../httpClient/axios";
import "./style.css";

function PoolList() {
  const [data, setData] = useState();

  useEffect(() => {
    const ayncInUseEffect = async () => {
      // TODO: dynamically pass the user
      const { data } = await getPools(1);
      setData(data.pools);
    };
    ayncInUseEffect();
  }, []);

  const pools = data
    ? data.map((pool) => (
        <div className="pool-list__item" key={pool.id}>
          <div>{pool.nanoId}</div>
          <Link to="/prediction">Prediction</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          {/* <div>Owner: {JSON.stringify(pool.user_pool.owner)}</div> */}
        </div>
      ))
    : null;

  return <div className="pool-list__container">{pools}</div>;
}

export default PoolList;
