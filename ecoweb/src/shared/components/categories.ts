export const CATEGORIES = [
  { 
    name: "Yerbas", 
    icon: "🍃", 
    path: "/hierbas", 
    value: "Hierbas",
    key: "hierbas" 
  },
  { 
    name: "Bombillas", 
    icon: "🥤", 
    path: "/bombillas", 
    value: "Bombillas",
    key: "bombillas" 
  },
  { 
    name: "Termos", 
    icon: "🧊", 
    path: "/termos", 
    value: "Termos",
    key: "termos" 
  },
  { 
    name: "Mates", 
    icon: "🧉", 
    path: "/mates", 
    value: "Mates",
    key: "mates" 
  },
] as const;

export type Category = typeof CATEGORIES[number];
export type CategoryKey = Category['key'];