import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'pin-micro-v8-univ',
    sku: 'VC-MCU-001',
    title: 'Pin de Carga Micro-USB Universal V8 Reforzado (Pack Técnico)',
    brand: 'Universal',
    category: 'Pines Micro-USB',
    description: 'Pin de carga universal Micro-USB tipo V8 con patillas de anclaje reinforced en cobre de alta conductividad. Ideal para reparaciones multimarca de alta rotación.',
    compatibility: ['Alcatel', 'BLU', 'ZTE', 'Huawei Y5/Y6', 'Samsung J2/J5/J7', 'Tablets Chinas'],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.25, label: '10 a 99 uds' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.15, label: '100 a 499 uds ($15 pack 100)' },
      { minQty: 500, pricePerUnit: 0.10, label: '500+ uds ($0.10 c/u mayorista)' }
    ],
    retailPrice: 1.00,
    minWholesaleQty: 10,
    stock: 4500,
    isPopular: true,
    isHighRotation: true,
    tags: ['micro-usb', 'v8', 'alta rotacion', 'pines']
  },
  {
    id: 'pin-micro-sam-a10s',
    sku: 'VC-SAM-A10S-MICRO',
    title: 'Pin de Carga Micro-USB Samsung Galaxy A10 / A10S / M10',
    brand: 'Samsung',
    category: 'Pines Micro-USB',
    description: 'Pin de carga Micro-USB original para serie Samsung A10/A10S. Excelente tolerancia al calor durante soldadura con estación de aire caliente.',
    compatibility: ['Samsung Galaxy A10 (SM-A105)', 'Samsung Galaxy A10s (SM-A107)', 'Samsung Galaxy M10'],
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.30, label: '10 a 99 uds' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.18, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.12, label: '500+ uds' }
    ],
    retailPrice: 1.20,
    minWholesaleQty: 10,
    stock: 3200,
    isHighRotation: true,
    tags: ['samsung', 'a10', 'a10s', 'micro-usb']
  },
  {
    id: 'pin-typec-sam-a12',
    sku: 'VC-SAM-A12-TC',
    title: 'Pin de Carga Tipo-C Samsung A12 / A02S / A03S / A13',
    brand: 'Samsung',
    category: 'Pines Tipo-C',
    description: 'Conector de carga USB Tipo-C de 24 pines con soporte para Carga Rápida (Fast Charge / 15W). Contactos dorados de alta resistencia.',
    compatibility: ['Samsung Galaxy A12 (A125/A127)', 'Samsung Galaxy A02s', 'Samsung Galaxy A03s', 'Samsung Galaxy A13 4G'],
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.60, label: '10 a 99 uds (Modelo Base)' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.45, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.35, label: '500+ uds' }
    ],
    retailPrice: 2.00,
    minWholesaleQty: 10,
    stock: 2800,
    isPopular: true,
    isHighRotation: true,
    tags: ['samsung', 'tipo-c', 'a12', 'a03s', 'fast-charge']
  },
  {
    id: 'pin-typec-tecno-spark8',
    sku: 'VC-TEC-SP8-TC',
    title: 'Pin de Carga Tipo-C Tecno Spark 8P / Spark 9 Pro / Camon 18',
    brand: 'Tecno',
    category: 'Pines Tipo-C',
    description: 'Pin Tipo-C especial para telefonía Tecno Mobile. Diseñado con aislamiento térmico reforzado para prevenir cortocircuitos en líneas VBUS.',
    compatibility: ['Tecno Spark 8P', 'Tecno Spark 9 Pro', 'Tecno Camon 18/18P', 'Tecno Pova 2'],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.60, label: '10 a 99 uds (Modelo Base)' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.45, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.32, label: '500+ uds' }
    ],
    retailPrice: 2.00,
    minWholesaleQty: 10,
    stock: 2100,
    isHighRotation: true,
    tags: ['tecno', 'spark', 'tipo-c', 'camon']
  },
  {
    id: 'pin-typec-inf-hot11',
    sku: 'VC-INF-H11-TC',
    title: 'Pin de Carga Tipo-C Infinix Hot 11 / Hot 12 / Note 11 Pro',
    brand: 'Infinix',
    category: 'Pines Tipo-C',
    description: 'Pin de carga Tipo-C de 12 contactos SMD + 4 patillas DIP para anclaje firme en PCB. Compatible con carga rápida Infinix Flash Charge.',
    compatibility: ['Infinix Hot 11 / Hot 11S', 'Infinix Hot 12 / Hot 12 Play', 'Infinix Note 11 / Note 11 Pro', 'Infinix Smart 6 Plus'],
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.60, label: '10 a 99 uds (Modelo Base)' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.45, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.32, label: '500+ uds' }
    ],
    retailPrice: 2.00,
    minWholesaleQty: 10,
    stock: 1950,
    isPopular: true,
    isHighRotation: true,
    tags: ['infinix', 'hot11', 'hot12', 'tipo-c']
  },
  {
    id: 'pin-typec-xio-note10',
    sku: 'VC-XIO-RN10-TC',
    title: 'Pin de Carga Tipo-C Xiaomi Redmi Note 10 / Note 11 / Poco M3',
    brand: 'Xiaomi',
    category: 'Pines Tipo-C',
    description: 'Pin de carga Tipo-C de alta tecnología para la serie Xiaomi Redmi / Poco. Soporta la norma QuickCharge 3.0 / Power Delivery.',
    compatibility: ['Xiaomi Redmi Note 10 4G/5G', 'Xiaomi Redmi Note 11', 'Poco M3 / Poco X3 Pro', 'Xiaomi Redmi 10'],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 0.65, label: '10 a 99 uds' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.48, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.35, label: '500+ uds' }
    ],
    retailPrice: 2.20,
    minWholesaleQty: 10,
    stock: 3100,
    isPopular: true,
    isHighRotation: true,
    tags: ['xiaomi', 'redmi', 'note10', 'tipo-c', 'poco']
  },
  {
    id: 'pin-typec-sam-s20fe-highgama',
    sku: 'VC-SAM-S20FE-HG',
    title: 'Pin de Carga Tipo-C Especial Alta Gama Samsung S20 FE / S21 / Note 20',
    brand: 'Samsung',
    category: 'Pines Tipo-C',
    description: 'Pin de carga Tipo-C de Alta Gama con pines bañados en oro y soporte Super Fast Charging 25W/45W y transferencia de datos USB 3.1.',
    compatibility: ['Samsung Galaxy S20 FE', 'Samsung Galaxy S21 / S21 Ultra', 'Samsung Galaxy Note 20 Ultra'],
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 10, maxQty: 99, pricePerUnit: 1.00, label: '10 a 99 uds (Modelo Especial/Alta Gama)' },
      { minQty: 100, maxQty: 499, pricePerUnit: 0.85, label: '100 a 499 uds' },
      { minQty: 500, pricePerUnit: 0.70, label: '500+ uds' }
    ],
    retailPrice: 3.50,
    minWholesaleQty: 10,
    stock: 950,
    isPopular: false,
    isHighRotation: true,
    tags: ['samsung', 'alta gama', 's20fe', 'tipo-c', 'especial']
  },
  {
    id: 'fpc-conn-sam-a52-bat',
    sku: 'VC-FPC-SAMA52-BAT',
    title: 'Conector FPC de Batería en Placa Madre Samsung A52 / A72',
    brand: 'Samsung',
    category: 'Conectores FPC',
    description: 'Conector FPC hembra de 40 pines para soldar en la placa base (Mainboard). Restablece la comunicación de batería y termistor NTC.',
    compatibility: ['Samsung A52 (A525/A526)', 'Samsung A72 (A725)', 'Samsung A32 4G'],
    images: [
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 5, maxQty: 49, pricePerUnit: 0.90, label: '5 a 49 uds' },
      { minQty: 50, maxQty: 199, pricePerUnit: 0.70, label: '50 a 199 uds' },
      { minQty: 200, pricePerUnit: 0.50, label: '200+ uds' }
    ],
    retailPrice: 2.50,
    minWholesaleQty: 5,
    stock: 800,
    isHighRotation: false,
    tags: ['fpc', 'conector', 'samsung', 'a52', 'placa']
  },
  {
    id: 'fpc-conn-xio-rn11-display',
    sku: 'VC-FPC-XRN11-DSP',
    title: 'Conector FPC de Pantalla / Sub-Board Xiaomi Redmi Note 11',
    brand: 'Xiaomi',
    category: 'Conectores FPC',
    description: 'Conector FPC de alta densidad de pines para flex interconector de pantalla y lógica inferior en placa madre.',
    compatibility: ['Xiaomi Redmi Note 11', 'Xiaomi Redmi Note 11S', 'Poco M4 Pro 4G'],
    images: [
      'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 5, maxQty: 49, pricePerUnit: 0.95, label: '5 a 49 uds' },
      { minQty: 50, pricePerUnit: 0.65, label: '50+ uds' }
    ],
    retailPrice: 2.80,
    minWholesaleQty: 5,
    stock: 650,
    tags: ['fpc', 'xiaomi', 'redmi', 'flex', 'placa']
  },
  {
    id: 'pantalla-mod-sam-a12-incell',
    sku: 'VC-MOD-SAMA12-INCELL',
    title: 'Pantalla Módulo Completo Samsung Galaxy A12 (Calidad InCell Premium)',
    brand: 'Samsung',
    category: 'Pantallas / Módulos',
    description: 'Módulo de pantalla táctil y display LCD InCell Premium para Samsung A12. Excelente brillo (550 nits), tasa de refresco fluida y ajuste exacto a chasis.',
    compatibility: ['Samsung Galaxy A12 (SM-A125F / SM-A127F)'],
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 3, maxQty: 9, pricePerUnit: 14.50, label: '3 a 9 uds' },
      { minQty: 10, maxQty: 29, pricePerUnit: 13.00, label: '10 a 29 uds' },
      { minQty: 30, pricePerUnit: 11.80, label: '30+ uds mayorista' }
    ],
    retailPrice: 22.00,
    minWholesaleQty: 3,
    stock: 140,
    isPopular: true,
    tags: ['pantalla', 'modulo', 'samsung', 'a12', 'incell']
  },
  {
    id: 'pantalla-mod-tec-sp8p',
    sku: 'VC-MOD-TEC-SP8P',
    title: 'Módulo de Pantalla Tecno Spark 8P (Original FHD+ con Marco)',
    brand: 'Tecno',
    category: 'Pantallas / Módulos',
    description: 'Display completo con marco pre-ensamblado para Tecno Spark 8P. Garantiza una instalación rápida en taller sin riesgo de despegue de cristal.',
    compatibility: ['Tecno Spark 8P (KG7H)'],
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 3, maxQty: 9, pricePerUnit: 16.00, label: '3 a 9 uds' },
      { minQty: 10, pricePerUnit: 14.20, label: '10+ uds mayorista' }
    ],
    retailPrice: 24.00,
    minWholesaleQty: 3,
    stock: 95,
    tags: ['tecno', 'spark', 'pantalla', 'modulo', 'marco']
  },
  {
    id: 'ic-pmi632-charge',
    sku: 'VC-IC-PMI632-902',
    title: 'IC de Carga Integrado PMI632 902-00 (Qualcomm BGA Reballing)',
    brand: 'Universal',
    category: 'ICs & Placa',
    description: 'Circuito integrado PMIC de administración de carga y luz de fondo (Backlight) para procesadores Qualcomm. Producto nuevo 100% testeado.',
    compatibility: ['Xiaomi Redmi Note 7/8', 'Motorola Moto G7/G8', 'Samsung A11', 'Realme C3'],
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 5, maxQty: 19, pricePerUnit: 1.80, label: '5 a 19 uds' },
      { minQty: 20, pricePerUnit: 1.30, label: '20+ uds' }
    ],
    retailPrice: 4.00,
    minWholesaleQty: 5,
    stock: 420,
    tags: ['ic', 'pmi632', 'carga', 'qualcomm', 'micro-soldadura']
  },
  {
    id: 'insumo-estano-relife-183c',
    sku: 'VC-INS-EST-183C',
    title: 'Estaño en Pasta Relife RL-401 (183°C Sn63/Pb37 40g)',
    brand: 'Universal',
    category: 'Cables & Insumos',
    description: 'Pasta de estaño de punto de fusión medio (183°C). Formulación óptima para soldadura de pines de carga, conectores FPC y reballing de ICs.',
    compatibility: ['Uso técnico universal en Micro-soldadura y SMD'],
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 5, maxQty: 19, pricePerUnit: 3.20, label: '5 a 19 uds' },
      { minQty: 20, pricePerUnit: 2.50, label: '20+ uds' }
    ],
    retailPrice: 6.00,
    minWholesaleQty: 5,
    stock: 310,
    isPopular: true,
    tags: ['estaño', 'relife', 'insumos', 'soldadura', 'taller']
  },
  {
    id: 'insumo-pegamento-b7000-110ml',
    sku: 'VC-INS-PEG-B7000',
    title: 'Adhesivo Epóxico B-7000 Transparente 110ml para Pantallas y Tapas',
    brand: 'Universal',
    category: 'Cables & Insumos',
    description: 'Pegamento técnico flexible multiusos de secado controlado. Ideal para sellado de cristales, pantallas táctiles y marcos de smartphone.',
    compatibility: ['Pantallas', 'Tapas traseras', 'Cristales de cámara'],
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
    ],
    wholesalePrices: [
      { minQty: 6, maxQty: 23, pricePerUnit: 2.20, label: '6 a 23 uds' },
      { minQty: 24, pricePerUnit: 1.70, label: 'Caja 24+ uds' }
    ],
    retailPrice: 4.50,
    minWholesaleQty: 6,
    stock: 580,
    isHighRotation: true,
    tags: ['pegamento', 'b7000', 'pantallas', 'insumos']
  }
];
