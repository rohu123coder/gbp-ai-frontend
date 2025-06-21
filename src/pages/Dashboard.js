// src/pages/Home.js
import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://gbp-ai-backend.onrender.com";

export default function Home() {
  const [backendMsg, setBackendMsg] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  // OAuth success wali screen
  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/`)
      .then((res) => setBackendMsg(res.data.message || "API call success"))
      .catch(() => setBackendMsg("Backend not reachable"));
  }, []);

  // GBP Location fetch function
  const fetchLocations = async () => {
    try {
      setError("");
      const res = await axios.get(`${BACKEND_URL}/api/gbp/locations`, { withCredentials: true });
      setLocations(res.data.accounts || []); // or res.data if direct
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>GBP AI Frontend</h1>
      <p>
        <strong>Backend says:</strong> {backendMsg}
      </p>
      <button
        style={{ padding: "14px 30px", fontSize: "18px", borderRadius: "5px", background: "#4285F4", color: "#fff", border: "none", cursor: "pointer", marginTop: "24px" }}
        onClick={() => (window.location.href = `${BACKEND_URL}/api/auth/google`)}
      >
        Sign in with Google
      </button>
      <hr style={{ margin: "40px 0" }} />
      <button
        onClick={fetchLocations}
        style={{ padding: "12px 28px", fontSize: "16px", background: "#222", color: "#fff", border: "none", borderRadius: "4px" }}
      >
        Fetch My GBP Locations
      </button>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      {locations.length > 0 && (
        <div style={{ marginTop: 28, textAlign: "left", maxWidth: 500, margin: "28px auto" }}>
          <h3>Your GBP Accounts:</h3>
          <ul>
            {locations.map((loc, i) => (
              <li key={loc.name || i}>
                <b>{loc.accountName}</b> <br />
                <small>{loc.name}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
