// import Leaderboard from "../Leaderboard";
// import Prediction from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  const pools = data
    ? data.map((pool) => (
        <div className="pool-list__item" key={pool.id}>
          <div>{pool.nanoId}</div>
          {/* <Prediction /> */}
          {/* <Leaderboard /> */}
        </div>
      ))
    : null;

  return <div className="pool-list__container">{pools}</div>;
}

export default PoolList;
