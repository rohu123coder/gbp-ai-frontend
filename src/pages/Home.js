// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// For future: Use env variable if you want to change URLs easily
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://gbp-ai-backend.onrender.com";

export default function Home() {
  const [backendMsg, setBackendMsg] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("https://gbp-ai-backend.onrender.com/")
      .then((res) => {
        setBackendMsg(res.data.message || "API call success");
      })
      .catch(() => {
        setBackendMsg("Backend not reachable");
      });
    // If using env variable:
    // axios.get(`${BACKEND_URL}/`)
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://gbp-ai-backend.onrender.com/api/auth/google";
    // Or, if using env:
    // window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>GBP AI Frontend</h1>
      <p>
        <strong>Backend says:</strong> {backendMsg}
      </p>
      <button
        style={{
          padding: "14px 30px",
          fontSize: "18px",
          borderRadius: "5px",
          background: "#4285F4",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: "24px"
        }}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
}
