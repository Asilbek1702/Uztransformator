import { useEffect, useState } from "react";
import { ChevronsUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      style={{
        position: "fixed", bottom: 28, left: 28, zIndex: 30,
        width: 46, height: 46, borderRadius: "50%", cursor: "pointer",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(6px)", color: "#eeece4",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
        animation: "back-to-top-in 0.2s ease"
      }}
    >
      <ChevronsUp size={20} />
      <style>{`
        @keyframes back-to-top-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </button>
  );
}