import React, { useState } from "react";

/**
 * Generic form component.
 * fields = [{ name, label, type, placeholder }]
 * onSubmit(values) is called with an object of { name: value }
 */
const Form = ({ fields, onSubmit, submitLabel = "Submit", error }) => {
  const initialState = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {fields.map((field) => (
        <div key={field.name} style={styles.group}>
          <label style={styles.label}>{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder || ""}
            value={values[field.name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      {error && <p style={styles.error}>{error}</p>}
      <button type="submit" disabled={loading} style={styles.submitBtn}>
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 },
  group: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 13, fontWeight: 600 },
  error: { color: "#e94560", fontSize: 13 },
  submitBtn: { background: "#1a1a2e", color: "#fff", padding: "10px 16px" },
};

export default Form;
