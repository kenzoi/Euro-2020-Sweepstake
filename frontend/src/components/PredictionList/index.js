import React, { useEffect, useState } from "react";
import PredictionItem from "../PredictionItem";
import {
  getMatches,
  getPredictions,
  postPredictions,
  putPredictions,
} from "../../httpClient/axios";
import "./style.css";

function PredictionList() {
  const [data, setData] = useState({});
  const [hasPrediction, setHasPrediction] = useState(false);

  useEffect(() => {
    const ayncInUseEffect = async () => {
      const res = await getPredictions("es1qa3SGNB", 1);
      const matchData = !!res.data
        ? withPredictions(res.data.predictions)
        : await withoutPredictions();
      console.log(matchData);
      const dataObj = matchData.reduce((acc, curr) => {
        // eslint-disable-next-line no-sequences
        return (acc[curr.id] = curr), acc;
      }, {});
      setData(dataObj);
    };
    ayncInUseEffect();
  }, []);

  const withPredictions = (data) => {
    setHasPrediction(true);
    return data.map((prediction) => ({
      ...prediction.match,
      id: prediction.id,
      matchId: prediction.match.id,
      homeScore: prediction.homeScore,
      awayScore: prediction.awayScore,
    }));
  };

  const withoutPredictions = async () => {
    const { data } = await getMatches();
    return data.map((match) => ({
      ...match,
      homeScore: 0,
      awayScore: 0,
    }));
  };

  const handleSubmit = async () => {
    const dataArr = Object.values(data);
    if (hasPrediction) {
      // PUT
      const test = dataArr.map((prediction) => {
        return {
          id: prediction.id,
          matchId: prediction.matchId,
          homeScore: parseInt(prediction.homeScore),
          awayScore: parseInt(prediction.awayScore),
        };
      });
      console.log("test:", test);
      putPredictions("es1qa3SGNB", 1, test);
    } else {
      // POST
      await postPredictions(
        "es1qa3SGNB",
        1,
        dataArr.map((match) => {
          return {
            matchId: match.id,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
          };
        })
      );
      setHasPrediction(true);
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
