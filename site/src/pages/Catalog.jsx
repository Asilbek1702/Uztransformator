import { useState } from "react";
import { ChevronsRight } from "lucide-react";
import StarField from "../components/StarField";
import PdfModal from "../components/PdfModal";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES, getCategory, optionLabel } from "../data/categories";

export default function Catalog() {
  const { t, lang } = useLanguage();
  const { products } = useProducts();
  const [filter, setFilter] = useState("Все");
  const [selected, setSelected] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [sent, setSent] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(null);

  const shown = filter === "Все" ? products : products.filter((p) => p.category === filter);

  return (
    <div style={{ background: "#0d0f11", color: "#eeece4", padding: "90px 24px 60px", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.18em", color: "#4f8fe0", marginBottom: 14 }}>
          {t("catalog.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
          fontSize: "clamp(1.8rem, 5vw, 2.6rem)", lineHeight: 1.05, marginBottom: 28, letterSpacing: "0.01em"
        }}>
          {t("catalog.title")}
        </h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
          <button onClick={() => setFilter("Все")} style={filterPill(filter === "Все")}>
            {t("catalog.all")}
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setFilter(c.id)} style={filterPill(filter === c.id)}>
              {c.label[lang]}
            </button>
          ))}
        </div>

        {shown.length === 0 && (
          <p style={{ color: "rgba(238,236,228,0.5)" }}>{t("catalog.noProducts")}</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {shown.map((p, idx) => {
            const cat = getCategory(p.category);
            const reversed = idx % 2 === 1;
            const btnId = "req-" + p.id;
            const name = p[`name_${lang}`];

            return (
              <div key={p.id} style={{
                display: "flex",
                flexDirection: "row",
                gap: 50,
                padding: "40px 50px",
                borderRadius: "24px",
                position: "relative",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)", 
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: `
                  0 30px 60px rgba(0, 0, 0, 0.5),
                  inset 0 1px 1px rgba(255, 255, 255, 0.1)
                `,
              }}>
                <div style={{
                  flex: "1 1 50%", display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", order: reversed ? 2 : 1
                }}>
                  <div style={{
                    position: "absolute", width: "180px", height: "180px",
                    background: "radial-gradient(circle, rgba(79, 143, 224, 0.1) 0%, rgba(0,0,0,0) 70%)",
                    pointerEvents: "none"
                  }} />
                  <img src={p.image} alt={name} style={{
                    width: "100%", height: 250, objectFit: "contain", position: "relative",
                    zIndex: 1, filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.5))"
                  }} />
                </div>

                <div style={{
                  flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "center",
                  textAlign: "left", alignItems: "flex-start", order: reversed ? 1 : 2
                }}>
                  <h3 style={{
                    fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700,
                    letterSpacing: "0.03em", marginBottom: 20,
                    backgroundImage: "linear-gradient(180deg, #ffffff 30%, #a2b4c7 100%)",
                    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                  }}>
                    {name}
                  </h3>

                  <div style={{ display: "flex", gap: 32, marginBottom: 28, textAlign: "left", flexWrap: "wrap" }}>
                    {cat?.fields.map((f) => (
                      <div key={f.key}>
                        <div style={{ fontSize: "0.82rem", color: "rgba(238,236,228,0.4)", marginBottom: 6, letterSpacing: "0.05em" }}>
                          {f.label[lang]}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "1rem", color: "#eeece4" }}>
                          {f.type === "select" ? optionLabel(f, p.specs?.[f.key], lang) : p.specs?.[f.key]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button onClick={() => setSelected(p)} style={{
                      padding: "13px 24px",
                      background: "linear-gradient(90deg, rgba(141, 182, 230, 0.9) 0%, rgba(107, 163, 236, 0.9) 100%)",
                      border: "none", borderRadius: 8, color: "#0d0f11", cursor: "pointer",
                      fontSize: "0.9rem", fontWeight: 700,
                      boxShadow: "0 4px 15px rgba(79, 143, 224, 0.25)", transition: "all 0.2s ease"
                    }}>
                      {t("catalog.requestBtn")}
                    </button>

                    <button
                      onClick={() => setSelected(p)}
                      onMouseEnter={() => setHoverBtn(btnId)}
                      onMouseLeave={() => setHoverBtn(null)}
                      style={{
                        width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
                        background: hoverBtn === btnId ? "#6ba3ec" : "#4f8fe0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(79, 143, 224, 0.2)", transition: "all 0.2s ease"
                      }}
                    >
                      <ChevronsRight size={18} color="#fff" />
                    </button>

                    {p.pdf && (
                      <button onClick={() => setPdfUrl(p.pdf)} style={{
                        padding: "13px 20px", background: "transparent",
                        border: "1px solid rgba(238,236,228,0.2)", color: "#eeece4",
                        cursor: "pointer", fontSize: "0.85rem", borderRadius: 8, transition: "all 0.2s ease"
                      }}>{t("catalog.openPdf")}</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PdfModal url={pdfUrl} onClose={() => setPdfUrl(null)} />

      {selected && (
        <div onClick={() => { setSelected(null); setSent(false); }} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 40,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#16191d", padding: 28, maxWidth: 400, width: "100%",
            border: "1px solid rgba(238,236,228,0.15)", borderRadius: 16
          }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", marginBottom: 4, color: "#eeece4" }}>{t("quoteForm.title")}</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(238,236,228,0.55)", marginBottom: 18 }}>{selected[`name_${lang}`]}</p>
            {sent ? (
              <p style={{ color: "#4f8fe0", fontSize: "0.9rem" }}>{t("quoteForm.sent")}</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 10 }}>
                <input placeholder={t("quoteForm.name")} required style={inputStyle} />
                <input placeholder={t("quoteForm.phone")} required style={inputStyle} />
                <input placeholder={t("quoteForm.email")} type="email" style={inputStyle} />
                <select defaultValue={selected.category} style={inputStyle}>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label[lang]}</option>
                  ))}
                </select>
                <textarea placeholder={t("quoteForm.description")} rows={3} style={inputStyle} />
                <button style={{ padding: 12, background: "#4f8fe0", border: "none", borderRadius: 8, color: "#0d0f11", fontWeight: 600, cursor: "pointer" }}>
                  {t("quoteForm.submit")}
                </button>
                <button type="button" onClick={() => setSelected(null)} style={{
                  padding: 10, background: "transparent", border: "none", color: "rgba(238,236,228,0.5)", cursor: "pointer", fontSize: "0.85rem"
                }}>{t("quoteForm.cancel")}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const filterPill = (active) => ({
  padding: "9px 18px", fontSize: "0.85rem", cursor: "pointer", borderRadius: 8,
  border: "1px solid " + (active ? "transparent" : "rgba(238,236,228,0.25)"),
  background: active ? "#a9c6ea" : "transparent",
  color: active ? "#0d0f11" : "#eeece4", fontWeight: active ? 600 : 400,
  transition: "all 0.2s ease"
});

const inputStyle = { padding: 11, background: "#0d0f11", border: "1px solid rgba(238,236,228,0.2)", color: "#eeece4", fontFamily: "inherit", borderRadius: 8 };
