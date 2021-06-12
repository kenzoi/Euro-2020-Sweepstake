import "./style.css";

function PoolNew({ createPoolHandler }) {
  return (
    <div className="pool-new__container">
      <button onClick={createPoolHandler}>Add New Pool</button>
    </div>
  );
}

export default PoolNew;
