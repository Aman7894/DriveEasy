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
import { Car, Users, Star, Search, Filter, ArrowLeft, Languages, Award } from "lucide-react"
import { mockDrivers } from "@/lib/mock-data"

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [minExperience, setMinExperience] = useState(0)
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)
  const [sortBy, setSortBy] = useState<string>("rating")

  // Get unique languages and specialties for filters
  const allLanguages = Array.from(new Set(mockDrivers.flatMap((driver) => driver.languages)))
  const allSpecialties = Array.from(new Set(mockDrivers.flatMap((driver) => driver.specialties)))

  const filteredAndSortedDrivers = useMemo(() => {
    const filtered = mockDrivers.filter((driver) => {
      const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLanguage = selectedLanguage === "all" || driver.languages.includes(selectedLanguage)
      const matchesPrice = driver.pricePerHour >= priceRange[0] && driver.pricePerHour <= priceRange[1]
      const matchesSpecialty = selectedSpecialty === "all" || driver.specialties.includes(selectedSpecialty)
      const matchesExperience = driver.experience >= minExperience
      const matchesAvailability = !showAvailableOnly || driver.available

      return (
        matchesSearch && matchesLanguage && matchesPrice && matchesSpecialty && matchesExperience && matchesAvailability
      )
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.pricePerHour - b.pricePerHour
        case "price-high":
          return b.pricePerHour - a.pricePerHour
        case "experience":
          return b.experience - a.experience
        case "reviews":
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedLanguage, priceRange, selectedSpecialty, minExperience, showAvailableOnly, sortBy])

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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Drivers</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {allLanguages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per hour)</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50}
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

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {allSpecialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Experience: {minExperience} years
                  </label>
                  <div className="px-2">
                    <Slider
                      value={[minExperience]}
                      onValueChange={(value) => setMinExperience(value[0])}
                      max={20}
                      min={0}
                      step={1}
                      className="mb-2"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="available" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
                  <label htmlFor="available" className="text-sm font-medium text-gray-700">
                    Show available drivers only
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
                <h1 className="text-3xl font-bold text-gray-900">Professional Drivers</h1>
                <p className="text-gray-600 mt-1">{filteredAndSortedDrivers.length} drivers found</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAndSortedDrivers.map((driver) => (
                <Card key={driver.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={driver.image || "/placeholder.svg"}
                          alt={driver.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        {!driver.available && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Badge variant="destructive" className="text-xs">
                              Busy
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 truncate">{driver.name}</h3>
                            <p className="text-gray-600 text-sm">
                              Age {driver.age} • {driver.experience} years experience
                            </p>
                          </div>
                          <Badge className={getLicenseBadgeColor(driver.license)}>{driver.license}</Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{driver.rating}</span>
                          </div>
                          <span className="text-gray-600 text-sm">({driver.reviews} reviews)</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Languages className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{driver.languages.join(", ")}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div className="flex flex-wrap gap-1">
                              {driver.specialties.slice(0, 2).map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                              {driver.specialties.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{driver.specialties.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">${driver.pricePerHour}</span>
                            <span className="text-gray-600 text-sm">/hour</span>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/drivers/${driver.id}`}>View Profile</Link>
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              disabled={!driver.available}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Link href={`/booking?driverId=${driver.id}`}>
                                {driver.available ? "Book Now" : "Unavailable"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedDrivers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No drivers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedLanguage("all")
                    setPriceRange([0, 50])
                    setSelectedSpecialty("all")
                    setMinExperience(0)
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
