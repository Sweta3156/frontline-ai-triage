import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    try {
      setError("");
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <Form
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        onSubmit={handleLogin}
        submitLabel="Login"
        error={error}
      />
    </div>
  );
};

export default Login;
