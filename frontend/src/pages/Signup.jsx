import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (values) => {
    try {
      setError("");
      await signup(values.name, values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <Form
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        onSubmit={handleSignup}
        submitLabel="Signup"
        error={error}
      />
    </div>
  );
};

export default Signup;
