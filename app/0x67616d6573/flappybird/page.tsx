"use client";

import { useEffect, useRef, useState } from "react";

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game constants
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 600;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Bird properties
    const bird = {
      x: 80,
      y: CANVAS_HEIGHT / 2,
      radius: 15,
      velocity: 0,
      gravity: 0.5,
      jump: -8,
    };

    // Pipe properties
    const pipes: Array<{ x: number; topHeight: number; bottomY: number; passed: boolean }> = [];
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 150;
    const PIPE_SPEED = 2;
    let frameCount = 0;

    let localScore = 0;
    let isGameOver = false;
    let isStarted = false;

    const resetGame = () => {
      bird.y = CANVAS_HEIGHT / 2;
      bird.velocity = 0;
      pipes.length = 0;
      frameCount = 0;
      localScore = 0;
      isGameOver = false;
      isStarted = false;
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
    };

    const handleJump = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.code !== "Space") return;
      
      if (!isStarted) {
        isStarted = true;
        setGameStarted(true);
      }
      
      if (!isGameOver) {
        bird.velocity = bird.jump;
      } else {
        resetGame();
      }
    };

    const handleClick = (e: MouseEvent) => {
      handleJump(e);
    };

    // Add event listeners
    window.addEventListener("keydown", handleJump);
    canvas.addEventListener("click", handleClick);

    // Game loop
    const gameLoop = () => {
      // Clear canvas with light blue background
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (!isStarted) {
        // Draw bird
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw start message
        ctx.fillStyle = "#000";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Click or Press SPACE to Start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);

        requestAnimationFrame(gameLoop);
        return;
      }

      if (!isGameOver) {
        // Update bird
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Generate pipes
        if (frameCount % 90 === 0) {
          const minHeight = 50;
          const maxHeight = CANVAS_HEIGHT - PIPE_GAP - 50;
          const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
          pipes.push({
            x: CANVAS_WIDTH,
            topHeight: topHeight,
            bottomY: topHeight + PIPE_GAP,
            passed: false,
          });
        }

        // Update pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
          pipes[i].x -= PIPE_SPEED;

          // Remove off-screen pipes
          if (pipes[i].x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
            continue;
          }

          // Check if bird passed pipe
          if (!pipes[i].passed && pipes[i].x + PIPE_WIDTH < bird.x) {
            pipes[i].passed = true;
            localScore++;
            setScore(localScore);
          }

          // Collision detection
          const birdLeft = bird.x - bird.radius;
          const birdRight = bird.x + bird.radius;
          const birdTop = bird.y - bird.radius;
          const birdBottom = bird.y + bird.radius;

          const pipeLeft = pipes[i].x;
          const pipeRight = pipes[i].x + PIPE_WIDTH;

          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            if (birdTop < pipes[i].topHeight || birdBottom > pipes[i].bottomY) {
              isGameOver = true;
              setGameOver(true);
            }
          }
        }

        // Check ground and ceiling collision
        if (bird.y + bird.radius > CANVAS_HEIGHT || bird.y - bird.radius < 0) {
          isGameOver = true;
          setGameOver(true);
        }

        frameCount++;
      }

      // Draw pipes (green)
      ctx.fillStyle = "#00AA00";
      for (const pipe of pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY);
      }

      // Draw bird (yellow)
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw score
      ctx.fillStyle = "#000";
      ctx.font = "32px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${localScore}`, 10, 40);

      // Draw game over message
      if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, CANVAS_HEIGHT / 2 - 80, CANVAS_WIDTH, 160);
        
        ctx.fillStyle = "#FFF";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
        
        ctx.font = "24px Arial";
        ctx.fillText(`Final Score: ${localScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
        ctx.fillText("Click or Press SPACE to Restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleJump);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Flappy Bird</h1>
      <div className="mb-4 text-xl">
        {!gameStarted && !gameOver && "Press SPACE or Click to Start"}
        {gameStarted && !gameOver && `Score: ${score}`}
        {gameOver && `Game Over! Final Score: ${score}`}
      </div>
      <canvas
        ref={canvasRef}
        className="border-4 border-gray-800 rounded-lg shadow-2xl cursor-pointer"
      />
      <div className="mt-4 text-center text-gray-600">
        <p>Press SPACE or Click to jump</p>
        <p>Avoid the green pipes!</p>
      </div>
    </div>
  );
}