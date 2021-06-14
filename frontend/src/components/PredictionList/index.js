import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Snackbar, Typography } from "@material-ui/core";
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
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => setState({ ...newState, open: true });
  const handleClose = () => setState({ ...state, open: false });

  const { userid, pool } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getPredictions(pool, userid);
      const matchData = !!res.data
        ? withPredictions(res.data.predictions)
        : await withoutPredictions();
      const dataObj = matchData.reduce((acc, curr) => {
        // eslint-disable-next-line no-sequences
        return (acc[curr.id] = curr), acc;
      }, {});
      setData(dataObj);
    })();
  }, [pool, userid]);

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
    setHasPrediction(false);
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
        pool,
        userid,
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
        pool,
        userid,
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
    window.scrollTo(0, 0);
    handleClick({ vertical: "bottom", horizontal: "center" });
  };

  return (
    <div className="prediction-list__container">
      {data ? (
        <div>
          <Typography variant="h5">Predictions</Typography>
          {Object.keys(data).map((matchId) => (
            <PredictionItem
              key={data[matchId].id}
              id={data[matchId].id}
              data={data}
              setData={setData}
            />
          ))}
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Submission successful"
        key={vertical + horizontal}
      />
    </div>
  );
}

export default PredictionList;
