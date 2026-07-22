import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Ошибка рендера:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", background: "#0d0f11", color: "#eeece4",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 20, padding: 24, textAlign: "center",
          fontFamily: "system-ui, sans-serif"
        }}>
          <div style={{
            fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 10vw, 5rem)",
            backgroundImage: "linear-gradient(180deg, #7fb8f5 0%, #2c6ab8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
          }}>Упс</div>
          <p style={{ color: "rgba(238,236,228,0.7)", maxWidth: 420 }}>
            Что-то пошло не так. Попробуйте обновить страницу.
          </p>
          <button onClick={() => window.location.href = "/"} style={{
            padding: "14px 28px", borderRadius: 10, background: "#4f8fe0", border: "none",
            color: "#0d0f11", fontWeight: 600, cursor: "pointer"
          }}>На главную</button>
        </div>
      );
    }
    return this.props.children;
  }
}
