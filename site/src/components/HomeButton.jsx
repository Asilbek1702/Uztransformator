import { useState } from "react";

export default function HomeButton({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: "#eeece4", border: "none", borderRadius: 10,
      color: "#0d0f11", padding: "16px 34px", fontSize: "0.92rem", fontWeight: 600,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      cursor: "pointer", width: 240,
      boxShadow: hover ? "0 0 0 3px #4f8fe0, 0 0 22px 4px rgba(79,143,224,0.7)" : "none",
      transition: "box-shadow 0.2s ease"
    }}>
      {children}
    </button>
  );
}
