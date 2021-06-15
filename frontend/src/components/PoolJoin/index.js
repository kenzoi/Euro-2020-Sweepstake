import { Button, Box, TextField } from "@material-ui/core";
import "./style.css";

function PoolJoin({ submitHandler, changeHandler, value }) {
  return (
    <Box m={2}>
      <form id="join" noValidate autoComplete="off" onSubmit={submitHandler}>
        <div className="pool-join__fields">
          <TextField
            id="poolId"
            label="Invite code"
            variant="outlined"
            type="text"
            size="small"
            value={value}
            onChange={changeHandler}
            className="pool-join__textfield"
          />
        </div>
        <div className="pool-join__fields">
          <Button
            type="submit"
            form="join"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Join Existing Pool
          </Button>
        </div>
      </form>
    </Box>
  );
}
export default PoolJoin;
