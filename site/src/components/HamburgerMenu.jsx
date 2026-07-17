import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HamburgerMenu({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const pages = [
    ["home", t("nav.home")], ["catalog", t("nav.catalog")],
    ["about", t("nav.about")], ["contacts", t("nav.contacts")]
  ].filter(([id]) => id !== page);

  return (
    <div style={{ position: "fixed", top: 20, right: 24, zIndex: 30, display: "flex", alignItems: "center", gap: 14 }}>
      <LanguageSwitcher />
      <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: "relative" }}>
        <div style={{ display: "grid", gap: 5, padding: 10, cursor: "pointer" }}>
          <span style={{ width: 26, height: 2, background: "#eeece4" }} />
          <span style={{ width: 26, height: 2, background: "#eeece4" }} />
          <span style={{ width: 26, height: 2, background: "#eeece4" }} />
        </div>
        {open && (
          <div style={{
            position: "absolute", top: "100%", right: 0, background: "#16191d",
            border: "1px solid rgba(238,236,228,0.15)", minWidth: 160, padding: 6
          }}>
            {pages.map(([id, label]) => (
              <button key={id} onClick={() => setPage(id)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                background: "transparent", border: "none", color: "#eeece4",
                fontSize: "0.88rem", cursor: "pointer"
              }}>{label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
