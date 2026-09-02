import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user.name
      )}
    </nav>
  );
}

export default Navbar;
