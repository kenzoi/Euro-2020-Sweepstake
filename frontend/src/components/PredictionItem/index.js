import { TextField } from "@material-ui/core";
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

  return (
    <div className="prediction-item__container">
      <div className="prediction-item__date">
        {moment(data[id].kickoff).format("LLLL")}
      </div>
      <div className="prediction-item__box-container">
        <div className="prediction-item__box">
          <span>{data[id].homeTeam.name}</span>
        </div>
        <div className="prediction-item__box">
          <TextField
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
        <div className="prediction-item__box">
          <span>{data[id].awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}

export default PredictionItem;
