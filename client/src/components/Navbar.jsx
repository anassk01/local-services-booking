import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav aria-label="Main navigation">
      <Link className="nav-home" to="/">Home</Link>
      <Link to="/services">Services</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <div>{user.name}</div>
          <Link to="/profile">Profile</Link>
          <Link to="/reservations">My reservations</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
          {user.role === "admin" && <Link to="/admin">Admin dashboard</Link>}
        </>
      )}
    </nav>
  );
}

export default Navbar;
