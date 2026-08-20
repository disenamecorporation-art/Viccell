import { supabase } from '../lib/supabase';

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

    if (supabase) {
      supabase.from('categories').upsert({
        id: 'categories_config',
        categories_list: cats,
        updated_at: new Date().toISOString()
      }).then(({ error }) => {
        if (error) {
          console.warn('Error saving categories to Supabase (ignore if table not created yet):', error.message);
        }
      });
    }
  } catch (e) {
    // fallback
  }
}

export async function syncCategoriesFromSupabase() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', 'categories_config')
      .single();

    if (error) {
      console.warn('Could not load categories from Supabase (ignore if table not created yet):', error.message);
      return;
    }

    if (data && data.categories_list) {
      localStorage.setItem('viccell_categories', JSON.stringify(data.categories_list));
      window.dispatchEvent(new Event('viccell_categories_updated'));
    }
  } catch (err) {
    console.error('Error in syncCategoriesFromSupabase:', err);
  }
}

