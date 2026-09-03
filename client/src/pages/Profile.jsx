import { useContext } from "react";
import AuthContext from "../context/AuthContext";
function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
    </>
  );
}

export default Profile;
