"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion"
import { Award, DollarSign, Sparkles, Zap, ChefHat, Heart, Star, Coffee, Utensils, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HorizontalInfiniteScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Award-Winning Chefs",
      description: "Our culinary team has won multiple accolades for their authentic South Indian cuisine.",
      color: "from-green-600 to-green-700",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "float",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-white" />,
      title: "Premium Quality, Affordable Prices",
      description:
        "We believe exceptional food shouldn't break the bank. Our efficient operations allow us to offer elite catering services at competitive prices.",
      color: "from-green-700 to-green-800",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "pulse",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-white" />,
      title: "Customized Menus",
      description: "We tailor our offerings to match your event's unique requirements and preferences.",
      color: "from-green-800 to-green-900",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "bounce",
    },
    {
      icon: <Zap className="h-10 w-10 text-white" />,
      title: "Efficient Service",
      description: "Our streamlined processes ensure timely delivery and setup without compromising on quality.",
      color: "from-green-600 to-green-700",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "float",
    },
    {
      icon: <ChefHat className="h-10 w-10 text-white" />,
      title: "Traditional Techniques",
      description: "We preserve authentic cooking methods passed down through generations for genuine flavors.",
      color: "from-green-700 to-green-800",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "pulse",
    },
    {
      icon: <Heart className="h-10 w-10 text-white" />,
      title: "Made with Love",
      description: "Every dish is prepared with passion and care, just like in a South Indian family kitchen.",
      color: "from-green-800 to-green-900",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "bounce",
    },
    {
      icon: <Star className="h-10 w-10 text-white" />,
      title: "Five-Star Experience",
      description: "Enjoy a luxury dining experience with our premium catering services.",
      color: "from-green-600 to-green-700",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "float",
    },
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      title: "Authentic Filter Coffee",
      description: "Experience the rich aroma and taste of traditional South Indian filter coffee.",
      color: "from-green-700 to-green-800",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "pulse",
    },
    {
      icon: <Utensils className="h-10 w-10 text-white" />,
      title: "Diverse Menu Options",
      description: "From vegetarian to non-vegetarian, we offer a wide range of South Indian delicacies.",
      color: "from-green-800 to-green-900",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "bounce",
    },
    {
      icon: <Clock className="h-10 w-10 text-white" />,
      title: "Punctual Delivery",
      description: "We value your time and ensure that our services are delivered right on schedule.",
      color: "from-green-600 to-green-700",
      video: "/placeholder.svg?height=400&width=400", // This would be a video URL in production
      videoFallback: "/placeholder.svg?height=400&width=400",
      animation: "float",
    },
  ]

  // Duplicate the features array for infinite scrolling effect
  const allFeatures = [...features, ...features]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const getAnimation = (type: string) => {
    switch (type) {
      case "float":
        return {
          y: [0, -10, 0],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
          },
        }
      case "pulse":
        return {
          scale: [1, 1.05, 1],
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
          },
        }
      case "bounce":
        return {
          y: [0, -5, 0],
          transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeOut",
          },
        }
      default:
        return {
          y: [0, -10, 0],
          transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
          },
        }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[500px] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full bg-green-200/20 blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-green-300/10 blur-xl"
        animate={{
          x: [0, -120, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full bg-green-400/10 blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-16 h-16 rounded-full bg-green-500/10 blur-xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Single row of features - automatic infinite scroll */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <motion.div
          className="flex gap-8 items-center"
          animate={{
            x: [0, "-100%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 60, // Slower scroll for more features
            ease: "linear",
          }}
        >
          {allFeatures.map((feature, index) => (
            <motion.div
              key={`auto-${index}`}
              className="w-[500px] h-[400px] flex-shrink-0 rounded-3xl overflow-hidden perspective-1000"
              variants={itemVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              style={{
                boxShadow: "0 20px 40px -10px rgba(22, 101, 52, 0.25)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className={`relative bg-gradient-to-br ${feature.color} p-10 h-full flex flex-col z-10`}>
                {/* Video background with overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-800/90 z-10" />
                  <video
                    className="w-full h-full object-cover scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={feature.videoFallback}
                  >
                    <source src={feature.video} type="video/mp4" />
                  </video>
                </div>

                <motion.div
                  className="bg-white/10 p-4 rounded-2xl inline-flex mb-6 backdrop-blur-sm relative z-20"
                  animate={getAnimation(feature.animation)}
                >
                  {feature.icon}
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-white mb-4 relative z-20 font-sans tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  className="text-green-100 mb-6 flex-grow relative z-20 font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {feature.description}
                </motion.p>

                <motion.div className="mt-auto relative z-20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="bg-white text-green-900 hover:bg-white/90 rounded-full shadow-glow-light w-full font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <a href="#services">Learn More</a>
                  </Button>
                </motion.div>

                {/* Animated particles */}
                <motion.div
                  className="absolute top-10 right-10 w-6 h-6 rounded-full bg-white/10 z-10"
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-20 left-10 w-4 h-4 rounded-full bg-white/10 z-10"
                  animate={{
                    y: [0, 30, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.3 + 1,
                  }}
                />

                {/* Additional animated elements */}
                <motion.div
                  className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-white/20 z-10"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-white/15 z-10"
                  animate={{
                    x: [0, -15, 0],
                    y: [0, 10, 0],
                    opacity: [0.1, 0.5, 0.1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.15 + 0.5,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
