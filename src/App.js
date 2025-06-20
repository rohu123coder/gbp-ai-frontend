import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function Home() {
  const [backendMsg, setBackendMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then((res) => {
        setBackendMsg(res.data.message || "API call success");
      })
      .catch((err) => {
        setBackendMsg("Backend not reachable");
      });
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
