import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import StarField from "../components/StarField";
import { InstagramIcon, LinkedinIcon, FacebookIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

const QUOTE_EMAIL = "4b0bb1139cf12ba51b9816eb9ff90467";

const PHONES = ["+998 88 599 99 99", "+998 77 666 66 66"];
const EMAILS = ["info@uztransformator.com", "sales@uztransformator.com"];
const ADDRESS_LINE1 = "Ташкент, Бектемирский район";
const ADDRESS_LINE2 = "сход граждан Олтинтопган";
const MAP_LINK = "https://maps.app.goo.gl/5vobyWXhDA4sLWyw6";

// Если ссылки нет (href: "") — иконка покажет "скоро появится" вместо перехода
const socials = [
  { icon: Send, label: "Telegram", href: "" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/uztransformator" },
  { icon: MessageCircle, label: "WhatsApp", href: "" },
  { icon: FacebookIcon, label: "Facebook", href: "" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "" },
];

export default function Contacts() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [comingSoonMsg, setComingSoonMsg] = useState(null);

  const getFieldStyle = (id) => ({
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "16px 24px",
    borderRadius: "14px",
    border: focusedField === id ? "1px solid rgba(127, 184, 245, 0.6)" : "1px solid rgba(255, 255, 255, 0.22)",
    background: "linear-gradient(135deg, rgba(20, 26, 35, 0.45) 0%, rgba(10, 12, 16, 0.55) 100%)",
    backdropFilter: "blur(10px)",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    outline: "none",
    boxShadow: focusedField === id
      ? "0 0 15px rgba(79, 143, 224, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
      : "inset 0 1px 1px rgba(255, 255, 255, 0.08)",
    transition: "all 0.25s ease"
  });

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const payload = {
      message: form.msg.value,
      name: form.name.value,
      organization: form.org.value,
      phone: form.phone.value,
      email: form.email.value,
      _subject: "Новая заявка с сайта — Контакты",
    };
    try {
      await fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Ошибка отправки заявки:", err);
    }
    setSending(false);
    setSent(true);
  }

  function handleSocialClick(e, s) {
    if (!s.href) {
      e.preventDefault();
      setComingSoonMsg(s.label);
      setTimeout(() => setComingSoonMsg(null), 2500);
    }
  }

  return (
    <div style={{ background: "#060709", color: "#eeece4", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <StarField />

      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.75) !important;
          text-shadow: 0 0 8px rgba(79, 143, 224, 0.3);
          font-weight: 500;
        }
        .contacts-form { width: 100%; max-width: 700px; box-sizing: border-box; }
        @media (max-width: 480px) {
          .contacts-field { padding: 13px 16px !important; border-radius: 12px !important; font-size: 0.9rem !important; }
        }
      `}</style>

      <div style={{ position: "absolute", top: 32, left: 32, zIndex: 2 }}>
        <span style={{
          fontFamily: "'Oswald', sans-serif", fontSize: "0.95rem",
          letterSpacing: "0.12em", color: "#8fc0ff",
          textShadow: "0 0 12px rgba(120,180,255,0.55)"
        }}>
          UZTRANSFORMATOR
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "150px 24px 60px", boxSizing: "border-box" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 18 }}>
          {t("contacts.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
          fontSize: "clamp(2.2rem, 8vw, 4rem)", lineHeight: 1.02, margin: "0 0 40px 0", letterSpacing: "0.01em"
        }}>
            <span style={{
            display: "inline-block", marginRight: "10px",
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #a5b1c0 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("contacts.eyebrow_title_1")}
          </span>
          <span style={{
            display: "inline-block",
            backgroundImage: "linear-gradient(180deg, #7fb8f5 0%, #2c6ab8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("contacts.eyebrow_title_2")}
          </span>
        </h2>

        {sent ? (
          <p style={{ color: "#4f8fe0", fontSize: "1rem", marginTop: 40 }}>{t("contacts.sent")}</p>
        ) : (
          <form onSubmit={submitContact} className="contacts-form" style={{ display: "grid", gap: 16 }}>
            <input
              name="msg"
              className="contacts-field"
              placeholder={t("contacts.messagePlaceholder")}
              style={getFieldStyle("msg")}
              onFocus={() => setFocusedField("msg")}
              onBlur={() => setFocusedField(null)}
            />
            <input
              name="name"
              className="contacts-field"
              placeholder={t("contacts.name")}
              required
              style={getFieldStyle("name")}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
            <input
              name="org"
              className="contacts-field"
              placeholder={t("contacts.organization")}
              style={getFieldStyle("org")}
              onFocus={() => setFocusedField("org")}
              onBlur={() => setFocusedField(null)}
            />
            <input
              name="phone"
              className="contacts-field"
              placeholder={t("contacts.phone")}
              required
              style={getFieldStyle("phone")}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />
            <input
              name="email"
              className="contacts-field"
              placeholder={t("contacts.email")}
              type="email"
              style={getFieldStyle("email")}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />

            <button
              type="submit"
              disabled={sending}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 24px",
                borderRadius: "14px",
                cursor: sending ? "default" : "pointer",
                fontWeight: 600,
                maxWidth: 280,
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: hoverBtn
                  ? "linear-gradient(135deg, rgba(127, 184, 245, 0.4) 0%, rgba(44, 106, 184, 0.5) 100%)"
                  : "linear-gradient(135deg, rgba(44, 106, 184, 0.35) 0%, rgba(20, 40, 70, 0.45) 100%)",
                color: "#ffffff",
                boxShadow: hoverBtn ? "0 8px 24px rgba(79, 143, 224, 0.25)" : "none",
                transform: hoverBtn ? "translateY(-2px)" : "translateY(0)",
                opacity: sending ? 0.6 : 1,
                transition: "all 0.25s ease"
              }}
            >
              {sending ? "…" : <>{t("contacts.send")} <span>»</span></>}
            </button>
          </form>
        )}

        <h2 style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase", marginTop: 80,
          fontSize: "clamp(2.2rem, 8vw, 4rem)", lineHeight: 1.02, margin: "80px 0 24px 0", letterSpacing: "0.01em"
        }}>
          <span style={{
            display: "inline-block", marginRight: "10px",
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #a5b1c0 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("contacts.eyebrow_title_3")}
          </span>
          <span style={{
            display: "inline-block",
            backgroundImage: "linear-gradient(180deg, #7fb8f5 0%, #2c6ab8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>
            {t("contacts.eyebrow_title_4")}
          </span>
        </h2>

        <div style={{ position: "relative", display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
          {socials.map((s, i) => (
            <a key={i} href={s.href || undefined} target={s.href ? "_blank" : undefined} rel={s.href ? "noreferrer" : undefined}
              aria-label={s.label}
              onClick={(e) => handleSocialClick(e, s)}
              style={{
              width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 12, color: "#ffffff", cursor: s.href ? "pointer" : "default",
              opacity: s.href ? 1 : 0.45,
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(79, 143, 224, 0.25)";
              e.currentTarget.style.borderColor = "rgba(127, 184, 245, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}>
              <s.icon size={20} />
            </a>
          ))}

          {comingSoonMsg && (
            <div style={{
              position: "absolute", top: -38, left: 0,
              background: "#16191d", border: "1px solid rgba(79,143,224,0.4)",
              color: "#7fb8f5", fontSize: "0.8rem", padding: "6px 12px",
              borderRadius: 8, whiteSpace: "nowrap"
            }}>
              {t("contacts.comingSoon")}
            </div>
          )}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32,
          marginTop: 60, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 40
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Phone size={20} color="#4f8fe0" style={{ marginTop: 4 }} />
            <div style={{ display: "grid", gap: 6 }}>
              {PHONES.map((num, i) => (
                <a key={i} href={`tel:${num.replace(/\s/g, "")}`} style={{
                  color: "#7fb8f5", fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.02em", textDecoration: "none"
                }}>{num}</a>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, textAlign: "left" }}>
            {EMAILS.map((mail, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Mail size={16} color="#4f8fe0" />
                <a href={`mailto:${mail}`} style={{ color: "#eeece4", fontSize: "0.95rem", textDecoration: "none" }}>{mail}</a>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <MapPin size={16} color="#4f8fe0" style={{ marginTop: 3 }} />
              <a href={MAP_LINK} target="_blank" rel="noreferrer" style={{ color: "#eeece4", fontSize: "0.95rem", lineHeight: 1.5, textDecoration: "none" }}>
                {ADDRESS_LINE1}<br />{ADDRESS_LINE2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
