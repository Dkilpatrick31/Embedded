export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "Men" | "Women" | "Gear";
  collection: "flight-deck" | "atc" | "horizon" | "altimeter";
  sizes: string[];
  tag: "NEW" | "BESTSELLER" | null;
  description: string;
}

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const TROUSERS = ["28/30", "30/30", "32/30", "32/32", "34/32", "36/32"];

export const products: Product[] = [
  {
    id: "1", name: "Mach 1 Jacket", slug: "mach-1-jacket", price: 285,
    category: "Men", collection: "flight-deck", sizes: APPAREL, tag: "NEW",
    description: "Engineered at the intersection of cockpit discipline and urban utility. Water-resistant technical shell with a tailored silhouette that moves with intent. A flight jacket redrawn for those who operate between worlds.",
  },
  {
    id: "2", name: "Contrail Hoodie", slug: "contrail-hoodie", price: 145,
    category: "Men", collection: "atc", sizes: APPAREL, tag: "BESTSELLER",
    description: "Named for the vapour trails left behind at altitude. Heavyweight cotton fleece with a close-fitting hood and clean seams that honour the minimal aesthetic. Built for extended wear from preflight brief to post-operations.",
  },
  {
    id: "3", name: "Flight Deck Tee", slug: "flight-deck-tee", price: 65,
    category: "Men", collection: "flight-deck", sizes: APPAREL, tag: null,
    description: "The foundation of every Embedded layering system. Precision-cut from a mid-weight cotton jersey engineered for warmth management across altitude changes. A standard-issue piece that earns its keep on every mission.",
  },
  {
    id: "4", name: "Altimeter Chino", slug: "altimeter-chino", price: 175,
    category: "Men", collection: "altimeter", sizes: TROUSERS, tag: null,
    description: "Cut from a Japanese stretch-twill that reads as formal but performs like technical wear. Slim-tapered from seat to hem with internal waistband detailing that references instrument panel tolerances. Built to move through every environment.",
  },
  {
    id: "5", name: "Horizon Bomber", slug: "horizon-bomber", price: 385,
    category: "Women", collection: "horizon", sizes: APPAREL, tag: "NEW",
    description: "Named for the artificial horizon — the instrument that defines orientation in disorienting conditions. A satin shell with ribbed cuffs and collar that grounds it in the original flight jacket lineage. Interior mesh lining for temperature management at altitude.",
  },
  {
    id: "6", name: "ATC Crewneck", slug: "atc-crewneck", price: 125,
    category: "Women", collection: "atc", sizes: APPAREL, tag: null,
    description: "Designed in the tradition of those who manage the space between earth and sky. A structured ribbed neck and substantial fabric weight give it a quiet authority. Garment-washed for a settled-in feel from the very first wear.",
  },
  {
    id: "7", name: "Cockpit Vest", slug: "cockpit-vest", price: 195,
    category: "Men", collection: "flight-deck", sizes: APPAREL, tag: "BESTSELLER",
    description: "A mid-layer engineered for maximum utility with a minimum outer profile. Channels along the front panel reference cockpit instrumentation layouts. Fills the gap between base layer and outer shell without adding bulk.",
  },
  {
    id: "8", name: "Runway Jogger", slug: "runway-jogger", price: 145,
    category: "Women", collection: "horizon", sizes: APPAREL, tag: null,
    description: "Track-inspired construction with a precision taper from knee to ankle. French terry interior maintains structure while allowing unrestricted stride. A track pant reconsidered through the aviation aesthetic.",
  },
  {
    id: "9", name: "Approach Pullover", slug: "approach-pullover", price: 165,
    category: "Women", collection: "atc", sizes: APPAREL, tag: "NEW",
    description: "Designed for the descent — when conditions clarify and the path becomes visible. Thermal-brushed interior against a smooth exterior surface for warmth without added weight. Drop-shoulder construction allows unrestricted layering.",
  },
  {
    id: "10", name: "Clearance Cap", slug: "clearance-cap", price: 45,
    category: "Gear", collection: "altimeter", sizes: ["One Size"], tag: null,
    description: "Our most reduced expression of the Embedded identity. Six-panel structured crown with a precision-curved brim and metal pin buckle closure. A minimum-viable accessory with maximum staying power.",
  },
  {
    id: "11", name: "ILS Windbreaker", slug: "ils-windbreaker", price: 285,
    category: "Men", collection: "horizon", sizes: APPAREL, tag: "BESTSELLER",
    description: "Named for the instrument landing system that guides aircraft through low visibility. An ultralight technical shell with taped seams, a packable chest pocket, and a clean silhouette. Your primary outer defence layer for any flight environment.",
  },
  {
    id: "12", name: "Waypoint Flannel", slug: "waypoint-flannel", price: 125,
    category: "Women", collection: "flight-deck", sizes: APPAREL, tag: null,
    description: "Every waypoint is a checkpoint — a moment of orientation on a longer journey. Brushed flannel in a grid pattern referencing navigation charts, with aviation-derived colourblocking at the yoke. Chest pocket with internal card slot for essentials.",
  },
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
