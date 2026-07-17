import { useEffect } from "react";

export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5300);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0d0f11", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeOut 0.6s ease 3.7s forwards"
    }}>
      <style>{`
        @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 1; }
          46% { opacity: 0.3; }
          47% { opacity: 1; }
          72% { opacity: 1; }
          73% { opacity: 0.2; }
          74% { opacity: 1; }
        }
        @keyframes riseFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <svg width="280" height="140" viewBox="0 0 280 140">
        <polyline
          points="10,70 70,70 90,20 120,120 150,20 180,120 200,70 270,70"
          fill="none" stroke="#4f8fe0" strokeWidth="2.5"
          strokeDasharray="600" strokeDashoffset="600"
          style={{ animation: "drawLine 1.3s ease forwards" }}
        />
      </svg>
      <div style={{
        position: "absolute", bottom: "32%", fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
        fontSize: "1.4rem", letterSpacing: "0.12em", color: "#eeece4",
        whiteSpace: "nowrap", transform: "skewX(-10deg)",
        opacity: 0, animation: "riseFade 0.5s ease 1.1s forwards"
      }}>
        UZTRANSFORMATOR
      </div>
    </div>
  );
}
