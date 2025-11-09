"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Star, ArrowLeft, MapPin, Calendar, Clock, CreditCard, User, Phone, Mail, CheckCircle } from "lucide-react"
import { mockCars, mockDrivers, type Car as CarType, type Driver } from "@/lib/mock-data"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const carId = searchParams.get("carId")
  const driverId = searchParams.get("driverId")

  const [selectedCar, setSelectedCar] = useState<CarType | null>(null)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [needDriver, setNeedDriver] = useState(!!driverId)
  const [bookingStep, setBookingStep] = useState(1)

  // Form data
  const [bookingData, setBookingData] = useState({
    // Dates and location
    pickupDate: "",
    returnDate: "",
    pickupTime: "09:00",
    returnTime: "18:00",
    pickupLocation: "",
    dropoffLocation: "",

    // Customer info
    customerName: "",
    customerEmail: "",
    customerPhone: "",

    // Special requests
    specialRequests: "",

    // Driver service details
    driverServiceType: "full-day", // 'hourly', 'half-day', 'full-day', 'multi-day'
    driverHours: 8,
  })

  useEffect(() => {
    if (carId) {
      const car = mockCars.find((c) => c.id === carId)
      setSelectedCar(car || null)
    }
    if (driverId) {
      const driver = mockDrivers.find((d) => d.id === driverId)
      setSelectedDriver(driver || null)
      setNeedDriver(true)
    }
  }, [carId, driverId])

  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 1
    const pickup = new Date(bookingData.pickupDate)
    const returnDate = new Date(bookingData.returnDate)
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(1, diffDays)
  }

  const calculateDriverCost = () => {
    if (!selectedDriver || !needDriver) return 0

    switch (bookingData.driverServiceType) {
      case "hourly":
        return selectedDriver.pricePerHour * bookingData.driverHours
      case "half-day":
        return selectedDriver.pricePerHour * 4 * calculateDays()
      case "full-day":
        return selectedDriver.pricePerHour * 8 * calculateDays()
      case "multi-day":
        return selectedDriver.pricePerHour * 8 * calculateDays()
      default:
        return 0
    }
  }

  const calculateTotal = () => {
    const carCost = selectedCar ? selectedCar.pricePerDay * calculateDays() : 0
    const driverCost = calculateDriverCost()
    const serviceFee = 25
    const insurance = 15 * calculateDays()
    return carCost + driverCost + serviceFee + insurance
  }

  const availableDrivers = mockDrivers.filter((driver) => driver.available && driver.id !== selectedDriver?.id)

  const handleBookingSubmit = () => {
    // In a real app, this would submit to an API
    console.log("Booking submitted:", {
      car: selectedCar,
      driver: needDriver ? selectedDriver : null,
      bookingData,
      total: calculateTotal(),
    })
    setBookingStep(4) // Success step
  }

  if (bookingStep === 4) {
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
                <Button asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
              </div>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your booking has been successfully submitted. You'll receive a confirmation email shortly.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCar && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={selectedCar.image || "/placeholder.svg"}
                      alt={`${selectedCar.make} ${selectedCar.model}`}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">
                        {selectedCar.make} {selectedCar.model}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ${selectedCar.pricePerDay}/day × {calculateDays()} days
                      </p>
                    </div>
                  </div>
                )}

                {selectedDriver && needDriver && (
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <img
                      src={selectedDriver.image || "/placeholder.svg"}
                      alt={selectedDriver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{selectedDriver.name}</h4>
                      <p className="text-sm text-gray-600">Professional Driver Service</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pickup:</span>
                    <span>
                      {bookingData.pickupDate} at {bookingData.pickupTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Return:</span>
                    <span>
                      {bookingData.returnDate} at {bookingData.returnTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{bookingData.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/booking/manage">Manage Bookings</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link
                  href={
                    selectedCar ? `/cars/${selectedCar.id}` : selectedDriver ? `/drivers/${selectedDriver.id}` : "/"
                  }
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
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
              <Link href="/drivers" className="text-gray-600 hover:text-gray-900 transition-colors">
                Find Drivers
              </Link>
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= bookingStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${step < bookingStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex gap-16 text-sm text-gray-600">
              <span className={bookingStep >= 1 ? "text-blue-600 font-medium" : ""}>Select Services</span>
              <span className={bookingStep >= 2 ? "text-blue-600 font-medium" : ""}>Booking Details</span>
              <span className={bookingStep >= 3 ? "text-blue-600 font-medium" : ""}>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Services */}
            {bookingStep === 1 && (
              <>
                {/* Car Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Car</CardTitle>
                    <CardDescription>
                      {selectedCar ? "Your selected car" : "Choose a car for your trip"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedCar ? (
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={selectedCar.image || "/placeholder.svg"}
                          alt={`${selectedCar.make} ${selectedCar.model}`}
                          className="w-20 h-14 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {selectedCar.make} {selectedCar.model}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{selectedCar.year}</span>
                            <span>{selectedCar.seats} seats</span>
                            <span className="capitalize">{selectedCar.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">${selectedCar.pricePerDay}/day</p>
                          <Button asChild size="sm" variant="outline" className="mt-2 bg-transparent">
                            <Link href="/cars">Change Car</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No car selected</p>
                        <Button asChild>
                          <Link href="/cars">Browse Cars</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Driver Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Service (Optional)</CardTitle>
                    <CardDescription>Add a professional driver to your booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="needDriver" checked={needDriver} onCheckedChange={setNeedDriver} />
                      <label htmlFor="needDriver" className="text-sm font-medium">
                        I need a professional driver
                      </label>
                    </div>

                    {needDriver && (
                      <div className="space-y-4">
                        {selectedDriver ? (
                          <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <img
                              src={selectedDriver.image || "/placeholder.svg"}
                              alt={selectedDriver.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{selectedDriver.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{selectedDriver.rating}</span>
                                <span className="text-gray-600 text-sm">({selectedDriver.reviews} reviews)</span>
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{selectedDriver.experience} years experience</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-blue-600">${selectedDriver.pricePerHour}/hour</p>
                              <Button asChild size="sm" variant="outline" className="mt-2 bg-transparent">
                                <Link href="/drivers">Change Driver</Link>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600 mb-4">Choose from our available drivers:</p>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                              {availableDrivers.slice(0, 3).map((driver) => (
                                <div
                                  key={driver.id}
                                  className="flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                                  onClick={() => setSelectedDriver(driver)}
                                >
                                  <img
                                    src={driver.image || "/placeholder.svg"}
                                    alt={driver.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">{driver.name}</h5>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm">{driver.rating}</span>
                                    </div>
                                  </div>
                                  <span className="text-blue-600 font-medium">${driver.pricePerHour}/hr</span>
                                </div>
                              ))}
                            </div>
                            <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                              <Link href="/drivers">View All Drivers</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={() => setBookingStep(2)} disabled={!selectedCar} size="lg">
                    Continue to Details
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Booking Details */}
            {bookingStep === 2 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>When and where do you need the service?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                        <input
                          type="date"
                          value={bookingData.pickupDate}
                          onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date *</label>
                        <input
                          type="date"
                          value={bookingData.returnDate}
                          onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min={bookingData.pickupDate || new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                        <input
                          type="time"
                          value={bookingData.pickupTime}
                          onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Time</label>
                        <input
                          type="time"
                          value={bookingData.returnTime}
                          onChange={(e) => setBookingData({ ...bookingData, returnTime: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter pickup address"
                          value={bookingData.pickupLocation}
                          onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Same as pickup (leave blank)"
                          value={bookingData.dropoffLocation}
                          onChange={(e) => setBookingData({ ...bookingData, dropoffLocation: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {needDriver && selectedDriver && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Driver Service Type</label>
                        <select
                          value={bookingData.driverServiceType}
                          onChange={(e) => setBookingData({ ...bookingData, driverServiceType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="hourly">Hourly Service</option>
                          <option value="half-day">Half Day (4 hours)</option>
                          <option value="full-day">Full Day (8 hours)</option>
                          <option value="multi-day">Multi-Day Service</option>
                        </select>

                        {bookingData.driverServiceType === "hourly" && (
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Hours</label>
                            <input
                              type="number"
                              min="2"
                              max="12"
                              value={bookingData.driverHours}
                              onChange={(e) =>
                                setBookingData({ ...bookingData, driverHours: Number.parseInt(e.target.value) })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>We'll use this information to confirm your booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={bookingData.customerName}
                          onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={bookingData.customerEmail}
                            onChange={(e) => setBookingData({ ...bookingData, customerEmail: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={bookingData.customerPhone}
                            onChange={(e) => setBookingData({ ...bookingData, customerPhone: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests (Optional)
                      </label>
                      <Textarea
                        placeholder="Any special requirements or requests..."
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={() => setBookingStep(1)} variant="outline" size="lg">
                    Back
                  </Button>
                  <Button
                    onClick={() => setBookingStep(3)}
                    disabled={
                      !bookingData.pickupDate ||
                      !bookingData.returnDate ||
                      !bookingData.pickupLocation ||
                      !bookingData.customerName ||
                      !bookingData.customerEmail ||
                      !bookingData.customerPhone
                    }
                    size="lg"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Secure payment processing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={() => setBookingStep(2)} variant="outline" size="lg">
                    Back
                  </Button>
                  <Button onClick={handleBookingSubmit} size="lg" className="bg-green-600 hover:bg-green-700">
                    Complete Booking
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCar && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={selectedCar.image || "/placeholder.svg"}
                      alt={`${selectedCar.make} ${selectedCar.model}`}
                      className="w-12 h-9 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {selectedCar.make} {selectedCar.model}
                      </h4>
                      <p className="text-xs text-gray-600">${selectedCar.pricePerDay}/day</p>
                    </div>
                  </div>
                )}

                {selectedDriver && needDriver && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <img
                      src={selectedDriver.image || "/placeholder.svg"}
                      alt={selectedDriver.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{selectedDriver.name}</h4>
                      <p className="text-xs text-gray-600">${selectedDriver.pricePerHour}/hour</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  {bookingData.pickupDate && bookingData.returnDate && (
                    <>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>
                          {calculateDays()} day{calculateDays() > 1 ? "s" : ""}
                        </span>
                      </div>
                      {selectedCar && (
                        <div className="flex justify-between">
                          <span>Car rental:</span>
                          <span>${selectedCar.pricePerDay * calculateDays()}</span>
                        </div>
                      )}
                      {selectedDriver && needDriver && (
                        <div className="flex justify-between">
                          <span>Driver service:</span>
                          <span>${calculateDriverCost()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Insurance:</span>
                        <span>${15 * calculateDays()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee:</span>
                        <span>$25</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </>
                  )}
                </div>

                {bookingData.pickupDate && bookingData.pickupLocation && (
                  <>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{bookingData.pickupDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{bookingData.pickupTime}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-xs">{bookingData.pickupLocation}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
