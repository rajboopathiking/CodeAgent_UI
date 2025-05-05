"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  variant: string
  text?: string
}

export default function CustomCursor({ variant, text }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(22, 101, 52, 0.2)",
      mixBlendMode: "normal" as const,
      color: "rgba(255, 255, 255, 0)",
      fontSize: "0px",
    },
    button: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      height: 50,
      width: 50,
      backgroundColor: "rgba(22, 101, 52, 0.4)",
      mixBlendMode: "normal" as const,
      color: "rgba(255, 255, 255, 0)",
      fontSize: "0px",
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(22, 101, 52, 0.3)",
      mixBlendMode: "normal" as const,
      color: "rgba(255, 255, 255, 0)",
      fontSize: "0px",
    },
    image: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(22, 101, 52, 0.5)",
      mixBlendMode: "normal" as const,
      color: "rgba(255, 255, 255, 1)",
      fontSize: "14px",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center font-medium"
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {text}
    </motion.div>
  )
}
