import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/services">services</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <div>{user.name}</div>
          <Link to="/profile">profile</Link>
          <Link to="/reservations">my reservations</Link>
          <Link to="/" onClick={logout}>
            logout
          </Link>
          {user.role === "admin" && <Link to="/admin">admin Dashboard</Link>}
        </>
      )}
    </nav>
  );
}

export default Navbar;
