"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export default function FooterV6() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/#about" },
        { name: "Our Services", href: "/#services" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Wedding Catering", href: "/#services" },
        { name: "Corporate Events", href: "/#services" },
        { name: "Religious Functions", href: "/#services" },
        { name: "Festival Celebrations", href: "/#services" },
        { name: "Custom Menus", href: "/#services" },
      ],
    },
    {
      title: "Content",
      links: [
        { name: "Gallery", href: "/content/gallery" },
        { name: "Videos", href: "/content/videos" },
        { name: "FAQs", href: "/content/faq" },
        { name: "Add Content", href: "/#", onClick: () => alert("Content management would be implemented here") },
        { name: "Manage Media", href: "/#", onClick: () => alert("Media management would be implemented here") },
      ],
    },
  ]

  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5 text-white" />, href: "https://instagram.com" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5 text-white" />, href: "https://facebook.com" },
    { name: "Youtube", icon: <Youtube className="h-5 w-5 text-white" />, href: "https://youtube.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5 text-white" />, href: "https://twitter.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5 text-white" />, href: "https://linkedin.com" },
    {
      name: "Pinterest",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
          <path d="M21 12c0 4.418 -4.03 8 -9 8a9.698 9.698 0 0 1 -5 -1.344m5.657 -14.736a9.721 9.721 0 0 1 4.343 -0.92c4.97 0 9 3.582 9 8c0 1.416 -0.415 2.728 -1.134 3.886"></path>
          <path d="M15.088 15.103l-3.88 -6.918a1.178 1.178 0 0 0 -2.015 0l-0.007 0.014l-0.101 0.18l-0.85 1.517l-0.027 0.048a0.813 0.813 0 0 0 0.292 1.082l0.007 0.005l0.403 0.22l1.48 0.837l0.018 0.01l0.013 0.007z"></path>
        </svg>
      ),
      href: "https://pinterest.com",
    },
    {
      name: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
        </svg>
      ),
      href: "https://whatsapp.com",
    },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Top curved border */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-16 text-white"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Newsletter section */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 pt-24 pb-16 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-700/20 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-600/10 blur-3xl"
            animate={{
              x: [0, -70, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Join Our Culinary Journey
            </motion.h2>
            <motion.p
              className="text-green-100 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Subscribe to our newsletter for exclusive recipes, event updates, and special offers
            </motion.p>

            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-green-200 focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-white hover:bg-green-100 text-green-900 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Subscribe <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </motion.form>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Company info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/10 p-2 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Thangarasu Samayal</span>
              </div>
              <p className="text-green-100 mb-6">
                Bringing authentic South Indian flavors to your special occasions with love and tradition since 1995.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links sections */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold text-lg mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-green-100 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact info bar */}
      <div className="bg-green-900 py-8 border-t border-green-700/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-green-300" />
              </div>
              <span className="text-green-100">(+91) 98765-43210</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-green-300" />
              </div>
              <span className="text-green-100 break-words">info@thangarasusamayal.com</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-green-300" />
              </div>
              <span className="text-green-100">123 Temple Street, Chennai, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-green-300" />
              </div>
              <span className="text-green-100">Mon-Sat: 9AM-8PM | Sun: 10AM-4PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-green-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-300 text-sm">
              &copy; {new Date().getFullYear()} Thangarasu Samayal. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-green-300 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-green-300 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-green-300 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-green-300 hover:text-white text-sm transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
