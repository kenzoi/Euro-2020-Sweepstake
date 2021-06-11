import moment from "moment";
import "./style.css";

function PredictionItem({ match }) {
  return (
    <div>
      <div className="prediction-item__date">
        {moment(match.kickoff).format("LLLL")}
      </div>
      <div className="prediction-item__teams">
        <div className="prediction-item__team">{match.homeTeam.name}</div>
        <input
          name="homeTeam"
          className="prediction-item__input"
          type="number"
          min="0"
          max="99"
          size="2"
        ></input>
        <input
          name="awayTeam"
          className="prediction-item__input"
          type="number"
          min="0"
          max="99"
          size="2"
        ></input>
        <div className="prediction-item__team">{match.awayTeam.name}</div>
      </div>
    </div>
  );
}

export default PredictionItem;
