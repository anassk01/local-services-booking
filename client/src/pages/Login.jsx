import { useState } from "react";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setValues((values) => ({ ...values, [name]: value }));
  }
  function onSubmit(event) {
    event.preventDefault();
  }

  return (
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
  );
}

export default Login;
