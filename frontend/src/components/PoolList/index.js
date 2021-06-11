import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Leaderboard from "../Leaderboard";
import Prediction from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  let { path, url } = useRouteMatch();

  const pools = data
    ? data.map((pool) => (
        <div className="pool-list__item" key={pool.id}>
          <div>{pool.name}</div>
          <Link to={`${url}/prediction/${pool.nanoId}`}>Prediction</Link>
          <Link to={`${url}/leaderboard/${pool.nanoId}`}>Leaderboard</Link>
          <Switch>
            <Route path={`${path}/:poolId`}>
              <Prediction />
            </Route>
            <Route path={`${path}/:poolId`}>
              <Leaderboard />
            </Route>
          </Switch>
        </div>
      ))
    : null;

  return <div className="pool-list__container">{pools}</div>;
}

export default PoolList;
