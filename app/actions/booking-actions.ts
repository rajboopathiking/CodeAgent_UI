"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

// Define the booking schema
const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.string().min(1),
  eventDate: z.date(),
  guestCount: z.number().min(10).max(1000),
  location: z.string().min(3),
  specialRequirements: z.string().optional(),
  referral: z.boolean().default(false),
  termsAccepted: z.boolean(),
})

type BookingData = z.infer<typeof bookingSchema>

// This would normally connect to a database
// For now, we'll simulate storing the booking
export async function createBooking(data: BookingData) {
  try {
    // Validate the data
    const validatedData = bookingSchema.parse(data)

    // Simulate a database operation with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a booking ID
    const bookingId = `BK-${Date.now().toString().slice(-6)}`

    // In a real application, you would store the booking in a database
    console.log("Booking created:", { bookingId, ...validatedData })

    // Simulate sending an email notification
    console.log(`Email notification sent to ${validatedData.email}`)

    // Revalidate the bookings page to show the new booking
    revalidatePath("/booking")

    return {
      success: true,
      bookingId,
    }
  } catch (error) {
    console.error("Error creating booking:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid booking data. Please check your information and try again.",
      }
    }

    return {
      success: false,
      error: "Failed to create booking. Please try again later.",
    }
  }
}

// Function to get all bookings (would normally fetch from a database)
export async function getBookings() {
  // Simulate fetching bookings from a database
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock data
  return {
    bookings: [
      {
        id: "BK-123456",
        name: "Rajesh Kumar",
        eventType: "wedding",
        eventDate: new Date("2023-12-15"),
        guestCount: 250,
        status: "confirmed",
      },
      {
        id: "BK-123457",
        name: "Priya Sharma",
        eventType: "babyShower",
        eventDate: new Date("2023-11-20"),
        guestCount: 50,
        status: "pending",
      },
    ],
  }
}

// Function to get a single booking by ID
export async function getBookingById(id: string) {
  // Simulate fetching a booking from a database
  await new Promise((resolve) => setTimeout(resolve, 800))

  // For demo purposes, return a mock booking if the ID starts with "BK-"
  if (id.startsWith("BK-")) {
    return {
      success: true,
      booking: {
        id,
        name: "Sample Customer",
        email: "customer@example.com",
        phone: "1234567890",
        eventType: "wedding",
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        guestCount: 150,
        location: "Chennai, Tamil Nadu",
        specialRequirements: "Vegetarian menu with traditional sweets",
        referral: true,
        status: "confirmed",
        createdAt: new Date(),
      },
    }
  }

  return {
    success: false,
    error: "Booking not found",
  }
}
