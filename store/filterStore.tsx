import { create } from "zustand";
export type PropertyType= "house" | "apartment" | "villa" | "land" | "commercial" | "other" | null;

interface FilterState{
    search: string;
    bedrooms: number| null;
    bathrooms: number| null;
    minPrice: number| null;
    maxPrice: number| null;
    propertyType: PropertyType;

    setSearch: (search: string) => void;
    setBedrooms: (bedrooms: number) => void;
    setBathrooms: (bathrooms: number) => void;
    setMinPrice: (minPrice: number) => void;
    setMaxPrice: (maxPrice: number) => void;
    setPropertyType: (propertyType: PropertyType) => void;
    reset: () => void;
}

export const useFilterStore = create<FilterState>((set)=>({
    search: "",
    bedrooms: null,
    bathrooms: null,
    minPrice: null,
    maxPrice: null,
    propertyType: null,
    setSearch: (search: string) => set({ search }),
    setBedrooms: (bedrooms: number) => set({ bedrooms }),
    setBathrooms: (bathrooms: number) => set({ bathrooms }),
    setMinPrice: (minPrice: number) => set({ minPrice }),
    setMaxPrice: (maxPrice: number) => set({ maxPrice }),
    setPropertyType: (propertyType: PropertyType) => set({ propertyType }),
    reset: () => set({ search: "", bedrooms: null, bathrooms: null, minPrice: null, maxPrice: null, propertyType: "house" }),
}))