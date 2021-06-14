import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { List, Typography } from "@material-ui/core";
import Leaderboard from "../Leaderboard";
import PredictionList from "../PredictionList";
import "./style.css";
import PoolListItem from "../PoolListItem";

function PoolList({ data }) {
  const [selected, setSelected] = useState();

  const { path } = useRouteMatch();

  return (
    <div>
      <div className="pool-list__container">
        <Typography className="pool-list__header" variant="h5">
          Active Pools
        </Typography>
        <List className="pool-list__item" component="nav">
          <PoolListItem
            data={data}
            selected={selected}
            setSelected={setSelected}
          />
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
