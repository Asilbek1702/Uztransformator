import { useEffect, useRef, useState } from "react";

export default function ParticleDotGrid({ text = "UZTRANSFORMATOR", height = 170 }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, particles = [], raf;
    const gap = 3;

    function build() {
      W = wrap.getBoundingClientRect().width || 320;
      H = height;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.fillStyle = "#000"; octx.fillRect(0, 0, W, H);
      let fontSize = H * 0.72;
      octx.font = `800 ${fontSize}px Arial, sans-serif`;
      let tw = octx.measureText(text).width;
      if (tw > W * 0.97) {
        fontSize *= (W * 0.97) / tw;
        octx.font = `800 ${fontSize}px Arial, sans-serif`;
      }
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, W / 2, H / 2);

      const data = octx.getImageData(0, 0, W, H).data;
      const pts = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4] > 120) pts.push({ x, y });
        }
      }
      particles = pts.map((p) => ({
        tx: p.x, ty: p.y, x: p.x, y: p.y, vx: 0, vy: 0,
        r: 0.8 + Math.random() * 0.7
      }));
    }

    function step() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const dx = p.tx - p.x, dy = p.ty - p.y;
        p.vx += dx * 0.05; p.vy += dy * 0.05;
        const mdx = p.x - mouse.current.x, mdy = p.y - mouse.current.y;
        const dist = Math.hypot(mdx, mdy);
        const radius = 90;
        if (dist < radius && dist > 0.01) {
          const f = (radius - dist) / radius;
          p.vx -= (mdx / dist) * f * 3.6;
          p.vy -= (mdy / dist) * f * 3.6;
        }
        p.vx *= 0.85; p.vy *= 0.85;
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() { mouse.current = { x: -9999, y: -9999 }; }
    function onTouch(e) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
    }

    const timer = setTimeout(() => { build(); step(); }, 30);
    window.addEventListener("resize", build);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [mounted, text, height]);

  if (isMobile) {
    return (
      <div style={{
        fontFamily: "'Oswald', sans-serif", fontWeight: 800, textTransform: "uppercase",
        fontSize: "clamp(1.4rem, 8vw, 2rem)", letterSpacing: "0.04em", color: "#eeece4",
        textAlign: "center", width: "100%"
      }}>
        {text}
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={{ width: "min(88vw, 1100px)", minWidth: 300, height, filter: "drop-shadow(0 0 14px rgba(255,255,255,0.4))" }}>
      <canvas ref={ref} />
    </div>
  );
}
