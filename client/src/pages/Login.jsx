import { useState } from "react";
import { login } from "../services/loginUser";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const { startSession } = useContext(AuthContext);
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const navigate = useNavigate();
  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setValues((values) => ({ ...values, [name]: value }));
  }
  async function onSubmit(event) {
    event.preventDefault();
    setError(undefined);

    try {
      const result = await login(values);
      startSession(result);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          email
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
      <div>{error}</div>
    </>
  );
}

export default Login;
