import { useState } from "react";
import { ShieldCheck, Wrench, Truck, Clock, BadgeCheck, X } from "lucide-react";
import StarField from "../components/StarField";
import { useLanguage } from "../context/LanguageContext";

// Импортируем ваши загруженные картинки из папки assets
import cardBg1 from "../assets/card-bg1.png";
import cardBg2 from "../assets/card-bg2.png";
import cardBg3 from "../assets/card-bg3.png";
import cardBg4 from "../assets/card-bg4.png";

// Логотипы партнёров (вырезаны из презентации)
import logoSqb from "../assets/partners/sqb.png";
import logoMinenergo from "../assets/partners/minenergo.png";
import logoToshkent from "../assets/partners/toshkent_t.png";
import logoNgmk from "../assets/partners/ngmk.png";
import logoAgmk from "../assets/partners/agmk.png";
import logoEnterEng from "../assets/partners/enter_eng.png";
import logoUzbekneftegaz from "../assets/partners/uzbekneftegaz.png";
import logoTuShield from "../assets/partners/tu_shield.png";
import logoBektemir from "../assets/partners/bektemir.png";
import logoHududiy from "../assets/partners/hududiy.png";

// Сертификаты / лицензия (вырезаны из презентации)
import certLicense from "../assets/certs/cert_license.jpg";
import cert1 from "../assets/certs/cert_1.jpg";
import cert2 from "../assets/certs/cert_2.jpg";

const gradHead = (colors) => ({
  fontFamily: "'Oswald', sans-serif", fontWeight: 700,
  fontSize: "clamp(1.7rem, 7vw, 3.4rem)", lineHeight: 1.05, margin: 0,
  backgroundImage: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
});

const PARTNERS = [
  { name: "SQB", logo: logoSqb },
  { name: "Минэнерго Узбекистана", logo: logoMinenergo },
  { name: "г. Ташкент", logo: logoToshkent },
  { name: "НГМК", logo: logoNgmk },
  { name: "АГМК", logo: logoAgmk },
  { name: "Enter Engineering", logo: logoEnterEng },
  { name: "Uzbekneftegaz", logo: logoUzbekneftegaz },
  { name: "ТУ", logo: logoTuShield },
  { name: "Бектемирский туман", logo: logoBektemir },
  { name: "Hududiy Elektr Tarmoqlari", logo: logoHududiy },
];

const CERT_DOCS = [
  { key: "license", img: certLicense },
  { key: "cert1", img: cert1 },
  { key: "cert2", img: cert2 },
];

export default function About() {
  const { t } = useLanguage();
  const [openDoc, setOpenDoc] = useState(null);

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
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `linear-gradient(180deg, rgba(10, 15, 24, 0.3) 0%, rgba(10, 15, 24, 0.85) 100%), url(${v.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
                transform: v.isMirrored ? "scaleX(-1)" : "none"
              }} />

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

        {/* Превью документов — кликабельные, открываются в модалке */}
        <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
          {CERT_DOCS.map((doc) => (
            <button
              key={doc.key}
              onClick={() => setOpenDoc(doc)}
              style={{
                width: 150, height: 200, padding: 0, cursor: "pointer",
                borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)",
                background: "#fff", position: "relative"
              }}
            >
              <img src={doc.img} alt={t(`about.certDocs.${doc.key}`)} style={{
                width: "100%", height: "100%", objectFit: "cover"
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 40%)",
                display: "flex", alignItems: "flex-end", padding: 10
              }}>
                <span style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 600, textAlign: "left" }}>
                  {t(`about.certDocs.${doc.key}`)}
                </span>
              </div>
            </button>
          ))}
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

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14,
          marginTop: 28
        }}>
          {PARTNERS.map((p) => (
            <div key={p.name} title={p.name} style={{
              background: "#fff", borderRadius: 16, height: 100,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}>
              <img src={p.logo} alt={p.name} style={{
                maxWidth: "100%", maxHeight: "100%", objectFit: "contain"
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* МОДАЛКА ПРОСМОТРА ДОКУМЕНТА */}
      {openDoc && (
        <div onClick={() => setOpenDoc(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 60,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#16191d", padding: 12, borderRadius: 12,
            maxWidth: "90vw", maxHeight: "90vh", position: "relative",
            border: "1px solid rgba(238,236,228,0.15)"
          }}>
            <button onClick={() => setOpenDoc(null)} aria-label="close" style={{
              position: "absolute", top: -14, right: -14, width: 32, height: 32, borderRadius: "50%",
              background: "#4f8fe0", border: "none", color: "#0d0f11", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <X size={18} />
            </button>
            <img src={openDoc.img} alt="" style={{ maxWidth: "86vw", maxHeight: "80vh", display: "block", borderRadius: 6 }} />
          </div>
        </div>
      )}

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