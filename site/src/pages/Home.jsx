import { ArrowUpRight } from "lucide-react";
import StarField from "../components/StarField";
import AnimatedButton from "../components/AnimatedButton";
import ParticleDotGrid from "../components/ParticleDotGrid";
import { useLanguage } from "../context/LanguageContext";

export default function Home({ setPage }) {
  const { t } = useLanguage();
  return (
    <div style={{
      height: "100vh", position: "relative", overflow: "hidden",
      background: "#0d0f11", color: "#eeece4", fontFamily: "system-ui, sans-serif"
    }}>
      <StarField />

      <div style={{
        position: "relative", zIndex: 1, height: "100%", boxSizing: "border-box",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "70px 6vw 30px", maxWidth: 1100, margin: "0 auto",
        overflow: "hidden"
      }}>
        <ParticleDotGrid text="UZTRANSFORMATOR" height={230} />

        <h1 style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
          fontSize: "clamp(2.6rem, 7vw, 5.2rem)", lineHeight: 1.02,
          letterSpacing: "0.01em", margin: "36px 0 0"
        }}>
          <span style={{
            display: "block",
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #a8a8a8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("home.headingLine1")}
          </span>
          <span style={{
            display: "block",
            backgroundImage: "linear-gradient(180deg, #7fb8f5 0%, #2c6ab8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("home.headingLine2")}
          </span>
        </h1>

        <p style={{
          display: "flex", gap: 10, alignItems: "flex-start", marginTop: 18,
          maxWidth: 560, color: "#9fc3e8", fontSize: "1rem", lineHeight: 1.6,
          justifyContent: "center", textAlign: "center"
        }}>
          <span style={{ color: "#4f8fe0", marginTop: 2 }}>✦</span>
          {t("home.subtitle")}
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 30, flexWrap: "wrap", justifyContent: "center" }}>
          <AnimatedButton variant="light" onClick={() => setPage("catalog")}>
            {t("home.catalogBtn")}
          </AnimatedButton>
          <AnimatedButton variant="light" onClick={() => setPage("about")}>
            {t("home.aboutBtn")} 
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
