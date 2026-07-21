import { useLanguage } from "../context/LanguageContext";
import StarField from "../components/StarField";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div style={{
      minHeight: "100vh", background: "#0d0f11", color: "#eeece4", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
    }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 24 }}>
        <div style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(4rem, 14vw, 8rem)",
          lineHeight: 1, backgroundImage: "linear-gradient(180deg, #7fb8f5 0%, #2c6ab8 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
        }}>404</div>
        <p style={{ fontSize: "1.05rem", color: "rgba(238,236,228,0.7)", margin: "16px 0 32px" }}>
          {t("notFound.text")}
        </p>
        <a href="/" style={{
          display: "inline-block", padding: "14px 28px", borderRadius: 10,
          background: "#4f8fe0", color: "#0d0f11", fontWeight: 600, textDecoration: "none"
        }}>{t("notFound.backHome")}</a>
      </div>
    </div>
  );
}
