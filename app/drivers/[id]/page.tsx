import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Car, Star, ArrowLeft, Languages, Award, Clock, Shield, CheckCircle, MapPin } from "lucide-react"
import { mockDrivers, mockCars } from "@/lib/mock-data"

interface DriverDetailPageProps {
  params: {
    id: string
  }
}

export default function DriverDetailPage({ params }: DriverDetailPageProps) {
  const driver = mockDrivers.find((d) => d.id === params.id)

  if (!driver) {
    notFound()
  }

  const getLicenseBadgeColor = (license: string) => {
    switch (license) {
      case "CDL-A":
        return "bg-green-100 text-green-800"
      case "CDL-B":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get available cars that would pair well with this driver
  const availableCars = mockCars.filter((car) => car.available).slice(0, 3)

  // Mock reviews data
  const recentReviews = [
    {
      id: 1,
      customerName: "Sarah M.",
      rating: 5,
      comment: "Excellent service! Very professional and punctual. Made our wedding day transportation seamless.",
      date: "2024-01-10",
      service: "Wedding Events",
    },
    {
      id: 2,
      customerName: "Michael R.",
      rating: 5,
      comment: "Great driver for our business trip. Knew all the best routes and was very courteous.",
      date: "2024-01-08",
      service: "Business Travel",
    },
    {
      id: 3,
      customerName: "Jennifer L.",
      rating: 4,
      comment: "Safe and comfortable ride to the airport. Would definitely book again.",
      date: "2024-01-05",
      service: "Airport Transfers",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/drivers">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Drivers
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DriveEasy</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/cars" className="text-gray-600 hover:text-gray-900 transition-colors">
                Browse Cars
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Profile */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={driver.image || "/placeholder.svg"}
                      alt={driver.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />
                    {!driver.available && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Badge variant="destructive">Currently Busy</Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{driver.name}</h1>
                        <p className="text-lg text-gray-600 mb-2">Professional Driver • Age {driver.age}</p>
                        <Badge className={`${getLicenseBadgeColor(driver.license)} text-base px-3 py-1`}>
                          {driver.license} License
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{driver.rating}</span>
                        <span className="text-gray-600">({driver.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{driver.experience} years experience</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Languages className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">Languages: {driver.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties & Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Specialties & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {driver.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>What customers are saying about {driver.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{review.customerName}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                    </div>
                    <p className="text-gray-700 mb-1">{review.comment}</p>
                    <Badge variant="secondary" className="text-xs">
                      {review.service}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Available Cars */}
            {availableCars.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Available Cars</CardTitle>
                  <CardDescription>Cars that {driver.name} can drive for your booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {availableCars.map((car) => (
                      <div key={car.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.make} ${car.model}`}
                          className="w-20 h-14 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {car.make} {car.model}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{car.year}</span>
                            <span>{car.seats} seats</span>
                            <span className="capitalize">{car.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">${car.pricePerDay}/day</p>
                          <Button asChild size="sm" variant="outline" className="mt-2 bg-transparent">
                            <Link href={`/cars/${car.id}`}>View Car</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">
                  ${driver.pricePerHour}
                  <span className="text-base font-normal text-gray-600">/hour</span>
                </CardTitle>
                <CardDescription>{driver.available ? "Available for booking" : "Currently busy"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours (full day)</option>
                      <option value="custom">Custom duration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter pickup location"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hourly rate</span>
                    <span>${driver.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration (4 hours)</span>
                    <span>${driver.pricePerHour * 4}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$10</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${driver.pricePerHour * 4 + 10}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={!driver.available}>
                  <Link href={`/booking?driverId=${driver.id}`}>
                    {driver.available ? "Book This Driver" : "Not Available"}
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                  <Link href="/drivers">Browse Other Drivers</Link>
                </Button>

                <Separator />

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Fully licensed and insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Background checked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
