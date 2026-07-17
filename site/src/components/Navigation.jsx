import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const PAGES = ["home", "catalog", "about", "contacts"];

export default function Navigation({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const items = PAGES.map((id) => [id, t(`nav.${id}`)]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        gap: 20, padding: "16px 28px",
        background: "transparent"
      }}>
        <div className="nav-desktop" style={{
          display: "flex", gap: 4, background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: 4
        }}>
          {items.map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)} style={{
              padding: "9px 18px", borderRadius: 999, border: "none", cursor: "pointer",
              fontSize: "0.88rem", fontWeight: 600,
              background: page === id ? "#4f8fe0" : "transparent",
              color: page === id ? "#0d0f11" : "#eeece4",
              transition: "all 0.2s ease"
            }}>{label}</button>
          ))}
        </div>

        <LanguageSwitcher />

        <button className="nav-mobile-btn" onClick={() => setOpen(true)} aria-label="menu" style={{
          display: "none", background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
          width: 42, height: 42, cursor: "pointer",
          alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ display: "grid", gap: 5 }}>
            <span style={{ width: 20, height: 2, background: "#eeece4" }} />
            <span style={{ width: 20, height: 2, background: "#eeece4" }} />
            <span style={{ width: 20, height: 2, background: "#eeece4" }} />
          </div>
        </button>
      </nav>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50,
          display: "flex", justifyContent: "flex-end"
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: 260, height: "100%", background: "#16191d",
            borderLeft: "1px solid rgba(255,255,255,0.1)", padding: 24,
            display: "flex", flexDirection: "column", gap: 8
          }}>
            {items.map(([id, label]) => (
              <button key={id} onClick={() => { setPage(id); setOpen(false); }} style={{
                textAlign: "left", padding: "14px 16px", borderRadius: 10,
                border: "none", cursor: "pointer", fontSize: "1rem",
                background: page === id ? "#4f8fe0" : "transparent",
                color: page === id ? "#0d0f11" : "#eeece4", fontWeight: 600
              }}>{label}</button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
