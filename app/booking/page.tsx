import type { Metadata } from "next"
import Link from "next/link"
import { ChefHat, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BookingForm from "@/components/booking-form"
import FooterV6 from "@/components/footer-v6"

export const metadata: Metadata = {
  title: "Book Our Services - Thangarasu Samayal",
  description: "Book our authentic South Indian catering services for your special events and celebrations.",
}

export default function BookingPage() {
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
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Book Our Catering Services</h1>
            <p className="text-green-700 max-w-2xl mx-auto">
              Fill out the form below to book our authentic South Indian catering services for your special event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Call Us
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-green-800 mb-4">
                  For quick inquiries, call us directly to discuss your event details.
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-xl font-bold text-green-700 hover:text-green-600 transition flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" /> (+91) 98765-43210
                </a>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-green-800 mb-4">Send us an email with your event details and requirements.</p>
                <div className="text-center">
                  <a
                    href="mailto:info@thangarasusamayal.com"
                    className="text-lg font-bold text-green-700 hover:text-green-600 transition inline-flex items-center gap-2 break-all"
                  >
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span>info@thangarasusamayal.com</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-sm">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-green-800 mb-4">We're available to assist you during these hours.</p>
                <div className="space-y-2">
                  <p className="text-green-700">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p className="text-green-700">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Booking Form</h2>
            <p className="text-green-700 mb-8 text-center">
              Fill out the form below and we'll contact you to discuss your catering needs
            </p>
            <BookingForm />
          </div>

          <div className="mt-12 bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-4">What to Expect After Booking</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white font-bold text-sm mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-green-900">Confirmation</p>
                  <p className="text-green-700">You'll receive a confirmation email with your booking details.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white font-bold text-sm mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-green-900">Consultation</p>
                  <p className="text-green-700">
                    Our team will contact you to discuss menu options and specific requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white font-bold text-sm mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-green-900">Finalization</p>
                  <p className="text-green-700">We'll finalize the menu, pricing, and logistics for your event.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white font-bold text-sm mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-medium text-green-900">Event Day</p>
                  <p className="text-green-700">
                    Our team will arrive on time to set up and provide exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterV6 />
    </div>
  )
}
