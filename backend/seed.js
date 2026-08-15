const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const sampleProducts = [

  // ==================== CARS ====================

  {
    name: "SHRIKA S1",
    description:
      "Premium performance sedan with a refined interior, intelligent features and a powerful road presence.",
    price: 1899000,
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 10,
  },

  {
    name: "SHRIKA X1",
    description:
      "Modern compact SUV designed for everyday city driving with comfort, space and bold styling.",
    price: 2299000,
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 8,
  },

  {
    name: "SHRIKA R1",
    description:
      "Sport-focused coupe with aggressive styling, responsive handling and a driver-oriented cabin.",
    price: 3299000,
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 5,
  },

  {
    name: "SHRIKA V1",
    description:
      "Luxury seven-seater SUV combining premium comfort, advanced technology and commanding performance.",
    price: 3899000,
    category: "Cars",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 6,
  },

  // ==================== ENGINE PARTS ====================

  {
    name: "SHRIKA Performance Air Filter",
    description:
      "High-flow reusable air filter designed to improve engine airflow and throttle response.",
    price: 4999,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 40,
  },

  {
    name: "SHRIKA Performance Brake Kit",
    description:
      "High-performance braking system designed for stronger stopping power and improved control.",
    price: 45999,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 15,
  },

  {
    name: "SHRIKA Engine Performance Kit",
    description:
      "Performance upgrade kit designed to improve engine response and overall driving performance.",
    price: 24999,
    category: "Engine Parts",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 12,
  },

  // ==================== EXTERIOR ====================

  {
    name: "SHRIKA LED Headlight Kit",
    description:
      "High-intensity LED headlights offering improved visibility and a modern front-end appearance.",
    price: 18999,
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 30,
  },

  {
    name: "SHRIKA Carbon Front Spoiler",
    description:
      "Sport-inspired aerodynamic front spoiler designed to enhance the exterior appearance.",
    price: 15999,
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 15,
  },

  // ==================== INTERIOR ====================

  {
    name: "SHRIKA Premium Seat Covers",
    description:
      "Premium automotive seat covers with a comfortable finish and durable construction.",
    price: 12999,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 25,
  },

  {
    name: "SHRIKA Premium Steering Wheel",
    description:
      "Sport-inspired steering wheel with premium grip and ergonomic design.",
    price: 7999,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 18,
  },

  {
    name: "SHRIKA Smart Dash Camera",
    description:
      "Compact HD dashboard camera with wide-angle recording for everyday driving protection.",
    price: 8999,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 35,
  },

  // ==================== WHEELS & TYRES ====================

  {
    name: "SHRIKA Performance Alloy Wheels",
    description:
      "Lightweight 18-inch alloy wheels designed for improved handling and a sporty appearance.",
    price: 64999,
    category: "Wheels & Tyres",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 20,
  },

  {
    name: "SHRIKA Performance Tyres",
    description:
      "Premium performance tyres engineered for strong road grip, stability and comfortable driving.",
    price: 42999,
    category: "Wheels & Tyres",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 24,
  },

  // ==================== EXTERIOR ACCESSORY ====================

  {
    name: "SHRIKA Car Care Kit",
    description:
      "Complete exterior and interior car-care kit for maintaining a clean showroom finish.",
    price: 2999,
    category: "Exterior",

    // Replaced the broken 404 image URL
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",

    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    ],

    stock: 50,
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(sampleProducts);

    console.log("SHRIKA cars and parts inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();