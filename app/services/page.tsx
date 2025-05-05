"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChefHat, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PremiumBentoGrid from "@/components/premium-bento-grid"
import FooterV6 from "@/components/footer-v6"

export default function ServicesPage() {
  const [cursorVariant, setCursorVariant] = useState("default")
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const enterButton = () => setCursorVariant("button")
  const leaveInteractive = () => setCursorVariant("default")

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-green-700" />
            <span className="text-xl font-bold text-green-900">Thangarasu Samayal</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-green-900 hover:text-green-600 transition">
              About Us
            </Link>
            <Link href="/#services" className="text-green-900 hover:text-green-600 transition">
              Services
            </Link>
            <Link href="/#testimonials" className="text-green-900 hover:text-green-600 transition">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-green-900 hover:text-green-600 transition">
              Contact
            </Link>
          </div>
          <Button asChild className="bg-green-700 hover:bg-green-800 text-white">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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

        <motion.div className="relative z-10 text-center px-4" style={{ opacity: heroOpacity, y: heroY }}>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Premium Services
          </motion.h1>
          <motion.p
            className="text-xl text-green-100 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our range of authentic South Indian catering services for all your special occasions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              asChild
              className="bg-white text-green-900 hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-glow"
              onMouseEnter={enterButton}
              onMouseLeave={leaveInteractive}
            >
              <a href="#services-grid">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Services Bento Grid */}
      <div id="services-grid">
        <PremiumBentoGrid />
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Experience Authentic South Indian Cuisine?
          </motion.h2>
          <motion.p
            className="text-green-100 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Book our catering services for your next event and treat your guests to the rich flavors of Tamil Nadu
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              asChild
              className="bg-white text-green-900 hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-glow"
              onMouseEnter={enterButton}
              onMouseLeave={leaveInteractive}
            >
              <Link href="/booking">
                Book Your Event Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterV6 />
    </div>
  )
}
