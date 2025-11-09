"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Users, Fuel, Settings, Star, Search, Filter, ArrowLeft } from "lucide-react"
import { mockCars } from "@/lib/mock-data"

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedTransmission, setSelectedTransmission] = useState<string>("all")
  const [selectedFuelType, setSelectedFuelType] = useState<string>("all")
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)
  const [sortBy, setSortBy] = useState<string>("price-low")

  const filteredAndSortedCars = useMemo(() => {
    const filtered = mockCars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || car.type === selectedType
      const matchesPrice = car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1]
      const matchesTransmission = selectedTransmission === "all" || car.transmission === selectedTransmission
      const matchesFuelType = selectedFuelType === "all" || car.fuelType === selectedFuelType
      const matchesAvailability = !showAvailableOnly || car.available

      return (
        matchesSearch && matchesType && matchesPrice && matchesTransmission && matchesFuelType && matchesAvailability
      )
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerDay - b.pricePerDay
        case "price-high":
          return b.pricePerDay - a.pricePerDay
        case "rating":
          return b.rating - a.rating
        case "year":
          return b.year - a.year
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedType, priceRange, selectedTransmission, selectedFuelType, showAvailableOnly, sortBy])

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Cars</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by make or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Car Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per day)</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      min={0}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="available" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
                  <label htmlFor="available" className="text-sm font-medium text-gray-700">
                    Show available cars only
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
                <p className="text-gray-600 mt-1">{filteredAndSortedCars.length} cars found</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="year">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                    {!car.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Not Available</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-gray-600 text-sm">{car.year}</p>
                      </div>
                      <Badge className={getTypeColor(car.type)}>
                        {getTypeIcon(car.type)} {car.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {car.seats} seats
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="h-4 w-4" />
                        {car.transmission}
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-4 w-4" />
                        {car.fuelType}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{car.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">({car.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
                        <span className="text-gray-600 text-sm">/day</span>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/cars/${car.id}`}>View Details</Link>
                        </Button>
                        <Button asChild size="sm" disabled={!car.available} className="bg-blue-600 hover:bg-blue-700">
                          <Link href={`/booking?carId=${car.id}`}>{car.available ? "Book Now" : "Unavailable"}</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                    setPriceRange([0, 200])
                    setSelectedTransmission("all")
                    setSelectedFuelType("all")
                    setShowAvailableOnly(true)
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
