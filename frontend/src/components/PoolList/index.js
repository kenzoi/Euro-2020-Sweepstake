import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PredictionList from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  const { path, url } = useRouteMatch();

  const pools = data
    ? data.map((pool) => (
        <div className="pool-list__item" key={pool.id}>
          <div>{pool.nanoId}&nbsp;</div>
          <Link to={`${url}/prediction/${pool.nanoId}`}>Prediction</Link>
        </div>
      ))
    : null;

  return (
    <div className="pool-list__container">
      {pools}
      <Switch>
        <Route path={`${path}/prediction/:pool`}>
          <PredictionList />
        </Route>
      </Switch>
    </div>
  );
}

export default PoolList;
