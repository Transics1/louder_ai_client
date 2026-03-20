import { useEffect, useRef } from "react";

const SPACING = 28;
const DOT_BASE = 1.2;
const DOT_MAX = 3.5;
const RADIUS = 90;

const DotGrid = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let cols, rows;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      cols = Math.ceil(canvas.width / SPACING) + 1;
      rows = Math.ceil(canvas.height / SPACING) + 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouse.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          const dist = Math.hypot(x - mx, y - my);
          const scale = dist < RADIUS
            ? 1 + (DOT_MAX - 1) * Math.pow(1 - dist / RADIUS, 2)
            : 1;
          const opacity = dist < RADIUS
            ? 0.18 + 0.55 * Math.pow(1 - dist / RADIUS, 2)
            : 0.18;

          ctx.beginPath();
          ctx.arc(x, y, DOT_BASE * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 157, 151, ${opacity})`;
          ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default DotGrid;