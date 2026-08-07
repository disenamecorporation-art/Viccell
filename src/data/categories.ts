export interface CategoryWithSubs {
  name: string;
  subs: string[];
}

export const INITIAL_CATEGORIES: CategoryWithSubs[] = [
  {
    name: 'Pines Micro-USB',
    subs: ['Universal V8', 'Samsung Serie A/J', 'Motorola / Xiaomi', 'Huawei / ZTE']
  },
  {
    name: 'Pines Tipo-C',
    subs: ['Carga Rápida 24 Pines', 'Samsung A-Series', 'Tecno & Infinix', 'Universal Tipo-C']
  },
  {
    name: 'Conectores FPC',
    subs: ['Flex de Pantalla', 'Flex de Carga Board', 'Conectores de Batería', 'Cámaras y Tactil']
  },
  {
    name: 'Pantallas / Módulos',
    subs: ['Tecnología OLED', 'Tecnología Incell', 'Vidrios Templados / Flex']
  },
  {
    name: 'ICs & Placa',
    subs: ['ICs de Carga / PMIC', 'Amplificadores de Audio', 'Filtros y Bobinas', 'Microscopios e Insumos']
  },
  {
    name: 'Cables & Insumos',
    subs: ['Cables USB de Carga', 'Flux y Estaño', 'Cintas Térmicas Kapton']
  }
];

export function getStoredCategories(): CategoryWithSubs[] {
  try {
    const saved = localStorage.getItem('viccell_categories');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return INITIAL_CATEGORIES;
}

export function saveStoredCategories(cats: CategoryWithSubs[]) {
  try {
    localStorage.setItem('viccell_categories', JSON.stringify(cats));
    window.dispatchEvent(new Event('viccell_categories_updated'));
  } catch (e) {
    // fallback
  }
}
