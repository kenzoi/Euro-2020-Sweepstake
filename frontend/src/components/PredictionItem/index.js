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
          <input
            name="homeScore"
            className="prediction-item__input"
            type="number"
            min="0"
            max="99"
            size="2"
            value={data[id].homeScore}
            onChange={handleUpdate}
          ></input>
          <input
            name="awayScore"
            className="prediction-item__input"
            type="number"
            min="0"
            max="99"
            size="2"
            value={data[id].awayScore}
            onChange={handleUpdate}
          ></input>
        </div>
        <div className="prediction-item__box">
          <span>{data[id].awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}

export default PredictionItem;
