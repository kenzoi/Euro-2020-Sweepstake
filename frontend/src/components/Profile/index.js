import PoolList from "../PoolList";
import PoolNew from "../PoolNew";
import "./style.css";

function Profile() {
  return (
    <div className="profile__container">
      <div>Profile Page</div>
      <PoolList />
      <PoolNew />
    </div>
  );
}

export default Profile;
