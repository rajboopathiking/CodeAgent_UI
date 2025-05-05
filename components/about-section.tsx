"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: y1, opacity }} className="relative">
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Traditional South Indian cooking"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Our Heritage</h3>
                <p className="text-green-100">Preserving authentic Tamil Nadu cooking traditions since 1995</p>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="South Indian spices"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2, opacity }} className="lg:pl-10">
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Thangarasu Samayal
            </motion.span>

            <motion.h2
              className="text-4xl font-bold text-green-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bringing Authentic Tamil Nadu Flavors to Your Special Occasions
            </motion.h2>

            <motion.p
              className="text-green-700 mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Founded by Chef Thangarasu in 1995, our catering service has been dedicated to preserving the authentic
              flavors and cooking techniques of Tamil Nadu. What started as a small family business has grown into one
              of the most respected South Indian catering services in the region.
            </motion.p>

            <motion.p
              className="text-green-700 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We specialize in traditional South Indian cuisine, prepared with authentic ingredients and time-honored
              recipes passed down through generations. Our team of experienced chefs takes pride in creating memorable
              culinary experiences for weddings, religious ceremonies, corporate events, and family celebrations.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-xl font-bold">25+</span>
                </div>
                <span className="text-green-800">Years of Experience</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-xl font-bold">500+</span>
                </div>
                <span className="text-green-800">Events Catered</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 text-xl font-bold">100%</span>
                </div>
                <span className="text-green-800">Authentic Recipes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 rounded-full shadow-glow">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
