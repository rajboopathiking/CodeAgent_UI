"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import HorizontalInfiniteScroll from "@/components/horizontal-infinite-scroll"
import PremiumBentoGrid from "@/components/premium-bento-grid"
import TestimonialCarousel from "@/components/testimonial-carousel"
import ContactSection from "@/components/contact-section"
import FooterV6 from "@/components/footer-v6"
import FloatingParticles from "@/components/floating-particles"
import AnimatedBackground from "@/components/animated-background"
import { motion, useScroll } from "framer-motion"

export default function Home() {
  const { scrollYProgress } = useScroll()

  return (
    <main className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />
      <HeroSection />
      <AboutSection />

      <section id="features" className="py-16 bg-green-50 relative overflow-hidden">
        <AnimatedBackground variant="bubbles" color="green" density="medium" speed="slow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Features
            </motion.span>
            <h2 className="text-4xl font-bold text-green-900 mb-4">Why Choose Thangarasu Samayal</h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Experience the authentic flavors of South India with our premium catering services
            </p>
            <motion.div
              className="w-24 h-1 bg-green-600 mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <HorizontalInfiniteScroll />
        </div>
      </section>

      <section id="services" className="py-16 relative overflow-hidden">
        <AnimatedBackground variant="particles" color="green" density="low" speed="medium" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.span>
            <h2 className="text-4xl font-bold text-green-900 mb-4">Our Premium Services</h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Discover our range of authentic South Indian catering services for all your special occasions
            </p>
            <motion.div
              className="w-24 h-1 bg-green-600 mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <PremiumBentoGrid />
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-green-50 relative overflow-hidden">
        <AnimatedBackground variant="waves" color="green" density="medium" speed="slow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Testimonials
            </motion.span>
            <h2 className="text-4xl font-bold text-green-900 mb-4">What Our Clients Say</h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with our catering services
            </p>
            <motion.div
              className="w-24 h-1 bg-green-600 mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <ContactSection />
      <FooterV6 />
      <FloatingParticles />
    </main>
  )
}
