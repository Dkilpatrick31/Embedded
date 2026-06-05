export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "Men" | "Women" | "Gear";
  collection: "flight-deck" | "atc" | "horizon" | "altimeter";
  sizes: string[];
  tag: "NEW" | "BESTSELLER" | null;
}

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const TROUSERS = ["28/30", "30/30", "32/30", "32/32", "34/32", "36/32"];

export const products: Product[] = [
  { id: "1",  name: "Mach 1 Jacket",      slug: "mach-1-jacket",      price: 285, category: "Men",   collection: "flight-deck", sizes: APPAREL,  tag: "NEW" },
  { id: "2",  name: "Contrail Hoodie",    slug: "contrail-hoodie",    price: 145, category: "Men",   collection: "atc",         sizes: APPAREL,  tag: "BESTSELLER" },
  { id: "3",  name: "Flight Deck Tee",    slug: "flight-deck-tee",    price: 65,  category: "Men",   collection: "flight-deck", sizes: APPAREL,  tag: null },
  { id: "4",  name: "Altimeter Chino",    slug: "altimeter-chino",    price: 175, category: "Men",   collection: "altimeter",   sizes: TROUSERS, tag: null },
  { id: "5",  name: "Horizon Bomber",     slug: "horizon-bomber",     price: 385, category: "Women", collection: "horizon",     sizes: APPAREL,  tag: "NEW" },
  { id: "6",  name: "ATC Crewneck",       slug: "atc-crewneck",       price: 125, category: "Women", collection: "atc",         sizes: APPAREL,  tag: null },
  { id: "7",  name: "Cockpit Vest",       slug: "cockpit-vest",       price: 195, category: "Men",   collection: "flight-deck", sizes: APPAREL,  tag: "BESTSELLER" },
  { id: "8",  name: "Runway Jogger",      slug: "runway-jogger",      price: 145, category: "Women", collection: "horizon",     sizes: APPAREL,  tag: null },
  { id: "9",  name: "Approach Pullover",  slug: "approach-pullover",  price: 165, category: "Women", collection: "atc",         sizes: APPAREL,  tag: "NEW" },
  { id: "10", name: "Clearance Cap",      slug: "clearance-cap",      price: 45,  category: "Gear",  collection: "altimeter",   sizes: ["One Size"], tag: null },
  { id: "11", name: "ILS Windbreaker",    slug: "ils-windbreaker",    price: 285, category: "Men",   collection: "horizon",     sizes: APPAREL,  tag: "BESTSELLER" },
  { id: "12", name: "Waypoint Flannel",   slug: "waypoint-flannel",   price: 125, category: "Women", collection: "flight-deck", sizes: APPAREL,  tag: null },
];

export const CATEGORIES = ["Men", "Women", "Gear"] as const;

export const COLLECTIONS = [
  { id: "flight-deck", label: "Flight Deck" },
  { id: "atc",         label: "ATC" },
  { id: "horizon",     label: "Horizon" },
  { id: "altimeter",   label: "Altimeter" },
] as const;

export const FILTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const PRICE_RANGES = [
  { id: "under-100", label: "Under $100",  min: 0,   max: 100 },
  { id: "100-200",   label: "$100 – $200", min: 100, max: 200 },
  { id: "over-200",  label: "Over $200",   min: 200, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { id: "featured",   label: "Featured" },
  { id: "newest",     label: "Newest" },
  { id: "price-asc",  label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
