import "./style.css";

function PoolNew({ submitHandler }) {
  return (
    <div className="pool-new__container">
      <button onClick={submitHandler}>Add New Pool</button>
    </div>
  );
}

export default PoolNew;
