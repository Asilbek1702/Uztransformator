import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES, getCategory } from "../data/categories";
import LanguageSwitcher from "../components/LanguageSwitcher";

function emptySpecs(category) {
  const specs = {};
  category.fields.forEach((f) => { specs[f.key] = f.type === "select" ? f.options[0].value : ""; });
  return specs;
}

function emptyForm() {
  return {
    category: CATEGORIES[0].id,
    sourceLang: "ru",
    name: { ru: "", uz: "", en: "" },
    image: "",
    pdf: "",
    specs: emptySpecs(CATEGORIES[0]),
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Бесплатный перевод через Google (без ключа, без бэкенда)
async function translateText(text, sl, tl) {
  if (!text.trim()) return "";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0].map((chunk) => chunk[0]).join("");
}

export default function AdminPanel({ onLogout }) {
  const { t, lang } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [showForm, setShowForm] = useState(false);
  const [translating, setTranslating] = useState(false);

  function startAdd() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(p) {
    setForm({
      category: p.category,
      sourceLang: "ru",
      name: { ru: p.name_ru, uz: p.name_uz, en: p.name_en },
      image: p.image,
      pdf: p.pdf,
      specs: { ...p.specs },
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function autoTranslate() {
    const src = form.sourceLang;
    const text = form.name[src];
    if (!text.trim()) return;
    setTranslating(true);
    const targets = ["ru", "uz", "en"].filter((l) => l !== src);
    try {
      const results = await Promise.all(targets.map((tl) => translateText(text, src, tl)));
      setForm((f) => {
        const next = { ...f.name, [src]: text };
        targets.forEach((tl, i) => { next[tl] = results[i]; });
        return { ...f, name: next };
      });
    } catch (err) {
      console.error("Ошибка автоперевода:", err);
    }
    setTranslating(false);
  }

  function save(e) {
    e.preventDefault();
    const payload = {
      category: form.category,
      name_ru: form.name.ru,
      name_uz: form.name.uz,
      name_en: form.name.en,
      image: form.image,
      pdf: form.pdf,
      specs: form.specs,
    };
    if (editingId) updateProduct(editingId, payload);
    else addProduct(payload);
    setShowForm(false);
  }

  function remove(id) {
    if (window.confirm(t("admin.confirmDelete"))) deleteProduct(id);
  }

  const cat = getCategory(form.category);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f11", color: "#eeece4", padding: "40px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem" }}>{t("admin.panelTitle")}</h2>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <LanguageSwitcher />
          <a href="/" style={{ color: "#4f8fe0", fontSize: "0.85rem" }}>{t("admin.backToSite")}</a>
          <button onClick={onLogout} style={{
            background: "transparent", border: "1px solid rgba(238,236,228,0.3)",
            color: "#eeece4", padding: "8px 14px", cursor: "pointer", fontSize: "0.85rem"
          }}>{t("admin.logout")}</button>
        </div>
      </div>

      {!showForm && (
        <button onClick={startAdd} style={{
          padding: "12px 20px", background: "#4f8fe0", border: "none",
          color: "#0d0f11", fontWeight: 600, cursor: "pointer", marginBottom: 28
        }}>{t("admin.addProduct")}</button>
      )}

      {showForm && (
        <form onSubmit={save} style={{
          display: "grid", gap: 12, maxWidth: 460, background: "#16191d",
          padding: 24, border: "1px solid rgba(238,236,228,0.15)", marginBottom: 32
        }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem" }}>
            {editingId ? t("admin.editProduct") : t("admin.addProduct")}
          </h3>

          <label style={labelStyle}>{t("admin.category")}</label>
          <select value={form.category} onChange={(e) => {
            const nc = getCategory(e.target.value);
            setForm((f) => ({ ...f, category: e.target.value, specs: emptySpecs(nc) }));
          }} style={inputStyle}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label[lang]}</option>)}
          </select>

          <div style={{
            display: "flex", gap: 10, alignItems: "center", background: "#0d0f11",
            border: "1px solid rgba(79,143,224,0.3)", borderRadius: 8, padding: "10px 12px"
          }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(238,236,228,0.6)" }}>{t("admin.sourceLang")}</span>
            <select value={form.sourceLang} onChange={(e) => setForm((f) => ({ ...f, sourceLang: e.target.value }))} style={{ ...inputStyle, padding: 6, width: 90 }}>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
              <option value="en">EN</option>
            </select>
            <button type="button" onClick={autoTranslate} disabled={translating} style={{
              marginLeft: "auto", padding: "8px 14px", background: "#4f8fe0", border: "none",
              borderRadius: 6, color: "#0d0f11", fontWeight: 600, cursor: translating ? "default" : "pointer",
              fontSize: "0.8rem", opacity: translating ? 0.6 : 1
            }}>{translating ? "…" : t("admin.autoTranslate")}</button>
          </div>

          <label style={labelStyle}>{t("admin.nameRu")}</label>
          <input value={form.name.ru} onChange={(e) => setForm((f) => ({ ...f, name: { ...f.name, ru: e.target.value } }))} required style={inputStyle} />
          <label style={labelStyle}>{t("admin.nameUz")}</label>
          <input value={form.name.uz} onChange={(e) => setForm((f) => ({ ...f, name: { ...f.name, uz: e.target.value } }))} required style={inputStyle} />
          <label style={labelStyle}>{t("admin.nameEn")}</label>
          <input value={form.name.en} onChange={(e) => setForm((f) => ({ ...f, name: { ...f.name, en: e.target.value } }))} required style={inputStyle} />

          {cat.fields.map((f) => (
            <div key={f.key}>
              <label style={labelStyle}>{f.label[lang]}</label>
              {f.type === "select" ? (
                <select value={form.specs[f.key] || ""} onChange={(e) => setForm((s) => ({ ...s, specs: { ...s.specs, [f.key]: e.target.value } }))} style={inputStyle}>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label[lang]}</option>)}
                </select>
              ) : (
                <input value={form.specs[f.key] || ""} onChange={(e) => setForm((s) => ({ ...s, specs: { ...s.specs, [f.key]: e.target.value } }))} required style={inputStyle} />
              )}
            </div>
          ))}

          <label style={labelStyle}>{t("admin.image")}</label>
          <input type="file" accept="image/*" onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const dataUrl = await fileToDataUrl(file);
              setForm((f) => ({ ...f, image: dataUrl }));
            }
          }} style={inputStyle} />
          {form.image && <img src={form.image} alt="" style={{ height: 80, objectFit: "contain" }} />}

          <label style={labelStyle}>{t("admin.pdfFile")}</label>
          <input type="file" accept="application/pdf" onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const dataUrl = await fileToDataUrl(file);
              setForm((f) => ({ ...f, pdf: dataUrl }));
            }
          }} style={inputStyle} />
          {form.pdf && <span style={{ fontSize: "0.8rem", color: "#4f8fe0" }}>PDF ✓</span>}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button style={{ padding: 12, background: "#4f8fe0", border: "none", color: "#0d0f11", fontWeight: 600, cursor: "pointer", flex: 1 }}>
              {t("admin.save")}
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{
              padding: 12, background: "transparent", border: "1px solid rgba(238,236,228,0.3)", color: "#eeece4", cursor: "pointer", flex: 1
            }}>{t("admin.cancel")}</button>
          </div>
        </form>
      )}

      <div style={{ display: "grid", gap: 1, maxWidth: 700 }}>
        {products.map((p) => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
            borderTop: "1px solid rgba(238,236,228,0.12)"
          }}>
            <img src={p.image} alt="" style={{ width: 56, height: 56, objectFit: "contain", background: "#16191d" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{p.name_ru}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(238,236,228,0.5)" }}>{getCategory(p.category)?.label[lang]}</div>
            </div>
            <button onClick={() => startEdit(p)} style={{
              background: "transparent", border: "1px solid rgba(238,236,228,0.3)", color: "#eeece4",
              padding: "8px 12px", cursor: "pointer", fontSize: "0.8rem"
            }}>{t("admin.editProduct")}</button>
            <button onClick={() => remove(p.id)} style={{
              background: "transparent", border: "1px solid #e05a5a", color: "#e05a5a",
              padding: "8px 12px", cursor: "pointer", fontSize: "0.8rem"
            }}>{t("admin.delete")}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: 11, background: "#0d0f11", border: "1px solid rgba(238,236,228,0.2)", color: "#eeece4", fontFamily: "inherit" };
const labelStyle = { fontSize: "0.78rem", color: "rgba(238,236,228,0.6)" };
