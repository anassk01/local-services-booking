import { useState } from "react";
function Register() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
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
  );
}

export default Register;
