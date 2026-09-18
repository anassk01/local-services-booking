import { useState, useEffect } from "react";
import { getAllUsers } from "../services/getAllUsers";
import { Link } from "react-router-dom";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function GetAllUsers() {
      try {
        const result = await getAllUsers();
        setUsers(result);
      } catch {
        setError("cannot retrieve users");
      } finally {
        setLoading(false);
      }
    }
    GetAllUsers();
  }, []);
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : users.length > 0 ? (
        users.map((item) => {
          return (
            <div key={item._id}>
              <div>{item.name}</div>
              <div>{item.email}</div>
              <div>{item.role}</div>
              <Link to={`/admin/users/${item._id}`}>details</Link>
            </div>
          );
        })
      ) : (
        <div>no users found</div>
      )}
    </>
  );
}

export default AdminUsers;
