"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Play, Pause, ChefHat, Award, Utensils, Users, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BentoItemProps {
  className?: string
  title: string
  description?: string
  icon?: React.ReactNode
  video?: string
  poster?: string
  accentColor?: string
  delay?: number
  fullWidth?: boolean
  fullHeight?: boolean
  children?: React.ReactNode
  animationType?: "fade" | "slide" | "zoom" | "rotate"
}

const BentoItem = ({
  className = "",
  title,
  description,
  icon,
  video,
  poster = "/placeholder.svg?height=600&width=800",
  accentColor = "from-green-600 to-green-700",
  delay = 0,
  fullWidth = false,
  fullHeight = false,
  children,
  animationType = "fade",
}: BentoItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const toggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVideoPlaying(!isVideoPlaying)

    const videoEl = ref.current?.querySelector("video")
    if (videoEl) {
      if (isVideoPlaying) {
        videoEl.pause()
      } else {
        videoEl.play()
      }
    }
  }

  // Different animation types
  const getInitialAnimation = () => {
    switch (animationType) {
      case "fade":
        return { opacity: 0, y: 20 }
      case "slide":
        return { opacity: 0, x: -50 }
      case "zoom":
        return { opacity: 0, scale: 0.8 }
      case "rotate":
        return { opacity: 0, rotate: -5, y: 20 }
      default:
        return { opacity: 0, y: 20 }
    }
  }

  const getAnimateValue = () => {
    switch (animationType) {
      case "fade":
        return isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      case "slide":
        return isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
      case "zoom":
        return isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
      case "rotate":
        return isInView ? { opacity: 1, rotate: 0, y: 0 } : { opacity: 0, rotate: -5, y: 20 }
      default:
        return isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl ${
        fullWidth ? "col-span-full" : fullHeight ? "row-span-2" : ""
      } ${className}`}
      initial={getInitialAnimation()}
      animate={getAnimateValue()}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-90 z-10`} />

      {video && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="w-full h-full object-cover scale-110"
              autoPlay={isVideoPlaying}
              muted
              loop
              playsInline
              poster={poster}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>

          <motion.button
            className="absolute bottom-4 right-4 z-30 bg-white/20 backdrop-blur-md p-2 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleVideo}
          >
            {isVideoPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
          </motion.button>
        </>
      )}

      <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
        {icon && (
          <motion.div
            className="bg-white/20 backdrop-blur-md p-3 rounded-xl inline-flex mb-4 w-fit"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: delay * 0.1 + 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>
        )}

        <motion.h3
          className="text-xl md:text-2xl font-bold text-white mb-2 font-serif tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
        >
          {title}
        </motion.h3>

        {description && (
          <motion.p
            className="text-white/80 text-sm md:text-base font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 + 0.4 }}
          >
            {description}
          </motion.p>
        )}

        {children}

        {/* Additional animated elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-white/10 z-10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: delay * 0.2,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-white/10 z-10"
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: delay * 0.15 + 0.5,
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated border effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 border-2 border-white/30 rounded-3xl" />
            <motion.div
              className="absolute -inset-[1px] rounded-3xl opacity-20"
              animate={{
                background: [
                  `linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)`,
                  `linear-gradient(90deg, transparent 100%, white 50%, transparent 0%)`,
                ],
                backgroundSize: "200% 100%",
                backgroundPosition: ["200% 0%", "-200% 0%"],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PremiumBentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, 100])

  const bentoItems = [
    {
      title: "Traditional Wedding Feasts",
      description: "Experience the grandeur of South Indian wedding catering with our traditional Elai Sapadu service.",
      icon: <Users className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=600&width=800", // Replace with actual video URL
      poster: "/placeholder.svg?height=600&width=800",
      accentColor: "from-green-700/90 to-green-900/90",
      fullHeight: true,
      animationType: "fade",
    },
    {
      title: "Premium Ingredients",
      description: "We source the finest ingredients to ensure authentic flavors in every dish.",
      icon: <Award className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=400&width=600", // Replace with actual video URL
      poster: "/placeholder.svg?height=400&width=600",
      accentColor: "from-green-600/90 to-green-700/90",
      animationType: "slide",
    },
    {
      title: "Expert Chefs",
      description: "Our master chefs bring decades of experience in traditional South Indian cooking.",
      icon: <ChefHat className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=400&width=600", // Replace with actual video URL
      poster: "/placeholder.svg?height=400&width=600",
      accentColor: "from-green-800/90 to-green-900/90",
      animationType: "zoom",
    },
    {
      title: "Festival Specialties",
      description: "Celebrate South Indian festivals with authentic seasonal dishes prepared according to tradition.",
      icon: <Sparkles className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=400&width=600", // Replace with actual video URL
      poster: "/placeholder.svg?height=400&width=600",
      accentColor: "from-green-700/90 to-green-800/90",
      fullWidth: true,
      animationType: "rotate",
    },
    {
      title: "Customized Menus",
      description: "Personalized menus tailored to your preferences and dietary requirements.",
      icon: <Utensils className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=400&width=600", // Replace with actual video URL
      poster: "/placeholder.svg?height=400&width=600",
      accentColor: "from-green-600/90 to-green-700/90",
      animationType: "fade",
    },
    {
      title: "Timely Service",
      description: "Punctual setup and service for a seamless event experience.",
      icon: <Clock className="h-6 w-6 text-white" />,
      video: "/placeholder.svg?height=400&width=600", // Replace with actual video URL
      poster: "/placeholder.svg?height=400&width=600",
      accentColor: "from-green-800/90 to-green-900/90",
      animationType: "slide",
    },
  ]

  return (
    <motion.div ref={containerRef} className="py-16 md:py-24" style={{ opacity, y }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium Services
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 tracking-tight">
            Premium Catering Services
          </h2>
          <p className="text-green-700 max-w-2xl mx-auto text-lg">
            Elevate your events with our exceptional South Indian culinary experiences
          </p>

          <motion.div
            className="w-24 h-1 bg-green-600 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bentoItems.map((item, index) => (
            <BentoItem
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              video={item.video}
              poster={item.poster}
              accentColor={item.accentColor}
              delay={index}
              fullWidth={item.fullWidth}
              fullHeight={item.fullHeight}
              animationType={item.animationType}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            asChild
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg rounded-full shadow-glow"
          >
            <a href="#contact">Request Custom Quote</a>
          </Button>

          {/* Animated decorative elements */}
          <motion.div
            className="w-8 h-8 rounded-full bg-green-100 absolute -mt-4 ml-4 hidden md:block"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ left: "calc(50% + 120px)" }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="w-4 h-4 rounded-full bg-green-200 absolute -mt-8 ml-4 hidden md:block"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ left: "calc(50% - 100px)" }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
