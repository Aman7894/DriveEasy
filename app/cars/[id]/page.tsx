import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Car, Users, Fuel, Settings, Star, ArrowLeft, MapPin, Shield, CheckCircle, Calendar, Clock } from "lucide-react"
import { mockCars, mockDrivers } from "@/lib/mock-data"

interface CarDetailPageProps {
  params: {
    id: string
  }
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const car = mockCars.find((c) => c.id === params.id)

  if (!car) {
    notFound()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "luxury":
        return "✨"
      case "sports":
        return "🏎️"
      case "suv":
        return "🚙"
      case "sedan":
        return "🚗"
      case "economy":
        return "💰"
      default:
        return "🚗"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "luxury":
        return "bg-purple-100 text-purple-800"
      case "sports":
        return "bg-red-100 text-red-800"
      case "suv":
        return "bg-green-100 text-green-800"
      case "sedan":
        return "bg-blue-100 text-blue-800"
      case "economy":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get available drivers for this car type
  const availableDrivers = mockDrivers.filter((driver) => driver.available).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/cars">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cars
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DriveEasy</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Images */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  {!car.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        Not Available
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {car.make} {car.model}
                    </CardTitle>
                    <CardDescription className="text-lg mt-1">{car.year} Model</CardDescription>
                  </div>
                  <Badge className={`${getTypeColor(car.type)} text-base px-3 py-1`}>
                    {getTypeIcon(car.type)} {car.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{car.rating}</span>
                  </div>
                  <span className="text-gray-600">({car.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Seating Capacity</p>
                        <p className="text-gray-600">{car.seats} passengers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Transmission</p>
                        <p className="text-gray-600 capitalize">{car.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Fuel className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Fuel Type</p>
                        <p className="text-gray-600 capitalize">{car.fuelType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Model Year</p>
                        <p className="text-gray-600">{car.year}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Safety & Insurance */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety & Insurance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Fully Insured</p>
                        <p className="text-green-600 text-sm">Comprehensive coverage included</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">24/7 Support</p>
                        <p className="text-blue-600 text-sm">Emergency assistance available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Drivers */}
            {availableDrivers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Available Professional Drivers</CardTitle>
                  <CardDescription>Add a professional driver to your booking for a premium experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {availableDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={driver.image || "/placeholder.svg"}
                          alt={driver.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{driver.rating}</span>
                            <span className="text-gray-600 text-sm">({driver.reviews} reviews)</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {driver.experience} years experience • {driver.languages.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">${driver.pricePerHour}/hour</p>
                          <Button asChild size="sm" variant="outline" className="mt-2 bg-transparent">
                            <Link href={`/drivers/${driver.id}`}>View Profile</Link>
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
                  ${car.pricePerDay}
                  <span className="text-base font-normal text-gray-600">/day</span>
                </CardTitle>
                <CardDescription>{car.available ? "Available for booking" : "Currently unavailable"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
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
                    <span>Daily rate</span>
                    <span>${car.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Insurance</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total (3 days)</span>
                    <span>${car.pricePerDay * 3}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={!car.available}>
                  <Link href={`/booking?carId=${car.id}`}>{car.available ? "Book This Car" : "Not Available"}</Link>
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                  <Link href="/cars">Browse Other Cars</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
