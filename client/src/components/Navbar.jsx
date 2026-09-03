import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <div>{user.name}</div>
          <Link to="/profile">profile</Link>

          <Link to="/" onClick={logout}>
            logout
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
