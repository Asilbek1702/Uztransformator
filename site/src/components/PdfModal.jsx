export default function PdfModal({ url, onClose }) {
  if (!url) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#16191d", width: "100%", maxWidth: 900, height: "88vh",
        border: "1px solid rgba(238,236,228,0.15)", display: "flex", flexDirection: "column"
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid rgba(238,236,228,0.3)",
            color: "#eeece4", padding: "6px 14px", cursor: "pointer", fontSize: "0.85rem"
          }}>✕</button>
        </div>
        <iframe title="pdf" src={url} style={{ flex: 1, width: "100%", border: "none", background: "#fff" }} />
      </div>
    </div>
  );
}
