import { useState, useEffect } from "react";
import { getAllUsers } from "../services/getAllUsers";
import { Link } from "react-router-dom";
import { deleteUser } from "../services/deleteUser";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [deleted, setDeleted] = useState({});
  async function DeleteUser(id) {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const result = await deleteUser(id);
      setDeleted(result);
    } catch (error) {
      if (error.response?.status === 400) {
        setDeleteError("cannot delete own user");
      } else if (error.response?.status === 404) {
        setDeleteError("user missing");
      } else if (error.response?.status === 409) {
        setDeleteError("user have existing reservation");
      } else {
        setDeleteError("cannot delete user");
      }
    } finally {
      setDeleteLoading(false);
      setPendingId(null);
    }
  }
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
  }, [deleted]);
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : users.length > 0 ? (
        <div>
          {users.map((item) => {
            return (
              <div key={item._id}>
                <div>{item.name}</div>
                <div>{item.email}</div>
                <div>{item.role}</div>
                <Link to={`/admin/users/${item._id}`}>details</Link>
                <button
                  disabled={deleteLoading}
                  onClick={() => {
                    DeleteUser(item._id);
                    setPendingId(item._id);
                  }}
                >
                  delete
                </button>
                {item._id === pendingId && <div>pending ... </div>}
              </div>
            );
          })}
          {deleteLoading ? (
            <div>Loading...</div>
          ) : deleteError ? (
            <div>{deleteError}</div>
          ) : Object.values(deleted).length > 0 ? (
            <div> user deleted</div>
          ) : null}
        </div>
      ) : (
        <div>no users found</div>
      )}
    </>
  );
}

export default AdminUsers;
