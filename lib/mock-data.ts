export interface Car {
  id: string
  make: string
  model: string
  year: number
  type: "sedan" | "suv" | "luxury" | "economy" | "sports"
  seats: number
  transmission: "automatic" | "manual"
  fuelType: "petrol" | "diesel" | "electric" | "hybrid"
  pricePerDay: number
  image: string
  features: string[]
  available: boolean
  rating: number
  reviews: number
}

export interface Driver {
  id: string
  name: string
  age: number
  experience: number // years
  rating: number
  reviews: number
  languages: string[]
  specialties: string[]
  pricePerHour: number
  image: string
  available: boolean
  license: string
}

export interface Booking {
  id: string
  carId: string
  driverId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  startDate: string
  endDate: string
  pickupLocation: string
  dropoffLocation: string
  totalAmount: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
  permissions: string[]
  lastLogin: string
  avatar?: string
}

export const mockCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    type: "sedan",
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 45,
    image: "/toyota-camry-sedan.png",
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "Backup Camera"],
    available: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2023,
    type: "luxury",
    seats: 7,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 120,
    image: "/bmw-x5-luxury-suv.jpg",
    features: ["Leather Seats", "Sunroof", "Premium Sound", "Heated Seats", "GPS Navigation"],
    available: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    type: "sports",
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    pricePerDay: 85,
    image: "/tesla-model-3.png",
    features: ["Autopilot", "Supercharging", "Premium Interior", "Glass Roof"],
    available: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    make: "Honda",
    model: "Civic",
    year: 2022,
    type: "economy",
    seats: 5,
    transmission: "manual",
    fuelType: "petrol",
    pricePerDay: 35,
    image: "/honda-civic-economy-car.jpg",
    features: ["Air Conditioning", "Bluetooth", "USB Ports"],
    available: true,
    rating: 4.3,
    reviews: 203,
  },
  {
    id: "5",
    make: "Mercedes",
    model: "GLE",
    year: 2023,
    type: "luxury",
    seats: 5,
    transmission: "automatic",
    fuelType: "hybrid",
    pricePerDay: 150,
    image: "/mercedes-gle-luxury-suv.jpg",
    features: ["Massage Seats", "Ambient Lighting", "Premium Sound", "Panoramic Roof"],
    available: false,
    rating: 4.9,
    reviews: 67,
  },
  {
    id: "6",
    make: "Ford",
    model: "Explorer",
    year: 2023,
    type: "suv",
    seats: 7,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 75,
    image: "/ford-explorer-suv.png",
    features: ["Third Row Seating", "Towing Capacity", "All-Wheel Drive", "Cargo Space"],
    available: true,
    rating: 4.4,
    reviews: 142,
  },
]

export const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "John Smith",
    age: 35,
    experience: 12,
    rating: 4.8,
    reviews: 245,
    languages: ["English", "Spanish"],
    specialties: ["City Tours", "Airport Transfers", "Business Travel"],
    pricePerHour: 25,
    image: "/professional-driver-headshot.jpg",
    available: true,
    license: "CDL-A",
  },
  {
    id: "2",
    name: "Maria Garcia",
    age: 29,
    experience: 8,
    rating: 4.9,
    reviews: 189,
    languages: ["English", "Spanish", "French"],
    specialties: ["Luxury Service", "Wedding Events", "VIP Transport"],
    pricePerHour: 35,
    image: "/professional-female-driver.jpg",
    available: true,
    license: "CDL-B",
  },
  {
    id: "3",
    name: "David Chen",
    age: 42,
    experience: 18,
    rating: 4.7,
    reviews: 312,
    languages: ["English", "Mandarin", "Cantonese"],
    specialties: ["Long Distance", "Corporate Events", "Safe Driving"],
    pricePerHour: 30,
    image: "/placeholder-bro9y.png",
    available: true,
    license: "CDL-A",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    age: 31,
    experience: 9,
    rating: 4.6,
    reviews: 156,
    languages: ["English"],
    specialties: ["Family Friendly", "Pet Transport", "Medical Appointments"],
    pricePerHour: 28,
    image: "/placeholder-5y8oq.png",
    available: false,
    license: "Regular",
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    carId: "1",
    driverId: "1",
    customerName: "Alice Brown",
    customerEmail: "alice@example.com",
    customerPhone: "+1-555-0123",
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    pickupLocation: "Downtown Hotel",
    dropoffLocation: "Airport Terminal 1",
    totalAmount: 195,
    status: "confirmed",
    createdAt: "2024-01-10T10:00:00Z",
  },
]

export const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@driveeasy.com",
    role: "admin",
    permissions: ["manage_cars", "manage_drivers", "manage_bookings", "view_analytics", "manage_users"],
    lastLogin: "2024-01-20T09:30:00Z",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Fleet Manager",
    email: "manager@driveeasy.com",
    role: "manager",
    permissions: ["manage_cars", "manage_drivers", "view_analytics"],
    lastLogin: "2024-01-19T14:15:00Z",
  },
]
