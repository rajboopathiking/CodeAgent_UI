"use client"

import { motion } from "framer-motion"

interface ScrollProgressProps {
  progress: any // Using any for the spring animation value
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-50" style={{ scaleX: progress }} />
  )
}
