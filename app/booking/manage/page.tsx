"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Star, ArrowLeft, Calendar, MapPin, Phone, Mail, Search } from "lucide-react"
import { mockBookings, mockCars, mockDrivers } from "@/lib/mock-data"

export default function ManageBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Extended mock bookings for demonstration
  const extendedBookings = [
    ...mockBookings,
    {
      id: "2",
      carId: "2",
      driverId: "2",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1-555-0456",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      pickupLocation: "City Center Hotel",
      dropoffLocation: "International Airport",
      totalAmount: 385,
      status: "pending" as const,
      createdAt: "2024-01-15T14:30:00Z",
    },
    {
      id: "3",
      carId: "3",
      customerName: "Emma Wilson",
      customerEmail: "emma@example.com",
      customerPhone: "+1-555-0789",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      pickupLocation: "Downtown Office",
      dropoffLocation: "Downtown Office",
      totalAmount: 195,
      status: "completed" as const,
      createdAt: "2024-01-12T09:15:00Z",
    },
  ]

  const filteredBookings = extendedBookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBookingCar = (carId: string) => mockCars.find((car) => car.id === carId)
  const getBookingDriver = (driverId?: string) =>
    driverId ? mockDrivers.find((driver) => driver.id === driverId) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-1">Manage your car rentals and driver services</p>
            </div>
            <Button asChild>
              <Link href="/cars">New Booking</Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by booking ID or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bookings</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const car = getBookingCar(booking.carId)
              const driver = getBookingDriver(booking.driverId)

              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Booking #{booking.id}</h3>
                            <p className="text-gray-600 text-sm">
                              Created {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Car Details */}
                          {car && (
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={car.image || "/placeholder.svg"}
                                alt={`${car.make} ${car.model}`}
                                className="w-16 h-12 rounded object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {car.make} {car.model}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {car.year} • {car.seats} seats • {car.type}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Driver Details */}
                          {driver && (
                            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                              <img
                                src={driver.image || "/placeholder.svg"}
                                alt={driver.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">{driver.name}</h4>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{driver.rating}</span>
                                </div>
                                <p className="text-sm text-gray-600">Professional Driver</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Booking Details */}
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>
                              {new Date(booking.startDate).toLocaleDateString()} -{" "}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p>Pickup: {booking.pickupLocation}</p>
                              {booking.dropoffLocation && booking.dropoffLocation !== booking.pickupLocation && (
                                <p>Drop-off: {booking.dropoffLocation}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{booking.customerEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{booking.customerPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions & Total */}
                      <div className="lg:w-64 flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <p className="text-2xl font-bold text-blue-600">${booking.totalAmount}</p>
                          <p className="text-sm text-gray-600">Total Amount</p>
                        </div>

                        <div className="space-y-2">
                          {booking.status === "pending" && (
                            <>
                              <Button className="w-full" size="sm">
                                Confirm Booking
                              </Button>
                              <Button variant="outline" className="w-full bg-transparent" size="sm">
                                Modify Booking
                              </Button>
                              <Button variant="destructive" className="w-full" size="sm">
                                Cancel Booking
                              </Button>
                            </>
                          )}

                          {booking.status === "confirmed" && (
                            <>
                              <Button variant="outline" className="w-full bg-transparent" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" className="w-full bg-transparent" size="sm">
                                Contact Support
                              </Button>
                            </>
                          )}

                          {booking.status === "completed" && (
                            <>
                              <Button variant="outline" className="w-full bg-transparent" size="sm">
                                Download Receipt
                              </Button>
                              <Button variant="outline" className="w-full bg-transparent" size="sm">
                                Leave Review
                              </Button>
                              <Button className="w-full" size="sm">
                                Book Again
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters."
                  : "You haven't made any bookings yet."}
              </p>
              <Button asChild>
                <Link href="/cars">Make Your First Booking</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
