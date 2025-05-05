"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Twitter, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com",
      color: "bg-gradient-to-br from-purple-600 to-pink-500",
    },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", color: "bg-blue-600" },
    { name: "Youtube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", color: "bg-red-600" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", color: "bg-blue-400" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", color: "bg-blue-700" },
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
        >
          <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
          <path d="M21 12c0 4.418 -4.03 8 -9 8a9.698 9.698 0 0 1 -5 -1.344m5.657 -14.736a9.721 9.721 0 0 1 4.343 -0.92c4.97 0 9 3.582 9 8c0 1.416 -0.415 2.728 -1.134 3.886"></path>
          <path d="M15.088 15.103l-3.88 -6.918a1.178 1.178 0 0 0 -2.015 0l-0.007 0.014l-0.101 0.18l-0.85 1.517l-0.027 0.048a0.813 0.813 0 0 0 0.292 1.082l0.007 0.005l0.403 0.22l1.48 0.837l0.018 0.01l0.013 0.007z"></path>
        </svg>
      ),
      href: "https://pinterest.com",
      color: "bg-red-700",
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
        >
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
        </svg>
      ),
      href: "https://whatsapp.com",
      color: "bg-green-500",
    },
    {
      name: "Snapchat",
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
        >
          <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -10 10c-5.523 0 -10 -4.477 -10 -10a10 10 0 0 1 10 -10z"></path>
          <path d="M16.5 17.5l-1.5 -1.5h-3l-1.5 1.5"></path>
          <circle cx="15.5" cy="9.5" r=".5"></circle>
          <circle cx="8.5" cy="9.5" r=".5"></circle>
          <path d="M12 7c-.5 0 -2.5 -.5 -2.5 2"></path>
        </svg>
      ),
      href: "https://snapchat.com",
      color: "bg-yellow-400",
    },
  ]

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 tracking-tight">Contact Us</h2>
            <p className="text-green-700 text-lg">
              Reach out to us for inquiries, bookings, or to discuss your catering needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ boxShadow: "0 30px 60px -15px rgba(22, 101, 52, 0.25)" }}
            >
              <div className="bg-gradient-to-br from-green-700 to-green-900 p-10 h-full flex flex-col">
                <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
                <p className="text-green-100 mb-10">
                  We'd love to hear from you. Contact us for any inquiries about our catering services.
                </p>

                <div className="space-y-8 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm mb-1">Phone Number</p>
                      <p className="text-white text-lg font-medium">(+91) 98765-43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm mb-1">Email Address</p>
                      <p className="text-white text-lg font-medium break-words">info@thangarasusamayal.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm mb-1">Location</p>
                      <p className="text-white text-lg font-medium">123 Temple Street, Chennai, Tamil Nadu, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm mb-1">Business Hours</p>
                      <p className="text-white">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                      <p className="text-white">Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-green-200 mb-4">Connect with us on social media</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} p-3 rounded-full hover:opacity-90 transition-all duration-300`}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl overflow-hidden bg-white border border-green-100 p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ boxShadow: "0 20px 40px -10px rgba(22, 101, 52, 0.1)" }}
            >
              <h3 className="text-2xl font-bold text-green-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-800 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-green-800 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-green-800 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event or inquiry"
                    required
                    className="min-h-[150px] border-green-200 focus:border-green-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
