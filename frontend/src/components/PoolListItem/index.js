import { Link, useRouteMatch } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import "./style.css";

function PoolListItem({ data, selected, setSelected }) {
  const { url } = useRouteMatch();

  const handleListItemClick = (_e, id) => setSelected(id);

  return (
    <div>
      {data
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
        : null}
    </div>
  );
}

export default PoolListItem;
