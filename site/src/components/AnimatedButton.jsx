import { useState } from "react";

export default function AnimatedButton({ children, onClick, variant = "light", style = {} }) {
  const [hover, setHover] = useState(false);

  const base = {
    border: "none", borderRadius: 12, fontSize: "0.95rem", fontWeight: 600,
    padding: "16px 26px", display: "flex", alignItems: "center", gap: 10,
    cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease",
    transform: hover ? "translateY(-3px)" : "translateY(0)",
  };

  const variants = {
    light: {
      background: "linear-gradient(180deg, #f7f6f2 0%, #c9d6e3 100%)",
      color: "#0d0f11",
      boxShadow: hover
        ? "0 10px 28px rgba(140,180,230,0.45)"
        : "0 4px 20px rgba(140,180,230,0.25)",
    },
    blue: {
      background: hover
        ? "linear-gradient(180deg, #6ba3ec 0%, #3a6fc4 100%)"
        : "linear-gradient(180deg, #4f8fe0 0%, #2c6ab8 100%)",
      color: "#fff",
      boxShadow: hover
        ? "0 10px 28px rgba(79,143,224,0.55)"
        : "0 4px 18px rgba(79,143,224,0.35)",
    },
    outline: {
      background: hover ? "rgba(79,143,224,0.12)" : "transparent",
      color: "#4f8fe0",
      border: "1px solid #4f8fe0",
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
