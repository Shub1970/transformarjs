"use client";

import { useEffect, useRef } from "react";

export default function CustomCanvas() {
  const canvasref = useRef(null);
  const canvasrefa = useRef(null);
  useEffect(() => {
    const canvas = canvasref.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();
    img.src = "http://localhost:3000/canvas_create_pattern.png";
    img.onload = () => {
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 500, 500);
    };
  });
  return (
    <div>
      <canvas
        id="can"
        className="canvase"
        ref={canvasref}
        width={500}
        height={500}
      >
        current stock price: $3.15 + 0.15
      </canvas>
    </div>
  );
}
