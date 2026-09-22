import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <>
      <h2>Admin Dashboard</h2>
      <p>Administration area</p>
      <div className="actions">
        <Link to="/admin/services">services</Link>
        <Link to="/admin/categories">categories</Link>
        <Link to="/admin/reservations">reservations</Link>
        <Link to="/admin/users">Users</Link>
      </div>
    </>
  );
}
