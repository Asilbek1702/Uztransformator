import { useLanguage } from "../context/LanguageContext";

const LANGS = [
  { id: "ru", label: "RU" },
  { id: "uz", label: "UZ" },
  { id: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {LANGS.map((l) => (
        <button
          key={l.id}
          className="lang-btn"
          onClick={() => setLang(l.id)}
          style={{
            background: "transparent",
            border: "1px solid " + (lang === l.id ? "#4f8fe0" : "rgba(238,236,228,0.25)"),
            color: lang === l.id ? "#4f8fe0" : "#eeece4",
            fontSize: "0.9rem", padding: "8px 13px", cursor: "pointer", borderRadius: 5
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
