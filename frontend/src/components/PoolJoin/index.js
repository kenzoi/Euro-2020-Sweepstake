import "./style.css";

function PoolJoin({ submitHandler, changeHandler, value }) {
  return (
    <div className="pool-join__container">
      <form id="join" onSubmit={submitHandler}>
        <input
          name="pool"
          className="pool-join__input"
          type="text"
          placeholder="Enter pool code here..."
          onChange={changeHandler}
          value={value}
        ></input>
        <button type="submit" form="join" value="Submit">
          Join Pool
        </button>
      </form>
    </div>
  );
}

export default PoolJoin;
