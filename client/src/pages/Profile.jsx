import { useContext } from "react";
import AuthContext from "../context/AuthContext";
function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h2>User Details</h2>
      <div className="card">
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
      </div>
    </>
  );
}

export default Profile;
