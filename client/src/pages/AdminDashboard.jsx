import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <>
      <div> AdminDashboard </div>
      <div>Administration area</div>
      <Link to="/admin/services">services</Link>
      <Link to="/admin/categories">categories</Link>
    </>
  );
}
