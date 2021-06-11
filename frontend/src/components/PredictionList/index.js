import React, { useEffect, useState } from "react";
import PredictionItem from "../PredictionItem";
import getMatch from "../../httpClient/axios";
import "./style.css";

function PredictionList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const res = await getMatch();
      console.log(res.data);
      setData(res.data);
    };
    ayncInUseEffect();
  }, []);

  return (
    <div className="prediction-list__container">
      {data
        ? data.map((match) => <PredictionItem key={match.id} match={match} />)
        : null}
    </div>
  );
}

export default PredictionList;
