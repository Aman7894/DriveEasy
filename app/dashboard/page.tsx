"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Car,
  Calendar,
  Star,
  MapPin,
  Clock,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  User,
  History,
  Heart,
  Shield,
} from "lucide-react"
import { mockBookings, mockCars, mockDrivers } from "@/lib/mock-data"

export default function DashboardPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "2023",
    avatar: "/placeholder.svg",
    totalBookings: 12,
    favoriteDrivers: 3,
    loyaltyPoints: 2450,
  })

  // Mock recent bookings
  const recentBookings = [
    {
      ...mockBookings[0],
      car: mockCars.find((c) => c.id === mockBookings[0].carId),
      driver: mockDrivers.find((d) => d.id === mockBookings[0].driverId),
    },
  ]

  // Mock favorite cars
  const favoriteCars = mockCars.slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}!</h1>
                <p className="text-gray-600">Member since {user.memberSince}</p>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/cars">Book New Rental</Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
                    <p className="text-gray-600 text-sm">Total Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.loyaltyPoints}</p>
                    <p className="text-gray-600 text-sm">Loyalty Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.favoriteDrivers}</p>
                    <p className="text-gray-600 text-sm">Favorite Drivers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Gold</p>
                    <p className="text-gray-600 text-sm">Member Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Your latest car rentals and driver services</CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/booking/manage">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <img
                            src={booking.car?.image || "/placeholder.svg"}
                            alt={`${booking.car?.make} ${booking.car?.model}`}
                            className="w-16 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {booking.car?.make} {booking.car?.model}
                              </h4>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(booking.startDate).toLocaleDateString()} -{" "}
                                  {new Date(booking.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{booking.pickupLocation}</span>
                              </div>
                            </div>
                            {booking.driver && (
                              <div className="flex items-center gap-2 mt-2">
                                <img
                                  src={booking.driver.image || "/placeholder.svg"}
                                  alt={booking.driver.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm text-gray-600">with {booking.driver.name}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">${booking.totalAmount}</p>
                            <Button asChild size="sm" variant="outline" className="mt-2 bg-transparent">
                              <Link href={`/booking/manage`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent bookings</h3>
                      <p className="text-gray-600 mb-4">Start your journey with DriveEasy today!</p>
                      <Button asChild>
                        <Link href="/cars">Browse Cars</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Favorite Cars */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Favorite Cars</CardTitle>
                    <CardDescription>Cars you've bookmarked for future rentals</CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/cars">Browse More</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteCars.map((car) => (
                      <div key={car.id} className="border rounded-lg overflow-hidden">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {car.make} {car.model}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-semibold">${car.pricePerDay}/day</span>
                            <Button asChild size="sm">
                              <Link href={`/cars/${car.id}`}>Book Now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                    <Link href="/cars">
                      <Car className="h-4 w-4 mr-2" />
                      Browse Cars
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                    <Link href="/drivers">
                      <User className="h-4 w-4 mr-2" />
                      Find Drivers
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                    <Link href="/booking/manage">
                      <History className="h-4 w-4 mr-2" />
                      Booking History
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                    <Link href="/profile">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Loyalty Program */}
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Rewards</CardTitle>
                  <CardDescription>You're a Gold member!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Points to Platinum</span>
                        <span>{user.loyaltyPoints}/5000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(user.loyaltyPoints / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Gold Member Benefits:</p>
                      <ul className="space-y-1">
                        <li>• 15% discount on all rentals</li>
                        <li>• Priority customer support</li>
                        <li>• Free car upgrades (when available)</li>
                        <li>• Exclusive access to premium vehicles</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    24/7 Support Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing & Payments
                  </Button>
                  <div className="text-sm text-gray-600 pt-2">
                    <p>Emergency Contact:</p>
                    <p className="font-medium">1-800-DRIVE-EASY</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
