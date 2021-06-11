import "./style.css";

import { postPools } from "../../httpClient/axios";

function PoolNew() {
  const submitHandler = async () => {
    await postPools(1);
  };

  return (
    <div className="pool-new__container">
      <button onClick={submitHandler}>Add New Pool</button>
    </div>
  );
}

export default PoolNew;
