import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, Shield, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DriveEasy</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/cars" className="text-gray-600 hover:text-gray-900 transition-colors">
                Browse Cars
              </Link>
              <Link href="/drivers" className="text-gray-600 hover:text-gray-900 transition-colors">
                Find Drivers
              </Link>
              <Link href="/booking" className="text-gray-600 hover:text-gray-900 transition-colors">
                My Bookings
              </Link>
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Premium Car Rentals with Professional Drivers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            Experience luxury and convenience with our fleet of premium vehicles and certified professional drivers.
            Book your perfect ride in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/cars">Browse Cars</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/drivers">Find a Driver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose DriveEasy?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Premium Fleet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from our extensive collection of luxury, economy, and specialty vehicles
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Professional Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Certified, experienced drivers with excellent safety records and local knowledge
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Fully Insured</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete insurance coverage for your peace of mind during every journey
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Round-the-clock customer support for any assistance you need</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Quick Booking</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/cars">Search Available Cars</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Cars Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Cars</h2>
            <Button asChild variant="outline">
              <Link href="/cars">View All Cars</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample car cards - will be populated from mock data */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img src="/toyota-camry-modern.png" alt="Toyota Camry" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Toyota Camry</h3>
                  <Badge variant="secondary">Sedan</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">2023 • Automatic • 5 Seats</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$45/day</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">DriveEasy</span>
              </div>
              <p className="text-gray-400">
                Premium car rentals with professional drivers for all your transportation needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/cars" className="hover:text-white transition-colors">
                    Car Rentals
                  </Link>
                </li>
                <li>
                  <Link href="/drivers" className="hover:text-white transition-colors">
                    Driver Services
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-white transition-colors">
                    Corporate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 1-800-DRIVE-EASY</p>
                <p>✉️ support@driveeasy.com</p>
                <p>📍 123 Main St, City, State</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DriveEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
