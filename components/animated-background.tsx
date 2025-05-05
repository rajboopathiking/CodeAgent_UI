"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  variant?: "default" | "bubbles" | "particles" | "waves"
  color?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  className?: string
}

export default function AnimatedBackground({
  variant = "default",
  color = "green",
  density = "medium",
  speed = "medium",
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get color values based on the color prop
  const getColorValues = () => {
    switch (color) {
      case "green":
        return {
          primary: "rgba(22, 101, 52, 0.2)",
          secondary: "rgba(22, 101, 52, 0.1)",
          tertiary: "rgba(22, 101, 52, 0.05)",
        }
      case "blue":
        return {
          primary: "rgba(30, 64, 175, 0.2)",
          secondary: "rgba(30, 64, 175, 0.1)",
          tertiary: "rgba(30, 64, 175, 0.05)",
        }
      case "amber":
        return {
          primary: "rgba(180, 83, 9, 0.2)",
          secondary: "rgba(180, 83, 9, 0.1)",
          tertiary: "rgba(180, 83, 9, 0.05)",
        }
      default:
        return {
          primary: "rgba(22, 101, 52, 0.2)",
          secondary: "rgba(22, 101, 52, 0.1)",
          tertiary: "rgba(22, 101, 52, 0.05)",
        }
    }
  }

  // Get particle count based on density
  const getParticleCount = () => {
    switch (density) {
      case "low":
        return 30
      case "medium":
        return 60
      case "high":
        return 100
      default:
        return 60
    }
  }

  // Get animation speed based on speed prop
  const getAnimationSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.5
      case "medium":
        return 1
      case "fast":
        return 2
      default:
        return 1
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Get colors and settings
    const colors = getColorValues()
    const particleCount = getParticleCount()
    const speedMultiplier = getAnimationSpeed()

    // Create particles based on variant
    const particles: any[] = []

    if (variant === "default" || variant === "particles") {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
          speedX: (Math.random() - 0.5) * speedMultiplier,
          speedY: (Math.random() - 0.5) * speedMultiplier,
        })
      }
    } else if (variant === "bubbles") {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 15 + 5,
          color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
          speedX: 0,
          speedY: -Math.random() * speedMultiplier - 0.2,
          alpha: Math.random() * 0.6 + 0.1,
        })
      }
    } else if (variant === "waves") {
      // For waves, we'll use a different approach
      const waveCount = particleCount / 10
      for (let i = 0; i < waveCount; i++) {
        particles.push({
          amplitude: Math.random() * 20 + 5,
          wavelength: Math.random() * 100 + 50,
          speed: Math.random() * 0.02 * speedMultiplier + 0.01,
          phase: Math.random() * Math.PI * 2,
          color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
          thickness: Math.random() * 2 + 1,
          y: canvas.height * (0.3 + Math.random() * 0.4), // Position in middle 40% of canvas
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (variant === "default" || variant === "particles") {
        // Draw and update particles
        particles.forEach((particle) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()

          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0
        })
      } else if (variant === "bubbles") {
        // Draw and update bubbles
        particles.forEach((bubble, index) => {
          ctx.beginPath()
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
          ctx.fillStyle = bubble.color.replace(")", `, ${bubble.alpha})`)
          ctx.fill()

          // Update position
          bubble.y += bubble.speedY

          // Reset if off screen
          if (bubble.y + bubble.radius < 0) {
            bubble.y = canvas.height + bubble.radius
            bubble.x = Math.random() * canvas.width
            bubble.radius = Math.random() * 15 + 5
            bubble.alpha = Math.random() * 0.6 + 0.1
          }
        })
      } else if (variant === "waves") {
        // Draw waves
        particles.forEach((wave) => {
          ctx.beginPath()

          for (let x = 0; x < canvas.width; x += 5) {
            const y = wave.y + Math.sin(x / wave.wavelength + wave.phase) * wave.amplitude

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.strokeStyle = wave.color
          ctx.lineWidth = wave.thickness
          ctx.stroke()

          // Update phase for animation
          wave.phase += wave.speed
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [variant, color, density, speed])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
