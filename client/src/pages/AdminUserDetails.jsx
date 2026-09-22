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
      <h2>User Details</h2>
      {loading ? (
        <div>loading ... </div>
      ) : error ? (
        <div>{error}</div>
      ) : Object.values(user).length > 0 ? (
        <div className="card">
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
        </div>
      ) : (
        <div>cannot retrieve user details </div>
      )}
    </>
  );
}

export default AdminUserDetails;
