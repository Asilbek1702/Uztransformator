import { ShieldCheck, Wrench, Truck, Clock, BadgeCheck } from "lucide-react";
import StarField from "../components/StarField";
import { useLanguage } from "../context/LanguageContext";

// Импортируем ваши загруженные картинки из папки assets
import cardBg1 from "../assets/card-bg1.png";
import cardBg2 from "../assets/card-bg2.png";
import cardBg3 from "../assets/card-bg3.png";
import cardBg4 from "../assets/card-bg4.png";

const gradHead = (colors) => ({
  fontFamily: "'Oswald', sans-serif", fontWeight: 700,
  fontSize: "clamp(1.7rem, 7vw, 3.4rem)", lineHeight: 1.05, margin: 0,
  backgroundImage: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
});

// Партнёры завода — названия не переводим (собственные имена)
const PARTNERS = ["SQB", "Минэнерго Узбекистана", "НГМК", "АГМК", "Enter Engineering", "Uzbekneftegaz", "Bektemir tumani", "Hududiy Elektr Tarmoqlari"];

export default function About() {
  const { t } = useLanguage();

  // Массив иконок и картинок (текст берется динамически из i18n)
  const VALUES = [
    { icon: ShieldCheck, t: t("about.values.0.t"), d: t("about.values.0.d"), bgImage: cardBg1 },
    { icon: Wrench, t: t("about.values.1.t"), d: t("about.values.1.d"), bgImage: cardBg2, isMirrored: true },
    { icon: Truck, t: t("about.values.2.t"), d: t("about.values.2.d"), bgImage: cardBg3 },
    { icon: Clock, t: t("about.values.3.t"), d: t("about.values.3.d"), bgImage: cardBg4 },
  ];

  return (
    <div style={{ background: "#0a0c0e", color: "#eeece4", position: "relative", overflow: "hidden" }}>
      <StarField />

      {/* СЕКЦИЯ 1: О КОМПАНИИ */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, padding: "clamp(70px,12vw,110px) 20px 30px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("about.eyebrow")}
        </p>

        {/* Двухцветный заголовок динамически делится по разделителю " — " */}
        <h2 style={gradHead(["#ffffff", "#8a8a8a"])}>
          {t("about.heading") ? t("about.heading").split(" — ")[0] : ""}
        </h2>
        <h2 style={gradHead(["#7fb8f5", "#2c6ab8"])}>
          — {t("about.heading") ? t("about.heading").split(" — ")[1] : ""}
        </h2>

        <p style={{ display: "flex", gap: 10, marginTop: 26, maxWidth: 620, color: "#9fc3e8", lineHeight: 1.7 }}>
          <span style={{ color: "#4f8fe0" }}>✦</span>
          {t("about.intro")}
        </p>

        {/* Миссия компании */}
        <p style={{ display: "flex", gap: 10, marginTop: 18, maxWidth: 620, color: "rgba(238,236,228,0.75)", lineHeight: 1.7 }}>
          <span style={{ color: "#4f8fe0" }}>✦</span>
          {t("about.missionText")}
        </p>

        {/* Сетка фактов (числа и подписи рендерятся напрямую по индексам из translations.js) */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1,
          marginTop: 56, background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden"
        }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{ background: "#0d1014", padding: "28px 22px" }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.7rem",
                backgroundImage: "linear-gradient(180deg, #ffffff, #7fb8f5)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
              }}>
                {t(`about.facts.${index}.k`)}
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(238,236,228,0.6)", marginTop: 10, lineHeight: 1.4 }}>
                {t(`about.facts.${index}.v`)}
              </div>
            </div>
          ))}
        </div>

        <p style={{ display: "flex", gap: 10, marginTop: 40, color: "#9fc3e8", fontSize: "0.95rem" }}>
          <span style={{ color: "#4f8fe0" }}>✦</span>
          {t("about.quote")}
        </p>
      </div>

      {/* СЕКЦИЯ 2: ИСТОРИЯ (TIMELINE) */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, padding: "70px 32px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("about.pathEyebrow")}
        </p>
        <h3 style={gradHead(["#ffffff", "#8a8a8a"])}>{t("about.pathTitle")}</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "40px 48px", marginTop: 48 }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} style={{ borderLeft: "2px solid #4f8fe0", paddingLeft: 20 }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.6rem",
                backgroundImage: "linear-gradient(180deg, #7fb8f5, #2c6ab8)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                marginBottom: 6
              }}>
                {t(`about.timeline.${index}.y`)}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{t(`about.timeline.${index}.t`)}</div>
              <div style={{ color: "rgba(238,236,228,0.6)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {t(`about.timeline.${index}.d`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* СЕКЦИЯ 3: ПРИНЦИПЫ РАБОТЫ (С КАРТИНКАМИ ИЗ ДИЗАЙНА) */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, padding: "20px 32px 100px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("about.principlesEyebrow")}
        </p>
        <h3 style={gradHead(["#ffffff", "#8a8a8a"])}>{t("about.principlesTitle")}</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 40 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{
              borderRadius: 20, 
              padding: 24, 
              minHeight: 200,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "flex-end",
              position: "relative", // Важно для позиционирования фона
              overflow: "hidden"    // Чтобы отзеркаленный фон не вылезал за скругления углов
            }}>
              
              {/* ОТДЕЛЬНЫЙ БЛОК ДЛЯ ФОНА С ЭФФЕКТОМ ЗЕРКАЛА */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `linear-gradient(180deg, rgba(10, 15, 24, 0.3) 0%, rgba(10, 15, 24, 0.85) 100%), url(${v.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
                // Если у карточки стоит флаг isMirrored, зеркалим её по горизонтали
                transform: v.isMirrored ? "scaleX(-1)" : "none" 
              }} />
        
              {/* КОНТЕНТ КАРТОЧКИ (поверх фона благодаря zIndex: 1) */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, 
                  background: "rgba(79, 143, 224, 0.15)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(79, 143, 224, 0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14
                }}>
                  <v.icon size={20} color="#4f8fe0" />
                </div>
                <div style={{ fontWeight: 600, marginBottom: 6, color: "#ffffff" }}>{v.t}</div>
                <div style={{ color: "rgba(238,236,228,0.7)", fontSize: "0.88rem", lineHeight: 1.5 }}>{v.d}</div>
              </div>
        
            </div>
          ))}
        </div>
      </div>

      {/* СЕКЦИЯ 4: СЕРТИФИКАЦИЯ */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, padding: "0 32px 80px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("about.certEyebrow")}
        </p>
        <h3 style={gradHead(["#ffffff", "#8a8a8a"])}>{t("about.certTitle")}</h3>

        <div style={{
          display: "flex", gap: 16, alignItems: "flex-start", marginTop: 24,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "28px 30px", maxWidth: 700
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: "rgba(79, 143, 224, 0.15)", border: "1px solid rgba(79, 143, 224, 0.35)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <BadgeCheck size={22} color="#4f8fe0" />
          </div>
          <p style={{ margin: 0, color: "rgba(238,236,228,0.75)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            {t("about.certText")}
          </p>
        </div>
      </div>

      {/* СЕКЦИЯ 5: ПАРТНЁРЫ */}
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, padding: "0 32px 100px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("about.partnersEyebrow")}
        </p>
        <h3 style={gradHead(["#ffffff", "#8a8a8a"])}>{t("about.partnersTitle")}</h3>
        <p style={{ display: "flex", gap: 10, marginTop: 18, maxWidth: 620, color: "rgba(238,236,228,0.6)", lineHeight: 1.6, fontSize: "0.92rem" }}>
          <span style={{ color: "#4f8fe0" }}>✦</span>
          {t("about.partnersIntro")}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
          {PARTNERS.map((p) => (
            <span key={p} style={{
              padding: "10px 18px", borderRadius: 999, fontSize: "0.85rem",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(238,236,228,0.85)"
            }}>{p}</span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "0 32px 60px" }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.85rem",
          letterSpacing: "0.1em", color: "#8fc0ff", transform: "skewX(-10deg)", display: "inline-block",
          textShadow: "0 0 12px rgba(120,180,255,0.5)"
        }}>
          UZTRANSFORMATOR
        </span>
      </div>
    </div>
  );
}