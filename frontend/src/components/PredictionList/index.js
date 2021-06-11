import React, { useEffect, useState } from "react";
import PredictionItem from "../PredictionItem";
import getMatch from "../../httpClient/axios";
import "./style.css";

function PredictionList() {
  const [data, setData] = useState({});

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const res = await getMatch();
      const dataObj = res.data.reduce((acc, curr) => {
        // eslint-disable-next-line no-sequences
        return (acc[curr.id] = curr), acc;
      }, {});
      setData(dataObj);
    };
    ayncInUseEffect();
  }, []);

  return (
    <div className="prediction-list__container">
      {data
        ? Object.keys(data).map((matchId) => (
            <PredictionItem key={data[matchId].id} match={data[matchId]} />
          ))
        : null}
    </div>
  );
}

export default PredictionList;
