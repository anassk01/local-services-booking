import { useState } from "react";
import { registerUser } from "../services/registerUser";
function Register() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [data, setData] = useState();
  const [error, setError] = useState("");
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setError(undefined);
    setData(undefined);
    try {
      const results = await registerUser(values);
      setData(results);
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
        <div> {data?.user?.name}</div>
        <div> {data?.user?.email}</div>
      </div>
    </>
  );
}

export default Register;
