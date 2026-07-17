import { User, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FloatingContacts({ page, setPage }) {
  const { t } = useLanguage();
  const [hover, setHover] = useState(false);
  if (page === "contacts") return null;

  return (
    <button
      onClick={() => setPage("contacts")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 30, cursor: "pointer",
        background: hover ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
        border: "1px solid " + (hover ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)"),
        backdropFilter: "blur(6px)",
        borderRadius: 999, color: "#eeece4",
        fontSize: "0.9rem", fontWeight: 500, padding: "8px 16px 8px 8px",
        display: "flex", alignItems: "center", gap: 8,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover ? "0 10px 26px rgba(0,0,0,0.35)" : "0 4px 14px rgba(0,0,0,0.25)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease"
      }}
    >
      <span style={{
        width: 26, height: 26, borderRadius: "50%", background: "#eeece4",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <User size={15} color="#0d0f11" />
      </span>
      {t("nav.contacts")}
      <ChevronsRight size={16} />
    </button>
  );
}
