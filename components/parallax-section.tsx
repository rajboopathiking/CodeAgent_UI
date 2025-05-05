"use client"

import type React from "react"

import { forwardRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  children: React.ReactNode
}

const ParallaxSection = forwardRef<HTMLElement, ParallaxSectionProps>(
  ({ id, title, subtitle, imageUrl, imageAlt, children }, ref) => {
    const { scrollYProgress } = useScroll({
      target: ref as any,
      offset: ["start end", "end start"],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
      <section ref={ref} id={id} className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden group">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ boxShadow: "0 20px 40px -10px rgba(22, 101, 52, 0.3)" }}
                />
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              style={{ y: contentY, opacity }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-green-900 mb-4 tracking-tight">{title}</h2>
              <p className="text-xl text-green-700 mb-8">{subtitle}</p>
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    )
  },
)

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection
