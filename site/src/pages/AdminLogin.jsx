import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../supabaseClient";

export default function AdminLogin({ onSuccess }) {
  const { t } = useLanguage();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(false);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: user,
        password: pass,
      });
      if (authError || !data.session) {
        throw authError;
      }
      localStorage.setItem("uztrans_token", data.session.access_token);
      onSuccess();
    } catch {
      console.error("Login error:", err);
      setError(true);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0f11", color: "#eeece4",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24
    }}>
      <form onSubmit={submit} style={{
        width: "100%", maxWidth: 340, display: "grid", gap: 14,
        background: "#16191d", padding: 32, border: "1px solid rgba(238,236,228,0.15)"
      }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", marginBottom: 8 }}>{t("admin.loginTitle")}</h2>
        <input placeholder={t("admin.username")} value={user} onChange={(e) => setUser(e.target.value)} style={inputStyle} />
        <input placeholder={t("admin.password")} type="password" value={pass} onChange={(e) => setPass(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: "#e05a5a", fontSize: "0.85rem" }}>{t("admin.wrong")}</p>}
        <button style={{ padding: 12, background: "#4f8fe0", border: "none", color: "#0d0f11", fontWeight: 600, cursor: "pointer" }}>
          {t("admin.enter")}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { padding: 12, background: "#0d0f11", border: "1px solid rgba(238,236,228,0.2)", color: "#eeece4", fontFamily: "inherit" };
