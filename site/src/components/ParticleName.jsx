import { useEffect, useRef, useState } from "react";

export default function ParticleName() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = ref.current;
    if (!canvas) return;

    // ИСПРАВЛЕНИЕ 1: Убираем предупреждение из консоли и ускоряем чтение пикселей в разы!
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const wrap = canvas.parentElement;
    
    let W = wrap ? wrap.getBoundingClientRect().width : 900;
    let H = window.innerWidth < 600 ? 140 : 220;
    let particles = [];
    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const SHEAR = 0.15; 
    const gapSetting = 4; 

    function buildParticles() {
      if (!W || W === 0) {
        W = window.innerWidth > 1200 ? 1200 : window.innerWidth - 32;
      }

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      
      // ИСПРАВЛЕНИЕ 2: Для виртуального холста тоже включаем willReadFrequently
      const octx = off.getContext("2d", { willReadFrequently: true });
      
      // ИСПРАВЛЕНИЕ 3: Делаем жесткую подложку, чтобы пиксели считывались со 100% надежностью
      octx.fillStyle = "#000000";
      octx.fillRect(0, 0, W, H);

      const text = "UZTRANSFORMATOR"; 
      let fontSize = Math.min(W / 9.5, H * 0.65); 
      
      function setFont(size) {
        octx.font = `900 ${size}px "Arial Black", Impact, sans-serif`;
        if ("letterSpacing" in octx) {
          octx.letterSpacing = `${-size * 0.02}px`;
        }
      }

      setFont(fontSize);
      const baseWidth = octx.measureText(text).width;
      const extraFromShear = Math.abs(SHEAR) * fontSize;
      const maxAllowed = W * 0.95;
      const totalWidth = baseWidth + extraFromShear;
      
      if (totalWidth > maxAllowed && totalWidth > 0) {
        fontSize = fontSize * (maxAllowed / totalWidth);
        setFont(fontSize);
      }

      octx.save();
      octx.translate(W / 2, H / 2);
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#ffffff"; // Текст белый на черном фоне холста-черновика
      octx.transform(1, 0, -SHEAR, 1, 0, 0);
      octx.fillText(text, 0, 0);
      octx.restore();

      const data = octx.getImageData(0, 0, W, H).data;
      const pts = [];
      
      for (let y = 0; y < H; y += gapSetting) {
        for (let x = 0; x < W; x += gapSetting) {
          const idx = (y * W + x) * 4;
          // Так как фон черный (#000), а текст белый (#fff), мы проверяем красный канал (R > 100)
          if (data[idx] > 100) {
            pts.push({ x: x, y: y });
          }
        }
      }

      particles = pts.map(p => ({
        tx: p.x, ty: p.y,
        x: p.x, y: p.y,
        vx: 0, vy: 0,
        r: 1.2 + Math.random() * 1.0,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.2,
        shade: Math.random()
      }));

      burst();
    }

    function burst() {
      const cx = W / 2, cy = H / 2;
      particles.forEach(p => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 140;
        const fromCenter = Math.atan2(p.ty - cy, p.tx - cx);
        const mixAngle = fromCenter * 0.55 + angle * 0.45;
        const speed = 6 + Math.random() * 10;
        p.x = p.tx + Math.cos(mixAngle) * dist;
        p.y = p.ty + Math.sin(mixAngle) * dist;
        p.vx = Math.cos(mixAngle) * speed;
        p.vy = Math.sin(mixAngle) * speed;
        p.spinSpeed = (Math.random() - 0.5) * 0.5;
      });
    }

    function resize() {
      const rect = wrap ? wrap.getBoundingClientRect() : { width: window.innerWidth };
      W = rect.width || window.innerWidth;
      H = window.innerWidth < 600 ? 140 : 220; 

      canvas.style.width = "100%";
      canvas.style.height = H + "px";
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildParticles();
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      if (particles.length === 0) {
        buildParticles();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.04;
        p.vy += dy * 0.04;

        const mdx = p.x - mouse.current.x;
        const mdy = p.y - mouse.current.y;
        const dist = Math.hypot(mdx, mdy);
        const radius = 70; 

        if (dist < radius && dist > 0.01) {
          const force = (radius - dist) / radius;
          p.vx += (mdx / dist) * force * 5.0;
          p.vy += (mdy / dist) * force * 5.0;
          p.spinSpeed += (Math.random() - 0.5) * 0.05;
        }

        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
        p.spin += p.spinSpeed; p.spinSpeed *= 0.95;

        const speedMag = Math.hypot(p.vx, p.vy);
        const s = Math.max(0.9, p.r + Math.min(speedMag * 0.15, 1.5));
        const lightness = 75 + p.shade * 10 + Math.min(speedMag * 1.5, 20);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.fillStyle = `hsla(195, 100%, ${lightness}%, 0.95)`;
        ctx.fillRect(-s, -s, s * 2, s * 2);
        ctx.restore();
      }

      raf = requestAnimationFrame(step);
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouch, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);
    canvas.addEventListener("click", burst);
    window.addEventListener("resize", resize);

    const timer = setTimeout(() => {
      resize();
      step();
    }, 60);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouch);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
      canvas.removeEventListener("click", burst);
      window.removeEventListener("resize", resize);
    };
  }, [isMounted]);

  if (!isMounted) return <div style={{ width: "100%", height: 220 }} />;

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10, minHeight: "140px" }}>
      <canvas ref={ref} style={{ display: "block", cursor: "pointer", background: "transparent" }} />
    </div>
  );
}
