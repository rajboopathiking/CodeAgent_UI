"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomCursor from "@/components/custom-cursor"

export default function HeroSection() {
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const enterButton = () => {
    setCursorVariant("button")
    setCursorText("")
  }

  const enterImage = () => {
    setCursorVariant("image")
    setCursorText("View")
  }

  const enterLink = () => {
    setCursorVariant("link")
    setCursorText("")
  }

  const leaveInteractive = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  return (
    <>
      <CustomCursor variant={cursorVariant} text={cursorText} />

      <motion.div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale, y }}
      >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Authentic South Indian Catering
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-green-100 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the rich flavors of Tamil Nadu with our traditional catering services for weddings, religious
            ceremonies, and special occasions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-green-900 hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-glow"
              onMouseEnter={enterButton}
              onMouseLeave={leaveInteractive}
            >
              <Link href="/booking">
                Book Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
              onMouseEnter={enterButton}
              onMouseLeave={leaveInteractive}
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
