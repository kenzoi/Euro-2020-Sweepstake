import { useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Leaderboard from "../Leaderboard";
import PredictionList from "../PredictionList";
import "./style.css";

function PoolList({ data }) {
  const { path, url } = useRouteMatch();
  const [selected, setSelected] = useState();

  const handleListItemClick = (e, id) => setSelected(id);

  const pools = data
    ? data.map((pool) => (
        <Link to={`${url}/prediction/${pool.nanoId}`} key={pool.id}>
          <ListItem
            button
            selected={selected === pool.nanoId}
            onClick={(e) => handleListItemClick(e, pool.nanoId)}
            key={pool.id}
          >
            <ListItemText primary={pool.nanoId} key={pool.id} />
          </ListItem>
        </Link>
      ))
    : null;

  return (
    <div>
      <div className="pool-list__container">
        <Typography className="pool-list__header" variant="h5">
          Active Pools
        </Typography>
        <List className="pool-list__item" component="nav">
          {pools}
        </List>
        <Leaderboard pool={selected} />
      </div>
      <Switch>
        <Route path={`${path}/prediction/:pool`} component={PredictionList} />
      </Switch>
    </div>
  );
}

export default PoolList;
