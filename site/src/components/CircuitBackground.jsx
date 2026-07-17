import { useEffect, useRef } from "react";

export default function CircuitBackground({ colors = ["255,255,255"] }) {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, nodes = [], raf, t = 0;
    const LINK_DIST = 150;
    const MOUSE_RADIUS = 220;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const count = Math.round((w * h) / 14000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.4,
        pulse: Math.random() * Math.PI * 2
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMove);

    function draw() {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DIST) continue;
          const midx = (a.x + b.x) / 2, midy = (a.y + b.y) / 2;
          const md = Math.hypot(midx - mx, midy - my);
          const base = (1 - dist / LINK_DIST) * 0.22;
          let color = `rgba(238,236,228,${base.toFixed(2)})`;
          if (md < MOUSE_RADIUS) {
            const tt = 1 - md / MOUSE_RADIUS;
            const c = colors[Math.floor(((midx + midy) / 50) % colors.length)];
            color = `rgba(${c},${Math.min(base + tt * 0.85, 1).toFixed(2)})`;
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const dist = Math.hypot(n.x - mx, n.y - my);
        const glow = 0.5 + Math.sin(t + n.pulse) * 0.3;
        let color = `rgba(238,236,228,${(0.25 + glow * 0.2).toFixed(2)})`;
        let r = n.r;
        if (dist < MOUSE_RADIUS) {
          const tt = 1 - dist / MOUSE_RADIUS;
          const c = colors[Math.floor(((n.x + n.y) / 50) % colors.length)];
          color = `rgba(${c},${Math.min(tt + 0.3, 1).toFixed(2)})`;
          r = n.r + tt * 2.5;
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />;
}
