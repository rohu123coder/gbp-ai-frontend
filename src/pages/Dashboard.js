import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://gbp-ai-backend.onrender.com";

export default function Dashboard() {
  const [backendMsg, setBackendMsg] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  // 1. Save JWT token from URL to localStorage
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      // Remove token from URL for cleaner UX
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 2. Backend health check (optional)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/`)
      .then(res => setBackendMsg(res.data.message || "API call success"))
      .catch(() => setBackendMsg("Backend not reachable"));
  }, []);

  // 3. Fetch GBP Locations (with JWT in header)
  const fetchLocations = async () => {
    setError("");
    setLocations([]);
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("Not logged in!");
      return;
    }
    try {
      const res = await axios.get(`${BACKEND_URL}/api/gbp/locations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const accounts = res.data.accounts || res.data.locations || res.data || [];
      if (accounts.length === 0) setError("No GBP locations found.");
      setLocations(accounts);
    } catch (e) {
      setError(e.response?.data?.message || e.response?.data?.error || e.message);
    }
  };

  // 4. Google Login (use backend endpoint)
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
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

      <hr style={{ margin: "40px 0" }} />

      <button
        onClick={fetchLocations}
        style={{
          padding: "12px 28px",
          fontSize: "16px",
          background: "#222",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Fetch My GBP Locations
      </button>

      {error && (
        <div style={{ color: "red", marginTop: 12 }}>
          {error}
        </div>
      )}

      {locations.length > 0 && (
        <div style={{ marginTop: 28, textAlign: "left", maxWidth: 500, margin: "28px auto" }}>
          <h3>Your GBP Accounts:</h3>
          <ul>
            {locations.map((loc, i) => (
              <li key={loc.name || i}>
                <b>{loc.accountName || loc.name || "No Name"}</b>
                <br />
                <small>{loc.name}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
