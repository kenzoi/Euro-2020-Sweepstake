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
      const res = await getPredictions("lud0A2jyGF", 1);
      const matchData = !!res.data
        ? withPredictions(res.data.predictions)
        : await withoutPredictions();
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
      await putPredictions(
        "lud0A2jyGF",
        1,
        dataArr.map((prediction) => {
          return {
            id: prediction.id,
            matchId: prediction.matchId,
            homeScore: parseInt(prediction.homeScore),
            awayScore: parseInt(prediction.awayScore),
          };
        })
      );
    } else {
      await postPredictions(
        "lud0A2jyGF",
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
