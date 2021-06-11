import React, { useEffect, useState } from "react";
import moment from "moment";
import getMatch from "../../httpClient/axios";
import "./style.css";

function Prediction() {
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
    <div className="prediction__container">
      {data
        ? data.map((match) => (
            <div key={match.id}>
              {moment(match.kickoff).format("LLLL")}
              <div className="prediction__teams">
                <div>{match.homeTeam.name}</div>
                <div>{match.awayTeam.name}</div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Prediction;
