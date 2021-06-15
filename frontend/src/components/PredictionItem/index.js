import { TextField, Typography } from "@material-ui/core";
import moment from "moment";
import "./style.css";

function PredictionItem({ id, data, setData }) {
  const handleUpdate = (e) => {
    setData({
      ...data,
      [id]: {
        ...data[id],
        [e.target.name]: e.target.value,
      },
    });
  };

  const afterKickoff = moment() > moment(data[id].kickoff);

  return (
    <div className="prediction-item__container">
      <Typography className="prediction-item__date" variant="subtitle1">
        {moment(data[id].kickoff).format("LLLL")}
      </Typography>
      <div className="prediction-item__box-container">
        <Typography className="prediction-item__box" variant="body1">
          <span>{data[id].homeTeam.name}</span>
        </Typography>
        <div className="prediction-item__box">
          <TextField
            disabled={afterKickoff}
            id="homeScore-number"
            name="homeScore"
            label="Home"
            size="small"
            type="number"
            style={{ width: 75 }}
            variant="outlined"
            value={data[id].homeScore}
            onChange={handleUpdate}
          />
          <TextField
            disabled={afterKickoff}
            id="awayScore-number"
            name="awayScore"
            label="Away"
            size="small"
            type="number"
            style={{ width: 75 }}
            variant="outlined"
            value={data[id].awayScore}
            onChange={handleUpdate}
          />
        </div>
        <Typography className="prediction-item__box" variant="body1">
          <span>{data[id].awayTeam.name}</span>
        </Typography>
      </div>
    </div>
  );
}

export default PredictionItem;
