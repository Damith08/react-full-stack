import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input type="password" />
      <button
        onClick={login}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
