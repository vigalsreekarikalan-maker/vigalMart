import { Product, Category, Order, User, Address, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    iconName: 'Smartphone',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    iconName: 'Shirt',
    itemCount: 10,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-home',
    name: 'Home & Kitchen',
    iconName: 'Home',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-books',
    name: 'Books',
    iconName: 'BookOpen',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-sports',
    name: 'Sports',
    iconName: 'Dumbbell',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-grocery',
    name: 'Grocery',
    iconName: 'ShoppingBag',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    iconName: 'Sparkles',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-toys',
    name: 'Toys & Games',
    iconName: 'Gamepad2',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-automotive',
    name: 'Automotive',
    iconName: 'Car',
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-computers',
    name: 'Computers & Accessories',
    iconName: 'Laptop',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vgm-prod-101',
    name: 'VigalPro Wireless Noise-Cancelling Headphones Max',
    brand: 'VigalAudio',
    category: 'Electronics',
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 1420,
    stock: 45,
    inStock: true,
    deliveryInfo: 'FREE Delivery by Tomorrow',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Experience immersive spatial sound with active hybrid noise cancellation, 40-hour battery stamina, ultra-soft memory foam earcups, and dual multi-device Bluetooth 5.3 connection.',
    features: [
      'Active Hybrid Noise Cancellation up to 38dB',
      '40-hour Playtime with fast USB-C charge (10 min charge = 5 hrs)',
      'Custom 40mm Titanium Dynamic Drivers',
      'Multipoint Connection (Switch seamlessly between Phone & Laptop)'
    ],
    specifications: {
      'Bluetooth Version': '5.3',
      'Battery Capacity': '800 mAh',
      'Charging Port': 'USB Type-C',
      'Weight': '250g',
      'Warranty': '1 Year VigalShree Brand Warranty'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    isTrending: true,
    isDealOfDay: true,
    isBestSeller: true,
    sku: 'VGM-AUDIO-101',
    approved: true
  },
  {
    id: 'vgm-prod-102',
    name: 'VigalFit Ultra Smartwatch 1.96" HD AMOLED',
    brand: 'VigalWear',
    category: 'Electronics',
    price: 1999,
    originalPrice: 3999,
    discountPercentage: 50,
    rating: 4.6,
    reviewCount: 890,
    stock: 30,
    inStock: true,
    deliveryInfo: 'FREE Delivery in 2 Days',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Stay connected and track your health with 1.96-inch Always-On AMOLED screen, Bluetooth calling, SpO2 & 24/7 Heart Rate monitoring, and 100+ fitness workout modes.',
    features: [
      '1.96" Always-On AMOLED Display with 600 nits brightness',
      'Single-chip Bluetooth Calling with AI noise reduction mic',
      'IP68 Water & Dust Resistant construction',
      '7 Days normal usage / 15 days standby battery life'
    ],
    specifications: {
      'Display Size': '1.96 Inch AMOLED',
      'Water Resistance': 'IP68',
      'Sensors': 'SpO2, Optical Heart Rate, Accelerometer',
      'Compatibility': 'Android & iOS'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    isTrending: true,
    isDealOfDay: true,
    isBestSeller: true,
    sku: 'VGM-WATCH-102',
    approved: true
  },
  {
    id: 'vgm-prod-103',
    name: 'VigalBook Slim 15 Laptop Core i7 16GB RAM 512GB SSD',
    brand: 'VigalBook',
    category: 'Computers & Accessories',
    price: 54999,
    originalPrice: 69999,
    discountPercentage: 21,
    rating: 4.7,
    reviewCount: 310,
    stock: 12,
    inStock: true,
    deliveryInfo: 'FREE Express Delivery',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Sleek aluminum chassis laptop engineered for high productivity, fluid multitasking, back-lit keyboard, Wi-Fi 6, and fingerprint security.',
    features: [
      'Intel Core i7 12th Gen High Efficiency Processor',
      '16GB LPDDR5 RAM & 512GB NVMe M.2 SSD',
      '15.6" FHD IPS Anti-Glare 100% sRGB Display',
      'Fingerprint Scanner built into Power Button'
    ],
    specifications: {
      'Processor': 'Intel Core i7-1255U',
      'RAM': '16GB DDR5',
      'Storage': '512GB NVMe SSD',
      'OS': 'Windows 11 Home'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    isTrending: true,
    isBestSeller: true,
    sku: 'VGM-LAP-103',
    approved: true
  },
  {
    id: 'vgm-prod-104',
    name: 'VigalCam 4K Action Camera with Waterproof Housing',
    brand: 'VigalCam',
    category: 'Electronics',
    price: 4299,
    originalPrice: 6999,
    discountPercentage: 38,
    rating: 4.4,
    reviewCount: 412,
    stock: 25,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
    description: 'Capture thrilling adventures in crystal clear 4K 60fps video with 6-axis Electronic Image Stabilization (EIS) and 30m underwater housing.',
    features: [
      '4K 60fps & 20MP High Precision Stills',
      'Dual Screen: Front 1.4" preview + Rear 2.0" Touch Screen',
      'Wi-Fi Smartphone Control App',
      'Includes 15+ Accessory Mounting Kits'
    ],
    specifications: {
      'Resolution': '4K @ 60fps',
      'Waterproof Depth': 'Up to 30 meters with case',
      'Battery': 'Dual 1350mAh batteries included'
    },
    sellerId: 'seller-2',
    sellerName: 'Apex Electronics Hub',
    isNewRelease: true,
    sku: 'VGM-CAM-104',
    approved: true
  },
  {
    id: 'vgm-prod-105',
    name: 'VigalDenim Men Slim Fit Stretch Jeans - Dark Indigo',
    brand: 'VigalStyle',
    category: 'Fashion',
    price: 1299,
    originalPrice: 2499,
    discountPercentage: 48,
    rating: 4.5,
    reviewCount: 630,
    stock: 80,
    inStock: true,
    deliveryInfo: 'FREE Delivery in 3 Days',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    description: 'Premium cotton elastane stretch jeans designed for maximum comfort, modern slim silhoette, and lasting dye fastness.',
    features: [
      '98% Cotton, 2% Elastane soft stretch fabric',
      'Classic 5-pocket design with reinforced rivets',
      'Zip fly with branded button closure',
      'Machine washable pre-shrunk denim'
    ],
    specifications: {
      'Fit': 'Slim Fit',
      'Fabric': 'Cotton Stretch Denim',
      'Pattern': 'Solid Dark Indigo Wash'
    },
    sellerId: 'seller-3',
    sellerName: 'Urban Trend Apparel',
    isBestSeller: true,
    sku: 'VGM-FASH-105',
    approved: true
  },
  {
    id: 'vgm-prod-106',
    name: 'VigalKnit Women Pure Cotton Breathable Casual Dress',
    brand: 'VigalStyle',
    category: 'Fashion',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    rating: 4.6,
    reviewCount: 520,
    stock: 50,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    description: 'Elegant A-line floral print casual dress crafted from lightweight 100% combed cotton, ideal for everyday summer outings.',
    features: [
      '100% Soft Combed Cotton',
      'Breathable weave with vibrant color retaining dyes',
      'Concealed side pockets and matching waist tie belt'
    ],
    specifications: {
      'Sleeve': 'Half Sleeve',
      'Neckline': 'V-Neck',
      'Length': 'Midi'
    },
    sellerId: 'seller-3',
    sellerName: 'Urban Trend Apparel',
    isTrending: true,
    sku: 'VGM-FASH-106',
    approved: true
  },
  {
    id: 'vgm-prod-107',
    name: 'VigalSneakers Unisex Retro Runner Casual Shoes',
    brand: 'VigalFootwear',
    category: 'Fashion',
    price: 2199,
    originalPrice: 3999,
    discountPercentage: 45,
    rating: 4.7,
    reviewCount: 940,
    stock: 65,
    inStock: true,
    deliveryInfo: 'FREE Delivery by Tomorrow',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    description: 'Heritage lifestyle sneakers with cloud-soft memory foam cushioning, durable anti-slip rubber outsole, and suede overlays.',
    features: [
      'Soft Memory Foam footbed for all-day cushioning',
      'High traction rubber outsole',
      'Breathable mesh and synthetic suede upper'
    ],
    specifications: {
      'Upper Material': 'Mesh & Synthetic Suede',
      'Closure': 'Lace-Up',
      'Sole': 'TPR Anti-Skid Rubber'
    },
    sellerId: 'seller-3',
    sellerName: 'Urban Trend Apparel',
    isBestSeller: true,
    isDealOfDay: true,
    sku: 'VGM-FOOT-107',
    approved: true
  },
  {
    id: 'vgm-prod-108',
    name: 'VigalChef 750W 4-Jar Heavy Duty Mixer Grinder',
    brand: 'VigalHome',
    category: 'Home & Kitchen',
    price: 3299,
    originalPrice: 5999,
    discountPercentage: 45,
    rating: 4.8,
    reviewCount: 1850,
    stock: 40,
    inStock: true,
    deliveryInfo: 'FREE Express Delivery',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80',
    description: 'Powerful 750-Watt copper motor mixer grinder with 4 food-grade stainless steel jars for chutney, wet grinding, dry spices, and juicing.',
    features: [
      '100% Copper Winding 750W Motor with Overload Protector',
      '4 Stainless Steel Jars (Juicer, Wet, Dry, Chutney)',
      'Sharp SS 304 Blades with flow breakers',
      '3-Speed Control with Pulse function'
    ],
    specifications: {
      'Wattage': '750 Watts',
      'No. of Jars': '4',
      'Warranty': '2 Years Motor Warranty'
    },
    sellerId: 'seller-4',
    sellerName: 'Home Essentials Mart',
    isBestSeller: true,
    isDealOfDay: true,
    sku: 'VGM-HOME-108',
    approved: true
  },
  {
    id: 'vgm-prod-109',
    name: 'VigalFry Digital Air Fryer 4.5L Stainless Steel',
    brand: 'VigalHome',
    category: 'Home & Kitchen',
    price: 4999,
    originalPrice: 8999,
    discountPercentage: 44,
    rating: 4.7,
    reviewCount: 1120,
    stock: 22,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp fried taste with up to 90% less oil! Features 360° rapid air circulation, touch screen panel with 8 preset cooking functions.',
    features: [
      '360° Rapid Air Circulation Technology',
      'Digital Touch Screen with 8 Presets',
      'Non-stick FDA Approved Dishwasher Safe Basket',
      'Auto Shut-off with Cool-Touch handle'
    ],
    specifications: {
      'Capacity': '4.5 Liters',
      'Power': '1400W',
      'Temperature Range': '80°C - 200°C'
    },
    sellerId: 'seller-4',
    sellerName: 'Home Essentials Mart',
    isTrending: true,
    sku: 'VGM-HOME-109',
    approved: true
  },
  {
    id: 'vgm-prod-110',
    name: 'VigalPure 100% Organic Cold-Pressed Virgin Coconut Oil 1L',
    brand: 'VigalOrganics',
    category: 'Grocery',
    price: 499,
    originalPrice: 750,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 2400,
    stock: 120,
    inStock: true,
    deliveryInfo: 'FREE Delivery on orders above ₹499',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80',
    description: 'Raw, unrefined, 100% natural cold-pressed virgin coconut oil extracted from fresh coconut milk without heat processing or chemicals.',
    features: [
      '100% Pure & Unrefined Cold Pressed',
      'Rich in Lauric Acid and Medium Chain Triglycerides (MCTs)',
      'Ideal for Cooking, Hair Nourishment, & Skin Moisturizing'
    ],
    specifications: {
      'Volume': '1 Litre',
      'Extraction Method': 'Cold-Pressed',
      'Shelf Life': '12 Months'
    },
    sellerId: 'seller-5',
    sellerName: 'Green Harvest Organics',
    isBestSeller: true,
    sku: 'VGM-GROC-110',
    approved: true
  },
  {
    id: 'vgm-prod-111',
    name: 'VigalGlow Vitamin C & Hyaluronic Acid Face Serum 30ml',
    brand: 'VigalDerma',
    category: 'Beauty & Personal Care',
    price: 699,
    originalPrice: 1299,
    discountPercentage: 46,
    rating: 4.6,
    reviewCount: 1320,
    stock: 75,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    description: 'Dermatologist tested skin brightening serum with 20% Vitamin C, Ferulic Acid, and Hyaluronic Acid for collagen boost and dark spot reduction.',
    features: [
      '20% Stabilized Vitamin C + 1% Hyaluronic Acid',
      'Reduces pigmentation and boosts radiance',
      'Free from Paraben, Sulfate, and Synthetic Fragrances'
    ],
    specifications: {
      'Volume': '30ml',
      'Skin Type': 'All Skin Types',
      'Formulation': 'Lightweight Serum'
    },
    sellerId: 'seller-5',
    sellerName: 'Green Harvest Organics',
    isTrending: true,
    sku: 'VGM-BEAUTY-111',
    approved: true
  },
  {
    id: 'vgm-prod-112',
    name: 'VigalFit Adjustable Cast Iron Dumbbell Set 20KG',
    brand: 'VigalSports',
    category: 'Sports',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 780,
    stock: 20,
    inStock: true,
    deliveryInfo: 'Heavy Goods Delivery (2-3 Days)',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    description: 'Complete home workout weight set featuring solid cast iron plates, textured chrome handles, and heavy duty spinlock collars.',
    features: [
      'Includes 4x2.5kg, 4x1.25kg, 4x0.5kg plates + 2 handles',
      'Rust-resistant enamel coating',
      'Non-slip knurled grip handles'
    ],
    specifications: {
      'Total Weight': '20 Kilograms',
      'Material': 'Cast Iron & Chrome',
      'Includes': 'Carry Case & Collars'
    },
    sellerId: 'seller-2',
    sellerName: 'Apex Electronics Hub',
    isBestSeller: true,
    sku: 'VGM-SPORT-112',
    approved: true
  },
  {
    id: 'vgm-prod-113',
    name: 'The Art of Modern Web Architecture (Hardcover)',
    brand: 'VigalPublishing',
    category: 'Books',
    price: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    rating: 4.9,
    reviewCount: 410,
    stock: 55,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Comprehensive guide to building resilient full-stack applications, microservices, cloud deployments, and high-performance frontend interfaces.',
    features: [
      '500+ Pages of Deep Engineering Best Practices',
      'Covers React, Node.js, Distributed Systems, SQL & NoSQL',
      'Includes Digital Code Repository Access'
    ],
    specifications: {
      'Author': 'Dr. K. Vigalshree',
      'Language': 'English',
      'Publisher': 'Vigal Tech Press'
    },
    sellerId: 'seller-2',
    sellerName: 'Apex Electronics Hub',
    isNewRelease: true,
    sku: 'VGM-BOOK-113',
    approved: true
  },
  {
    id: 'vgm-prod-114',
    name: 'VigalMechanical RGB Gaming Keyboard (Blue Switches)',
    brand: 'VigalGaming',
    category: 'Computers & Accessories',
    price: 2799,
    originalPrice: 4999,
    discountPercentage: 44,
    rating: 4.7,
    reviewCount: 1050,
    stock: 35,
    inStock: true,
    deliveryInfo: 'FREE Delivery by Tomorrow',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Full-size mechanical gaming keyboard with clicky tactile blue switches, per-key RGB backlighting, braided cable, and aluminum top frame.',
    features: [
      'Tactile & Clicky Mechanical Blue Switches (50M keystrokes)',
      '18 Preset Dynamic RGB Lighting Modes',
      '100% Anti-Ghosting N-Key Rollover',
      'Dedicated Multimedia Scroll Wheel'
    ],
    specifications: {
      'Switch Type': 'Mechanical Blue',
      'Interface': 'USB Gold Plated Braided Cable',
      'Key Lifetime': '50 Million Clicks'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    isTrending: true,
    sku: 'VGM-COMP-114',
    approved: true
  },
  {
    id: 'vgm-prod-115',
    name: 'VigalPro Wireless Ergonomic Precision Mouse',
    brand: 'VigalGaming',
    category: 'Computers & Accessories',
    price: 1199,
    originalPrice: 2299,
    discountPercentage: 47,
    rating: 4.6,
    reviewCount: 880,
    stock: 60,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    description: 'Rechargeable wireless ergonomic mouse designed to reduce wrist strain, featuring quiet clicks and 4000 DPI optical precision.',
    features: [
      'Ergonomic thumb rest design',
      'Dual mode Bluetooth + 2.4G Receiver',
      'Built-in 500mAh Lithium Rechargeable battery'
    ],
    specifications: {
      'DPI Range': '800 / 1200 / 2400 / 4000 DPI',
      'Buttons': '6 Silent Click Buttons'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    sku: 'VGM-COMP-115',
    approved: true
  },
  {
    id: 'vgm-prod-116',
    name: 'VigalTea Organic Earl Grey Premium Whole Leaf Tea 250g',
    brand: 'VigalBrew',
    category: 'Grocery',
    price: 349,
    originalPrice: 599,
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 320,
    stock: 100,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-picked Darjeeling black tea leaves blended with natural cold-pressed oil of Italian bergamot oranges.',
    features: [
      '100% Whole Loose Leaf Black Tea',
      'Natural Italian Bergamot Flavor',
      'Vacuum Sealed Tin Can Container'
    ],
    specifications: {
      'Weight': '250 Grams',
      'Type': 'Loose Leaf Tea'
    },
    sellerId: 'seller-5',
    sellerName: 'Green Harvest Organics',
    sku: 'VGM-GROC-116',
    approved: true
  },
  {
    id: 'vgm-prod-117',
    name: 'VigalLuggage Hardside Expandable Spinner Cabin Bag 20"',
    brand: 'VigalTravel',
    category: 'Fashion',
    price: 2999,
    originalPrice: 6499,
    discountPercentage: 53,
    rating: 4.7,
    reviewCount: 730,
    stock: 30,
    inStock: true,
    deliveryInfo: 'FREE Delivery in 2 Days',
    image: 'https://images.unsplash.com/photo-1565026057447-b88e4091582c?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-lightweight durable polycarbonate hardshell trolley bag with 360-degree dual spinner wheels and recessed TSA lock.',
    features: [
      '100% Polycarbonate Scratch Resistant Shell',
      'Embedded 3-digit TSA Combination Lock',
      'Smooth 8-wheel multi-directional silent spinners'
    ],
    specifications: {
      'Size': '20 Inch (Cabin Approved)',
      'Capacity': '45 Liters'
    },
    sellerId: 'seller-3',
    sellerName: 'Urban Trend Apparel',
    isDealOfDay: true,
    sku: 'VGM-BAG-117',
    approved: true
  },
  {
    id: 'vgm-prod-118',
    name: 'VigalSound 50W Portable Bluetooth Speaker with RGB Light',
    brand: 'VigalAudio',
    category: 'Electronics',
    price: 3199,
    originalPrice: 5999,
    discountPercentage: 46,
    rating: 4.6,
    reviewCount: 910,
    stock: 38,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
    description: 'Booming punchy bass 50W outdoor portable speaker with beat-synced RGB LED party lights, IPX7 waterproof, and TWS stereo pairing.',
    features: [
      '50W Peak Audio Output with Dual Bass Radiators',
      'IPX7 100% Waterproof & Dustproof',
      '24 Hours Playback time @ 50% volume',
      'Dynamic Party Light effects'
    ],
    specifications: {
      'Battery': '6000 mAh',
      'Connectivity': 'Bluetooth 5.2, AUX, TF Card, USB'
    },
    sellerId: 'seller-1',
    sellerName: 'VigalTech Solutions',
    isTrending: true,
    sku: 'VGM-AUDIO-118',
    approved: true
  },
  {
    id: 'vgm-prod-119',
    name: 'VigalMat Non-Slip TPE Yoga & Fitness Mat 6mm',
    brand: 'VigalSports',
    category: 'Sports',
    price: 899,
    originalPrice: 1799,
    discountPercentage: 50,
    rating: 4.8,
    reviewCount: 1140,
    stock: 90,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80',
    description: 'Eco-friendly non-toxic TPE dual-textured yoga mat with laser engraved alignment lines and shoulder carrying strap included.',
    features: [
      'High Density Cushioning TPE material',
      'Anti-slip double sided grip surface',
      'Body Alignment grid system printed'
    ],
    specifications: {
      'Thickness': '6mm Extra Thick',
      'Dimensions': '183cm x 61cm'
    },
    sellerId: 'seller-2',
    sellerName: 'Apex Electronics Hub',
    isBestSeller: true,
    sku: 'VGM-SPORT-119',
    approved: true
  },
  {
    id: 'vgm-prod-120',
    name: 'VigalShine Professional 2000W Ionic Hair Dryer',
    brand: 'VigalDerma',
    category: 'Beauty & Personal Care',
    price: 1899,
    originalPrice: 3499,
    discountPercentage: 45,
    rating: 4.5,
    reviewCount: 620,
    stock: 45,
    inStock: true,
    deliveryInfo: 'FREE Delivery',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    description: 'Fast drying salon grade 2000W AC motor dryer with negative ion technology to seal moisture and eliminate frizz.',
    features: [
      '2000W High Performance AC Motor',
      '3 Heat / 2 Speed settings + Cool Shot button',
      'Includes Concentrator Nozzle & Diffuser attachment'
    ],
    specifications: {
      'Power': '2000 Watts',
      'Cord Length': '2.5 Meters'
    },
    sellerId: 'seller-4',
    sellerName: 'Home Essentials Mart',
    sku: 'VGM-BEAUTY-120',
    approved: true
  }
];

// Add extra 30 realistic items to reach 50+ total products
for (let i = 21; i <= 52; i++) {
  const cats = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Grocery', 'Beauty & Personal Care', 'Toys & Games', 'Automotive', 'Computers & Accessories'];
  const category = cats[(i % cats.length)];
  const basePrice = Math.floor(Math.random() * 4500) + 299;
  const discount = Math.floor(Math.random() * 35) + 15;
  const originalPrice = Math.round(basePrice / (1 - discount / 100));
  
  INITIAL_PRODUCTS.push({
    id: `vgm-prod-1${i}`,
    name: `VigalShree Premium ${category} Product Item #${i}`,
    brand: `VigalBrand ${((i % 5) + 1)}`,
    category,
    price: basePrice,
    originalPrice,
    discountPercentage: discount,
    rating: parseFloat((4 + Math.random() * 0.9).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 800) + 50,
    stock: Math.floor(Math.random() * 50) + 5,
    inStock: true,
    deliveryInfo: i % 2 === 0 ? 'FREE Delivery by Tomorrow' : 'FREE Standard Delivery',
    image: `https://images.unsplash.com/photo-${1500000000000 + (i * 1234567) % 90000000000}?w=600&auto=format&fit=crop&q=80`,
    description: `High quality official vigalMart product with verified durability, warranty, and customer satisfaction guarantee. Designed for daily excellence.`,
    features: [
      'High durability build quality',
      'Official vigalMart Verified Seal',
      'Full manufacturer warranty included'
    ],
    specifications: {
      'Brand': `VigalBrand ${((i % 5) + 1)}`,
      'Model': `VGM-${i}`,
      'Warranty': '1 Year'
    },
    sellerId: `seller-${(i % 5) + 1}`,
    sellerName: `Vigal Partner Seller ${(i % 5) + 1}`,
    sku: `VGM-GEN-${i}`,
    approved: true,
    isTrending: i % 4 === 0,
    isBestSeller: i % 5 === 0
  });
}

export const INITIAL_USERS: User[] = [
  {
    id: 'user-buyer-1',
    name: 'Aarav Sharma',
    email: 'buyer@vigalshree.com',
    role: 'BUYER',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-seller-1',
    name: 'VigalTech Solutions',
    email: 'seller@vigalshree.com',
    role: 'SELLER',
    phone: '+91 98765 11223',
    sellerBusinessName: 'VigalTech Solutions Private Limited',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-admin-1',
    name: 'System Admin',
    email: 'admin@vigalshree.com',
    role: 'ADMIN',
    phone: '+91 99000 00000',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Aarav Sharma',
    street: 'Plot No 42, Green Avenue, Tech City Sector 4',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600028',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Aarav Sharma (Office)',
    street: 'Vigal Tech Park, Block C Floor 3',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600096',
    country: 'India',
    phone: '+91 98765 43210',
    isDefault: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'VGM-2026-000101',
    userId: 'user-buyer-1',
    userEmail: 'buyer@vigalshree.com',
    userName: 'Aarav Sharma',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        price: INITIAL_PRODUCTS[0].price
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        price: INITIAL_PRODUCTS[1].price
      }
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'UPI_DEMO',
    paymentStatus: 'COMPLETED',
    itemsTotal: 4498,
    discountTotal: 1000,
    deliveryFee: 0,
    tax: 224,
    grandTotal: 4722,
    status: 'OUT_FOR_DELIVERY',
    orderDate: '2026-08-07 14:30',
    estimatedDelivery: 'Today by 8:00 PM',
    statusHistory: [
      { status: 'PLACED', timestamp: '2026-08-07 14:30', description: 'Order placed successfully on vigalMart' },
      { status: 'CONFIRMED', timestamp: '2026-08-07 15:00', description: 'Order confirmed by seller VigalTech Solutions' },
      { status: 'PROCESSING', timestamp: '2026-08-07 18:20', description: 'Items packed and labeled at Chennai Fulfillment Center' },
      { status: 'SHIPPED', timestamp: '2026-08-08 06:10', description: 'In transit with Express Logistics Hub' },
      { status: 'OUT_FOR_DELIVERY', timestamp: '2026-08-08 09:45', description: 'Out for delivery with courier agent Rajesh (+91 98980 12345)' }
    ]
  },
  {
    id: 'VGM-2026-000102',
    userId: 'user-buyer-1',
    userEmail: 'buyer@vigalshree.com',
    userName: 'Aarav Sharma',
    items: [
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        price: INITIAL_PRODUCTS[6].price
      }
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'CARD_DEMO',
    paymentStatus: 'COMPLETED',
    itemsTotal: 2199,
    discountTotal: 0,
    deliveryFee: 0,
    tax: 110,
    grandTotal: 2309,
    status: 'DELIVERED',
    orderDate: '2026-08-03 10:15',
    estimatedDelivery: '2026-08-05',
    statusHistory: [
      { status: 'PLACED', timestamp: '2026-08-03 10:15', description: 'Order placed' },
      { status: 'CONFIRMED', timestamp: '2026-08-03 11:00', description: 'Confirmed' },
      { status: 'SHIPPED', timestamp: '2026-08-04 08:30', description: 'Shipped' },
      { status: 'DELIVERED', timestamp: '2026-08-05 16:20', description: 'Delivered to recipient at front desk' }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'vgm-prod-101',
    userId: 'user-buyer-1',
    userName: 'Aarav Sharma',
    rating: 5,
    comment: 'Exceptional noise cancellation! Built quality is premium and battery lasts forever. vigalMart delivered it in under 24 hours!',
    date: '2026-08-06',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'vgm-prod-101',
    userId: 'user-2',
    userName: 'Priya Sundaram',
    rating: 5,
    comment: 'Super crisp sound stage and very comfortable for long coding sessions.',
    date: '2026-08-02',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'vgm-prod-108',
    userId: 'user-3',
    userName: 'Rohan Verma',
    rating: 5,
    comment: 'Grinds tough spices effortlessly! Very sturdy stainless steel jars.',
    date: '2026-08-01',
    verifiedPurchase: true
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Welcome to vigalMart',
    subtitle: 'Shop Smart. Shop Everything.',
    badge: 'GRAND SEASONAL SALE',
    discountText: 'Up to 70% OFF across Top Electronics & Fashion',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'SHOP NOW',
    ctaLink: '/search',
    secondaryCtaText: 'EXPLORE DEALS',
    bgGradient: 'from-blue-900/90 via-slate-900/80 to-slate-950/90'
  },
  {
    id: 2,
    title: 'Next-Gen Smart Electronics',
    subtitle: 'Upgrade your tech setup with certified vigalMart products',
    badge: 'NEW ARRIVALS 2026',
    discountText: 'Free Express Shipping + Instant Bank Discount',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'EXPLORE ELECTRONICS',
    ctaLink: '/search?category=Electronics',
    secondaryCtaText: 'BEST SELLERS',
    bgGradient: 'from-amber-950/90 via-slate-900/80 to-slate-950/90'
  },
  {
    id: 3,
    title: 'Trendy Summer Fashion & Footwear',
    subtitle: 'Unbeatable prices on premium apparel and daily essentials',
    badge: 'TRENDING COLLECTIONS',
    discountText: 'Buy 2 Get Extra 15% Cashback',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    ctaText: 'SHOP FASHION',
    ctaLink: '/search?category=Fashion',
    secondaryCtaText: 'VIEW TODAY DEALS',
    bgGradient: 'from-emerald-950/90 via-slate-900/80 to-slate-950/90'
  }
];
