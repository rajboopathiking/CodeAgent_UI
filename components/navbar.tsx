"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeSection?: string
}

export default function Navbar({ activeSection = "hero" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-mac" : "py-5 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 z-50">
            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <ChefHat className={`h-7 w-7 ${scrolled ? "text-green-800" : "text-white"}`} />
            </motion.div>
            <span className={`text-lg font-bold ${scrolled ? "text-green-900" : "text-white"}`}>
              Thangarasu Samayal
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`${scrolled ? "text-green-900" : "text-white"} hover:text-green-600 transition relative`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        scrolled ? "bg-green-600" : "bg-white"
                      } rounded-full`}
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className={`${
                  scrolled ? "bg-green-800" : "bg-white/20 backdrop-blur-md"
                } hover:bg-green-700 shadow-glow rounded-full`}
              >
                <Link href="/booking" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Book Now</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? "text-green-900" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-green-900" : "text-white"}`} />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-green-800 to-green-900 z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white text-2xl font-medium hover:text-green-300 transition"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-900 hover:bg-white/90 mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
