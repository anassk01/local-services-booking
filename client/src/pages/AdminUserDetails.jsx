import { useState, useEffect } from "react";
import { getUserById } from "../services/getUserById";
import { useParams } from "react-router-dom";
function AdminUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function GetUserById() {
      try {
        const result = await getUserById(id);
        setUser(result);
      } catch {
        setError("cannot get user details");
      } finally {
        setLoading(false);
      }
    }
    GetUserById();
  }, [id]);

  return (
    <>
      {loading ? (
        <div>loading ... </div>
      ) : error ? (
        <div>{error}</div>
      ) : Object.values(user).length > 0 ? (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
        </div>
      ) : (
        <div>cannot retrieve user details </div>
      )}
    </>
  );
}

export default AdminUserDetails;
