"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCarouselProps {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function TestimonialCarousel({ onMouseEnter, onMouseLeave }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const testimonials = [
    {
      rating: 5,
      text: "The food prepared for my daughter's wedding was absolutely authentic and reminded me of my grandmother's cooking. The guests couldn't stop praising the traditional flavors and variety.",
      name: "Sridevi Ramachandran",
      event: "Wedding in Chennai",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      rating: 5,
      text: "We hired Thangarasu Samayal for our Grihapravesam ceremony, and they exceeded our expectations. The prasadam was prepared with such care and devotion. Everyone felt like they were eating at a temple.",
      name: "Venkat Krishnan",
      event: "Housewarming Ceremony",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      rating: 5,
      text: "Living away from India, we wanted our children to experience authentic Tamil Nadu festival food during Pongal. The team recreated the exact flavors of my childhood and even explained the cultural significance.",
      name: "Lakshmi Narayanan",
      event: "Pongal Celebration",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      rating: 5,
      text: "The corporate lunch they catered for our office was exceptional. The variety and quality of dishes impressed everyone, and they accommodated all our dietary requirements perfectly.",
      name: "Rajesh Kumar",
      event: "Corporate Event",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isPaused) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    }

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 10 : -10,
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative"
    >
      <div className="overflow-hidden py-12">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
            className="flex flex-col md:flex-row gap-8 items-center perspective-1000"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="md:w-1/3 relative h-[350px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-700/90 to-green-900/90 flex items-center justify-center z-10">
                <div className="text-center p-6">
                  <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                      staggerChildren: 0.1,
                    }}
                  >
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-8 w-8 text-yellow-400 fill-current mx-0.5" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4 border-2 border-white/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                    whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.5)" }}
                  >
                    <span className="text-white text-3xl font-bold">
                      {testimonials[current].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </motion.div>

                  <motion.p className="text-white font-semibold text-xl" variants={itemVariants}>
                    {testimonials[current].name}
                  </motion.p>

                  <motion.p className="text-green-200" variants={itemVariants}>
                    {testimonials[current].event}
                  </motion.p>
                </div>
              </div>

              {/* Background image with parallax effect */}
              <motion.div
                className="absolute inset-0 opacity-20"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                style={{
                  backgroundImage: `url(${testimonials[current].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            <motion.div className="md:w-2/3" variants={itemVariants}>
              <Card className="bg-white border-green-200 h-full shadow-2xl hover:shadow-green-200/20 transition-all duration-500">
                <CardContent className="pt-8 pb-8 px-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-6"
                  >
                    <Quote className="h-12 w-12 text-green-200 rotate-180" />
                  </motion.div>

                  <motion.p
                    className="text-green-800 text-xl mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {testimonials[current].text}
                  </motion.p>

                  <motion.div className="flex justify-between items-center" variants={itemVariants}>
                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setDirection(index > current ? 1 : -1)
                            setCurrent(index)
                          }}
                          className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            index === current ? "bg-green-600 scale-125" : "bg-green-200 hover:bg-green-300"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-green-50"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.1, backgroundColor: "#f0fdf4" }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-green-800" />
      </motion.button>

      <motion.button
        onClick={handleNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-green-50"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        whileHover={{ scale: 1.1, backgroundColor: "#f0fdf4" }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-green-800" />
      </motion.button>
    </motion.div>
  )
}
