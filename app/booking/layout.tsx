import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Our Services - Amman's Kitchen",
  description: "Book our authentic South Indian catering services for your special events and celebrations.",
}

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
