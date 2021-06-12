import "./style.css";

function PoolJoin(props) {
  console.log(props);
  return (
    <div className="pool-join__container">
      <div>Join Pool</div>
      <form id="join" onSubmit={props.submitHandler}>
        <input
          name="pool"
          className="pool-join__input"
          type="text"
          placeholder="Enter pool code here..."
          onChange={props.changeHandler}
          value={props.value}
        ></input>
      </form>
      <button type="submit" form="join" value="Submit">
        Submit
      </button>
    </div>
  );
}

export default PoolJoin;
