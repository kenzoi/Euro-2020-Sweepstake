import { useState } from "react";
import "./style.css";

function PoolJoin() {
  const [poolText, setPoolText] = useState();

  const changeHandler = (e) => {
    const text = e.target.value;
    setPoolText(text);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPoolText("");
  };

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
          value={poolText}
        ></input>
      </form>
      <button type="submit" form="join" value="Submit">
        Submit
      </button>
    </div>
  );
}

export default PoolJoin;
