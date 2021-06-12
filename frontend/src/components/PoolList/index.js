import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PredictionList from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  const { path, url } = useRouteMatch();

  const pools = data
    ? data.map((pool) => (
        <Link to={`${url}/prediction/${pool.nanoId}`}>
          <div className="pool-list__item" key={pool.id}>
            {pool.nanoId}
          </div>
        </Link>
      ))
    : null;

  return (
    <div>
      <div className="pool-list__container">
        <div className="pool-list__header">
          <span>Active Pools</span>
        </div>
        {pools}
      </div>
      <Switch>
        <Route path={`${path}/prediction/:pool`} component={PredictionList} />
      </Switch>
    </div>
  );
}

export default PoolList;
