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
    <div>
      <div className="prediction-item__date">
        {moment(data[id].kickoff).format("LLLL")}
      </div>
      <div className="prediction-item__teams">
        <div className="prediction-item__team">{data[id].homeTeam.name}</div>
        <input
          name="homeScore"
          className="prediction-item__input"
          type="number"
          min="0"
          max="99"
          size="2"
          value={data[id].homeScore || 0}
          onChange={handleUpdate}
        ></input>
        <input
          name="awayScore"
          className="prediction-item__input"
          type="number"
          min="0"
          max="99"
          size="2"
          value={data[id].awayScore || 0}
          onChange={handleUpdate}
        ></input>
        <div className="prediction-item__team">{data[id].awayTeam.name}</div>
      </div>
    </div>
  );
}

export default PredictionItem;
