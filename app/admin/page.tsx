"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import { mockCars, mockDrivers, mockBookings } from "@/lib/mock-data"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Extended mock data for admin view
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
    {
      id: "4",
      carId: "1",
      driverId: "1",
      customerName: "Michael Brown",
      customerEmail: "michael@example.com",
      customerPhone: "+1-555-0321",
      startDate: "2024-01-28",
      endDate: "2024-01-30",
      pickupLocation: "Airport Terminal 2",
      dropoffLocation: "Business District",
      totalAmount: 275,
      status: "confirmed" as const,
      createdAt: "2024-01-18T11:20:00Z",
    },
  ]

  // Mock analytics data
  const analytics = {
    totalRevenue: 15420,
    totalBookings: 48,
    activeDrivers: 12,
    availableCars: 18,
    monthlyGrowth: 12.5,
    customerSatisfaction: 4.8,
  }

  const recentBookings = extendedBookings.slice(0, 5)
  const topDrivers = mockDrivers.filter((d) => d.available).slice(0, 3)
  const popularCars = mockCars.slice(0, 4)

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

  const filteredBookings = extendedBookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DriveEasy Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
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
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your car rental business</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/admin/reports">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reports
                </Link>
              </Button>
              <Button asChild>
                <Link href="/admin/cars/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Car
                </Link>
              </Button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 text-xs">+{analytics.monthlyGrowth}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
                    <p className="text-gray-600 text-sm">Total Bookings</p>
                    <p className="text-blue-600 text-xs mt-1">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeDrivers}</p>
                    <p className="text-gray-600 text-sm">Active Drivers</p>
                    <p className="text-purple-600 text-xs mt-1">Available now</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Car className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{analytics.availableCars}</p>
                    <p className="text-gray-600 text-sm">Available Cars</p>
                    <p className="text-orange-600 text-xs mt-1">Ready to rent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Latest customer reservations</CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href="#bookings">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => {
                        const car = mockCars.find((c) => c.id === booking.carId)
                        return (
                          <div key={booking.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <img
                              src={car?.image || "/placeholder.svg"}
                              alt={`${car?.make} ${car?.model}`}
                              className="w-12 h-9 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{booking.customerName}</p>
                              <p className="text-xs text-gray-600">
                                {car?.make} {car?.model} • ${booking.totalAmount}
                              </p>
                            </div>
                            <Badge className={getStatusColor(booking.status)} variant="secondary">
                              {booking.status}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Drivers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Drivers</CardTitle>
                    <CardDescription>Highest rated active drivers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topDrivers.map((driver) => (
                        <div key={driver.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <img
                            src={driver.image || "/placeholder.svg"}
                            alt={driver.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{driver.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                {driver.rating} rating
                              </span>
                              <span>{driver.reviews} reviews</span>
                            </div>
                          </div>
                          <span className="text-green-600 text-sm font-medium">Available</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Cars */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Cars</CardTitle>
                  <CardDescription>Most frequently booked vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularCars.map((car) => (
                      <div key={car.id} className="border rounded-lg overflow-hidden">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-medium text-sm mb-1">
                            {car.make} {car.model}
                          </h4>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{car.type}</span>
                            <span className="text-blue-600 font-medium">${car.pricePerDay}/day</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant={car.available ? "default" : "secondary"}>
                              {car.available ? "Available" : "Booked"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>All Bookings</CardTitle>
                      <CardDescription>Manage customer reservations</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search bookings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => {
                      const car = mockCars.find((c) => c.id === booking.carId)
                      const driver = mockDrivers.find((d) => d.id === booking.driverId)

                      return (
                        <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <img
                              src={car?.image || "/placeholder.svg"}
                              alt={`${car?.make} ${car?.model}`}
                              className="w-16 h-12 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900">
                                  #{booking.id} - {booking.customerName}
                                </h4>
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {car?.make} {car?.model} • {new Date(booking.startDate).toLocaleDateString()} -{" "}
                                {new Date(booking.endDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                {booking.pickupLocation} • ${booking.totalAmount}
                              </p>
                              {driver && <p className="text-sm text-blue-600">Driver: {driver.name}</p>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cars Tab */}
            <TabsContent value="cars" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Fleet Management</CardTitle>
                    <CardDescription>Manage your vehicle inventory</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/cars/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Car
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockCars.map((car) => (
                      <div key={car.id} className="border rounded-lg overflow-hidden">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {car.make} {car.model}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {car.year} • {car.type}
                              </p>
                            </div>
                            <Badge variant={car.available ? "default" : "secondary"}>
                              {car.available ? "Available" : "Booked"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <span>{car.seats} seats</span>
                            <span className="capitalize">{car.transmission}</span>
                            <span className="capitalize">{car.fuelType}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-600">${car.pricePerDay}/day</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Drivers Tab */}
            <TabsContent value="drivers" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Driver Management</CardTitle>
                    <CardDescription>Manage your professional drivers</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/drivers/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Driver
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={driver.image || "/placeholder.svg"}
                          alt={driver.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                            <Badge variant={driver.available ? "default" : "secondary"}>
                              {driver.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>Age {driver.age}</span>
                            <span>{driver.experience} years exp.</span>
                            <span>{driver.license} License</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Activity className="h-4 w-4 text-yellow-500" />
                              <span>{driver.rating} rating</span>
                            </div>
                            <span className="text-gray-600">({driver.reviews} reviews)</span>
                            <span className="text-blue-600 font-medium">${driver.pricePerHour}/hour</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {driver.specialties.slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Revenue Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-semibold">${analytics.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-semibold">$13,750</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth Rate</span>
                        <span className="font-semibold text-green-600">+{analytics.monthlyGrowth}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                      <p className="text-xs text-gray-600 text-center">75% of monthly target achieved</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Booking Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="text-sm">Completed</span>
                        </div>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="text-sm">Confirmed</span>
                        </div>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <span className="text-sm">Pending</span>
                        </div>
                        <span className="font-semibold">8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <span className="text-sm">Cancelled</span>
                        </div>
                        <span className="font-semibold">2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">{analytics.customerSatisfaction}</p>
                      <p className="text-sm text-gray-600">Customer Satisfaction</p>
                      <p className="text-xs text-green-600 mt-1">+0.2 from last month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">94%</p>
                      <p className="text-sm text-gray-600">On-Time Performance</p>
                      <p className="text-xs text-green-600 mt-1">+2% from last month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">87%</p>
                      <p className="text-sm text-gray-600">Fleet Utilization</p>
                      <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
