import { useEffect, useRef } from "react";

export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, stars = [], raf, t = 0;
    const LINK_DIST = 110;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const count = Math.round((w * h) / 3000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 1.1 + Math.random() * 2.2,
        bright: Math.random() < 0.18,
        linkable: Math.random() < 0.35
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      t += 0.016;
      const grad = ctx.createRadialGradient(w / 2, h * 0.3, 0, w / 2, h * 0.3, Math.max(w, h) * 0.8);
      grad.addColorStop(0, "#0d1224");
      grad.addColorStop(1, "#04050a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const linkables = stars.filter((s) => s.linkable);
      for (let i = 0; i < linkables.length; i++) {
        for (let j = i + 1; j < linkables.length; j++) {
          const a = linkables[i], b = linkables[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          ctx.strokeStyle = `rgba(140,180,255,${(0.16 * (1 - dist / LINK_DIST)).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const s of stars) {
        const twinkle = 0.5 + Math.sin(t * s.speed + s.phase) * 0.5;
        const pulse = Math.pow(twinkle, 1.6);
        const opacity = Math.min(1, 0.22 + pulse * 1.0);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + pulse * 0.6, 0, Math.PI * 2);
        if (s.bright) {
          ctx.shadowColor = "rgba(170,205,255,0.95)";
          ctx.shadowBlur = 4 + pulse * 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(2)})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}
