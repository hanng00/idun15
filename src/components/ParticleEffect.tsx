import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  velocity: { x: number; y: number };
  life: number;
}

interface ParticleEffectProps {
  isActive: boolean;
  count?: number;
}

export const ParticleEffect = ({
  isActive,
  count = 20,
}: ParticleEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load the epa image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "/idun15/epa-nobg.png";
    imageRef.current = image;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 80 + 60, // Even larger particles
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          velocity: {
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.5) * 1.5,
          },
          life: 1,
        });
      }
    };

    // Wait for image to load before creating particles
    image.onload = () => {
      createParticles();
    };

    image.onerror = () => {
      // Create particles anyway with fallback
      createParticles();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position and rotation
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.rotation += particle.rotationSpeed;
        particle.life -= 0.001; // Very slow fade

        // Wrap around screen edges
        if (particle.x < -particle.size)
          particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size)
          particle.x = -particle.size;
        if (particle.y < -particle.size)
          particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size)
          particle.y = -particle.size;

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        // Draw particle
        if (
          imageRef.current &&
          imageRef.current.complete &&
          imageRef.current.naturalWidth > 0
        ) {
          ctx.save();
          ctx.globalAlpha = 1; // 100% opacity
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.drawImage(
            imageRef.current,
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
          ctx.restore();
        } else {
          // Fallback: draw a colored circle if image fails
          ctx.save();
          ctx.globalAlpha = 1; // 100% opacity
          ctx.fillStyle = "#FF6B6B";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Add new particles if needed
      if (particlesRef.current.length < count) {
        createParticles();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, count]);

  if (!isActive) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};
