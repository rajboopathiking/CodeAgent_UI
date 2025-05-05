"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"

interface FoodShowcaseProps {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function FoodShowcase({ onMouseEnter, onMouseLeave }: FoodShowcaseProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const dishes = [
    {
      id: 1,
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato masala, served with sambar and chutney.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "fadeIn",
    },
    {
      id: 2,
      name: "Idli Sambar",
      description: "Steamed rice cakes served with lentil soup and coconut chutney.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "slideUp",
    },
    {
      id: 3,
      name: "Pongal",
      description: "A savory rice and lentil porridge seasoned with cumin, pepper, and ghee.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "fadeIn",
    },
    {
      id: 4,
      name: "Chettinad Chicken",
      description: "Spicy chicken curry made with a blend of aromatic spices from the Chettinad region.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "slideUp",
    },
    {
      id: 5,
      name: "Mysore Pak",
      description: "Traditional sweet made from gram flour, ghee, and sugar.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "fadeIn",
    },
    {
      id: 6,
      name: "Filter Coffee",
      description: "Strong coffee brewed with a traditional filter, mixed with hot milk and sugar.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "slideUp",
    },
    {
      id: 7,
      name: "Appam with Stew",
      description: "Lacy rice pancakes served with a coconut milk-based vegetable or meat stew.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "fadeIn",
    },
    {
      id: 8,
      name: "Biryani",
      description: "Fragrant rice dish cooked with spices and your choice of vegetables or meat.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "slideUp",
    },
    {
      id: 9,
      name: "Rasam",
      description: "Tangy and spicy soup made with tamarind juice, tomato, pepper, and other spices.",
      image: "/placeholder.svg?height=600&width=600",
      video: "/placeholder.svg?height=600&width=600", // This would be a video URL in production
      animation: "fadeIn",
    },
  ]

  const getAnimation = (type: string, index: number) => {
    const baseDelay = index * 0.1

    switch (type) {
      case "fadeIn":
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1, transition: { duration: 0.8, delay: baseDelay } } : { opacity: 0 },
        }
      case "slideUp":
        return {
          initial: { opacity: 0, y: 50 },
          animate: isInView
            ? { opacity: 1, y: 0, transition: { duration: 0.8, delay: baseDelay } }
            : { opacity: 0, y: 50 },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1, transition: { duration: 0.8, delay: baseDelay } } : { opacity: 0 },
        }
    }
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dishes.map((dish, index) => {
        const animation = getAnimation(dish.animation, index)

        return (
          <motion.div
            key={dish.id}
            layoutId={`dish-container-${dish.id}`}
            onClick={() => setSelectedId(dish.id)}
            className="relative h-[300px] rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
            style={{ boxShadow: "0 20px 40px -10px rgba(22, 101, 52, 0.15)" }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            initial={animation.initial}
            animate={animation.animate}
          >
            <div className="absolute inset-0 overflow-hidden">
              {dish.video ? (
                <video
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={dish.image}
                >
                  <source src={dish.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent flex flex-col justify-end p-6">
              <motion.h3
                className="text-xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                {dish.name}
              </motion.h3>
              <motion.p
                className="text-green-100 text-sm line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {dish.description}
              </motion.p>

              {/* Animated elements */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200, damping: 10 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white/80"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-6 w-2 h-2 rounded-full bg-white/40"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.2,
                }}
              />

              <motion.div
                className="absolute bottom-24 left-10 w-1.5 h-1.5 rounded-full bg-white/30"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.15 + 0.5,
                }}
              />
            </div>
          </motion.div>
        )
      })}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`dish-container-${selectedId}`}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[400px]">
                {dishes.find((d) => d.id === selectedId)?.video ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={dishes.find((d) => d.id === selectedId)?.image}
                  >
                    <source src={dishes.find((d) => d.id === selectedId)?.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={dishes.find((d) => d.id === selectedId)?.image || ""}
                    alt={dishes.find((d) => d.id === selectedId)?.name || ""}
                    fill
                    className="object-cover"
                  />
                )}

                {/* Animated overlay elements */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    scale: { duration: 0.3, delay: 0.2 },
                    rotate: { duration: 1.5, repeat: 3, repeatType: "reverse" },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                    <path d="M8.5 8.5a1 1 0 0 0 2 0 1 1 0 0 0-2 0"></path>
                    <path d="M14.5 8.5a1 1 0 0 0 2 0 1 1 0 0 0-2 0"></path>
                  </svg>
                </motion.div>
              </div>

              <div className="p-8 relative">
                <motion.div
                  className="absolute -top-12 left-8 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm font-medium">Chef's Special</span>
                </motion.div>

                <motion.h3
                  className="text-3xl font-bold text-green-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {dishes.find((d) => d.id === selectedId)?.name}
                </motion.h3>

                <motion.p
                  className="text-green-800 mb-6 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {dishes.find((d) => d.id === selectedId)?.description}
                </motion.p>

                <div className="flex gap-4">
                  <motion.button
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full flex-1"
                    onClick={() => setSelectedId(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Close
                  </motion.button>

                  <motion.button
                    className="bg-white border border-green-700 text-green-700 hover:bg-green-50 px-6 py-2 rounded-full flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Add to Menu
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
