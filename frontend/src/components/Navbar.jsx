import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        HackApp
      </Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.userName}>Hi, {user.name}</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "#1a1a2e",
    color: "#fff",
  },
  brand: { color: "#fff", fontWeight: "bold", fontSize: 18, textDecoration: "none" },
  links: { display: "flex", alignItems: "center", gap: 16 },
  link: { color: "#fff", textDecoration: "none" },
  userName: { fontSize: 14 },
  logoutBtn: { background: "#e94560", color: "#fff" },
};

export default Navbar;
