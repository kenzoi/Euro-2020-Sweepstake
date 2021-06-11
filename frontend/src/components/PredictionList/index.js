import React, { useEffect, useState } from "react";
import PredictionItem from "../PredictionItem";
import {
  getMatch,
  getPredictions,
  postPredictions,
} from "../../httpClient/axios";
import "./style.css";

function PredictionList() {
  const [data, setData] = useState({});
  const [hasPrediction, setHasPrediction] = useState(false);

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const existingPredictions = await getPredictions("es1qa3SGNB", 1);
      console.log(existingPredictions);
      if (!!existingPredictions.data.length) setHasPrediction(true);
      else {
        const res = await getMatch();
        const matchWithScores = res.data.map((match) => ({
          ...match,
          homeScore: 0,
          awayScore: 0,
        }));
        const dataObj = matchWithScores.reduce((acc, curr) => {
          // eslint-disable-next-line no-sequences
          return (acc[curr.id] = curr), acc;
        }, {});
        setData(dataObj);
      }
    };
    ayncInUseEffect();
  }, []);

  // TODO: for submit, if hasPrediction PUT else POST
  const handleSubmit = () => {
    // convert object back to array
    const dataArr = Object.values(data);
    const dataToSend = dataArr.map((match) => {
      return {
        matchId: match.id,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
      };
    });
    console.log(dataToSend);
    console.log(hasPrediction);

    if (hasPrediction) {
      // PUT
      // putPredictions("es1qa3SGNB", 1, dataToSend);
    } else {
      setHasPrediction(true);
      // POST
      postPredictions("es1qa3SGNB", 1, dataToSend);
    }
  };

  return (
    <div className="prediction-list__container">
      {data ? (
        <div>
          {Object.keys(data).map((matchId) => (
            <PredictionItem
              key={data[matchId].id}
              id={data[matchId].id}
              data={data}
              setData={setData}
            />
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : null}
    </div>
  );
}

export default PredictionList;
