"use client";

import { useEffect, useRef, useState } from "react";

export default function CrappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const WIDTH = 384;
    const HEIGHT = 640;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let start = false;

    const bird = {
      x: 80,
      y: HEIGHT / 2,
      radius: 15,
      velocity: 0,
      gravity: 0.08,
      jump: -5,
    };

    function handleInput(e: KeyboardEvent | MouseEvent) {
      if (e instanceof KeyboardEvent && e.code !== "Space") return;
      if (!start) {
        start = true;
        setStarted(true);
      }
      bird.velocity = bird.jump;
    }

    function handleClick(e: MouseEvent) {
      handleInput(e);
    }

    window.addEventListener("keydown", handleInput);
    canvas.addEventListener("click", handleClick);

    function gameLoop() {
      if (!ctx) return;
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (start) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y - bird.radius < 0) {
          die();
        }

        if (bird.y + bird.radius > HEIGHT) {
          die();
        }
      }

      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(gameLoop);
    }

    function die() {
      start = false;
      setStarted(false);
      bird.x = 80;
      bird.y = HEIGHT/2;
    }

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleInput);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <canvas
        ref={canvasRef}
        className="border-4 border-zinc-700 w-96 h-160 bg-blue-400 cursor-pointer"
      />
      <span>Use Spacebar or click to jump</span>
    </div>
  );
}