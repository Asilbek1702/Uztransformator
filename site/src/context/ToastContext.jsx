import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

const COLORS = {
  success: { bg: "rgba(79,143,224,0.15)", border: "rgba(79,143,224,0.5)", dot: "#4f8fe0" },
  error: { bg: "rgba(224,90,90,0.12)", border: "rgba(224,90,90,0.5)", dot: "#e05a5a" },
  info: { bg: "rgba(238,236,228,0.08)", border: "rgba(238,236,228,0.25)", dot: "#eeece4" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((message, type = "info") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 3500);
  }, [dismiss]);

  const api = {
    success: (msg) => push(msg, "success"),
    error: (msg) => push(msg, "error"),
    info: (msg) => push(msg, "info"),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 200,
        display: "flex", flexDirection: "column", gap: 10, maxWidth: 320
      }}>
        {toasts.map((t) => {
          const c = COLORS[t.type];
          return (
            <div key={t.id} role="status" aria-live="polite" onClick={() => dismiss(t.id)} style={{
              background: "#16191d", border: `1px solid ${c.border}`, backgroundImage: `linear-gradient(0deg, ${c.bg}, ${c.bg})`,
              color: "#eeece4", padding: "12px 16px", borderRadius: 10, fontSize: "0.88rem",
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              animation: "toast-in 0.25s ease"
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
              {t.message}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}