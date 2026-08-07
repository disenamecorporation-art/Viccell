export type StoreMode = 'mayorista' | 'minorista';

export type ActiveTab = 
  | 'home' 
  | 'tienda-mayorista' 
  | 'tienda-minorista' 
  | 'servicios' 
  | 'envios' 
  | 'tracking'
  | 'contacto';

export type TrackingPhase = 'COTIZADO' | 'EN PROCESO' | 'DESPACHADO';

export interface TrackingOrder {
  id: string;
  code: string; // e.g. "20517462"
  clientName: string;
  clientEmail: string;
  projectName: string;
  phase: TrackingPhase;
  createdAt: string;
  updatedAt: string;
  itemsDescription: string;
  totalAmount: number;
  notes?: string;
  carrier?: string;
}

export type Brand =  
  | 'Samsung' 
  | 'Xiaomi' 
  | 'Tecno' 
  | 'Infinix' 
  | 'Apple' 
  | 'Motorola' 
  | 'Huawei' 
  | 'Universal';

export type Category = 
  | 'Pines Micro-USB' 
  | 'Pines Tipo-C' 
  | 'Conectores FPC' 
  | 'Pantallas / Módulos' 
  | 'ICs & Placa' 
  | 'Cables & Insumos';

export interface PriceTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  label?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  brand: Brand;
  category: Category;
  description: string;
  compatibility: string[];
  images: string[];
  wholesalePrices: PriceTier[];
  retailPrice: number;
  minWholesaleQty: number;
  stock: number;
  isPopular?: boolean;
  isHighRotation?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  mode: StoreMode;
  unitPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface DispatchForm {
  fullName: string;
  idNumber: string;
  email: string;
  phone: string;
  agency: 'MRW' | 'Zoom' | 'Tealca';
  state: string;
  city: string;
  agencyAddress: string;
  idPhotoName?: string;
}

export interface AdBannerItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  tabTarget: ActiveTab;
  modeTarget?: StoreMode;
}
