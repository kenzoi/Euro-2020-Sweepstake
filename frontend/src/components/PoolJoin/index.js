import "./style.css";

function PoolJoin({ submitHandler, changeHandler, value }) {
  return (
    <div className="pool-join__container">
      <div>Join Pool</div>
      <form id="join" onSubmit={submitHandler}>
        <input
          name="pool"
          className="pool-join__input"
          type="text"
          placeholder="Enter pool code here..."
          onChange={changeHandler}
          value={value}
        ></input>
      </form>
      <button type="submit" form="join" value="Submit">
        Submit
      </button>
    </div>
  );
}

export default PoolJoin;
