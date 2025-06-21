// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [backendMsg, setBackendMsg] = useState("");

  useEffect(() => {
    // LIVE backend URL
    axios.get("https://gbp-ai-backend.onrender.com/")
      .then((res) => {
        setBackendMsg(res.data.message || "API call success");
      })
      .catch(() => {
        setBackendMsg("Backend not reachable");
      });
  }, []);

  const handleGoogleLogin = () => {
    // LIVE backend URL for Google OAuth
    window.location.href = "https://gbp-ai-backend.onrender.com/api/auth/google";
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
