import { useState } from "react";
import { registerUser } from "../services/registerUser";
import { useNavigate } from "react-router-dom";
function Register() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setError(undefined);
    try {
      await registerUser(values);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label>
          email
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
      <div>
        <div>{error ? error : ""}</div>
      </div>
    </>
  );
}

export default Register;
