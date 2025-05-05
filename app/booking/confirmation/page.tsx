import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBookingById } from "@/app/actions/booking-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChefHat, CheckCircle, MapPin, Users } from "lucide-react"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Booking Confirmation - Thangarasu Samayal",
  description: "Your booking has been confirmed for Thangarasu Samayal catering services.",
}

interface ConfirmationPageProps {
  searchParams: {
    id?: string
  }
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const bookingId = searchParams.id

  if (!bookingId) {
    notFound()
  }

  const { success, booking, error } = await getBookingById(bookingId)

  if (!success || !booking) {
    notFound()
  }

  const eventTypeMap: Record<string, string> = {
    wedding: "Wedding",
    engagement: "Engagement",
    pooja: "Pooja/Religious Function",
    babyShower: "Baby Shower",
    birthday: "Birthday Celebration",
    festival: "Festival Celebration",
    corporate: "Corporate Event",
    other: "Other Event",
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-amber-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-amber-700" />
            <span className="text-xl font-bold text-amber-900">Thangarasu Samayal</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/#about" className="text-amber-900 hover:text-amber-600 transition">
              About Us
            </Link>
            <Link href="/#services" className="text-amber-900 hover:text-amber-600 transition">
              Services
            </Link>
            <Link href="/#testimonials" className="text-amber-900 hover:text-amber-600 transition">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-amber-900 hover:text-amber-600 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Booking Confirmed!</h1>
            <p className="text-amber-700">
              Thank you for choosing Thangarasu Samayal. Your booking has been successfully confirmed.
            </p>
          </div>

          <Card className="border-amber-200 shadow-md">
            <CardHeader className="bg-amber-100 rounded-t-lg">
              <CardTitle className="text-2xl text-amber-900">Booking Details</CardTitle>
              <CardDescription className="text-amber-700">
                Booking ID: <span className="font-semibold">{booking.id}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-amber-600 mb-1">Customer Name</h3>
                  <p className="text-lg font-semibold text-amber-900">{booking.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-600 mb-1">Contact Information</h3>
                  <p className="text-amber-900">{booking.email}</p>
                  <p className="text-amber-900">{booking.phone}</p>
                </div>
              </div>

              <div className="border-t border-amber-200 pt-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Event Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CalendarIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-600">Event Date</p>
                      <p className="text-amber-900">{format(new Date(booking.eventDate), "MMMM d, yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-600">Number of Guests</p>
                      <p className="text-amber-900">{booking.guestCount} guests</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-600">Event Type</p>
                      <p className="text-amber-900">{eventTypeMap[booking.eventType] || booking.eventType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <MapPin className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-600">Event Location</p>
                      <p className="text-amber-900">{booking.location}</p>
                    </div>
                  </div>
                </div>

                {booking.specialRequirements && (
                  <div className="mt-6 border-t border-amber-200 pt-6">
                    <h3 className="text-sm font-medium text-amber-600 mb-1">Special Requirements</h3>
                    <p className="text-amber-900">{booking.specialRequirements}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 bg-amber-50 rounded-b-lg">
              <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white sm:flex-1">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 sm:flex-1">
                <Link href="/booking">Make Another Booking</Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-10 text-center">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">What's Next?</h3>
            <p className="text-amber-700 mb-6">
              Our team will contact you within 24 hours to discuss your menu options and finalize the details of your
              event.
            </p>
            <div className="inline-flex items-center gap-2 text-amber-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>A confirmation email has been sent to {booking.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
