export const CATEGORIES = [
  { 
    name: "Yerbas", 
    icon: "🍃", 
    path: "/yerbas", 
    value: "yerbas",
    key: "yerbas" 
  },
  { 
    name: "Bombillas", 
    icon: "🥤", 
    path: "/bombillas", 
    value: "bombillas",
    key: "bombillas" 
  },
  { 
    name: "Termos", 
    icon: "🧊", 
    path: "/termos", 
    value: "termos",
    key: "termos" 
  },
  { 
    name: "Mates", 
    icon: "🧉", 
    path: "/mates", 
    value: "mates",
    key: "mates" 
  },
] as const;

export type Category = typeof CATEGORIES[number];
export type CategoryKey = Category['key'];