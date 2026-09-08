export const NAV_LINKS = [
  { label: "Shop", to: "/#shop" },
  { label: "Collections", to: "/#lookbook" },
  { label: "Editorial", to: "/#story" },
  { label: "About", to: "/#about" },
];

export const CATEGORIES = ["All", "New", "Essentials", "Accessories", "Collection"];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const PRODUCTS = [
  {
    id: "p01",
    name: "Weightless Wool Coat",
    category: "New",
    price: 890,
    oldPrice: null,
    rating: 4.8,
    tags: ["outerwear", "wool"],
    colors: ["Stone", "Ink", "Umber"],
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=1000&q=80",
    description:
      "Cut from double-faced Italian wool, this coat holds its shape without weight. A quiet study in proportion, built for a decade of wear.",
  },
  {
    id: "p02",
    name: "Structured Canvas Tote",
    category: "Accessories",
    price: 320,
    oldPrice: null,
    rating: 4.9,
    tags: ["bag", "canvas"],
    colors: ["Sand", "Ink"],
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
    description:
      "Waxed canvas and vegetable-tanned leather trims, hand-finished. Room enough for a day's work, structured enough to hold it.",
  },
  {
    id: "p03",
    name: "Silk Column Slip",
    category: "Collection",
    price: 540,
    oldPrice: 640,
    rating: 4.7,
    tags: ["silk", "eveningwear"],
    colors: ["Bone", "Charcoal"],
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    description:
      "Bias-cut mulberry silk that moves with the body rather than against it. From the Quiet Hours collection.",
  },
  {
    id: "p04",
    name: "Ribbed Cashmere Sweater",
    category: "Essentials",
    price: 410,
    oldPrice: null,
    rating: 4.9,
    tags: ["cashmere", "knitwear"],
    colors: ["Oat", "Ink", "Clay"],
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    description:
      "Two-ply Mongolian cashmere, ribbed for structure at the cuff and hem. A foundation piece, not a trend.",
  },
  {
    id: "p05",
    name: "Grain Leather Belt",
    category: "Accessories",
    price: 165,
    oldPrice: null,
    rating: 4.6,
    tags: ["leather", "belt"],
    colors: ["Umber", "Ink"],
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.35&fp-z=1.4",
    description:
      "Full-grain leather with a brushed brass buckle, made to darken and soften with age.",
  },
  {
    id: "p06",
    name: "Tailored Wide-Leg Trouser",
    category: "Essentials",
    price: 380,
    oldPrice: null,
    rating: 4.8,
    tags: ["trouser", "wool"],
    colors: ["Charcoal", "Stone"],
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80",
    description:
      "A single pleat, a clean break at the ankle. Tailored to sit at the natural waist and move easily through the day.",
  },
  {
    id: "p07",
    name: "Linen Overshirt",
    category: "New",
    price: 245,
    oldPrice: null,
    rating: 4.5,
    tags: ["linen", "shirting"],
    colors: ["Oat", "Bone"],
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
    description:
      "Washed European linen with a soft hand-feel. Layers over a tee, holds its own as outerwear on warmer days.",
  },
  {
    id: "p08",
    name: "Sculpted Gold Cuff",
    category: "Accessories",
    price: 210,
    oldPrice: null,
    rating: 4.9,
    tags: ["jewelry", "brass"],
    colors: ["Gold"],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
    description:
      "Hand-cast brass with a matte 18k gold finish. A single, deliberate object rather than a set.",
  },
  {
    id: "p09",
    name: "Quiet Hours Midi Dress",
    category: "Collection",
    price: 465,
    oldPrice: null,
    rating: 4.7,
    tags: ["dress", "wool-crepe"],
    colors: ["Ink", "Umber"],
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
    description:
      "Wool crepe with a fluid drape and a covered button placket. Built for the transition between seasons.",
  },
  {
    id: "p10",
    name: "Essential Crew Tee",
    category: "Essentials",
    price: 95,
    oldPrice: null,
    rating: 4.6,
    tags: ["cotton", "basics"],
    colors: ["Bone", "Ink", "Clay"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=80",
    description:
      "Heavyweight combed cotton, garment-dyed for depth of color. The piece everything else is built around.",
  },
  {
    id: "p11",
    name: "Soft Structure Loafer",
    category: "New",
    price: 375,
    oldPrice: 420,
    rating: 4.8,
    tags: ["footwear", "leather"],
    colors: ["Umber", "Ink"],
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1000&q=80",
    description:
      "Hand-lasted calfskin over a flexible sole. Formal enough for the office, easy enough for everything after.",
  },
  {
    id: "p12",
    name: "Merino Travel Scarf",
    category: "Accessories",
    price: 140,
    oldPrice: null,
    rating: 4.7,
    tags: ["merino", "scarf"],
    colors: ["Oat", "Charcoal"],
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80",
    description:
      "Featherweight merino, generous in length. Folds down to nothing in a bag, opens up into a blanket on a plane.",
  },
];

export const LOOKBOOK_ITEMS = [
  {
    id: "l01",
    title: "The Long Corridor",
    tag: "Look 01",
    span: "md:row-span-2",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "l02",
    title: "Still Life, Umber",
    tag: "Look 02",
    span: "",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "l03",
    title: "Afternoon, Unhurried",
    tag: "Look 03",
    span: "",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "l04",
    title: "A Room With Grain Light",
    tag: "Look 04",
    span: "md:col-span-2",
    image:
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1400&q=80",
  },
];

export const TESTIMONIALS = [
  {
    id: "t01",
    quote:
      "The coat looks like it was made for me specifically, not for a rack. Three winters in and it still holds its line.",
    name: "Marguerite D.",
    context: "Weightless Wool Coat",
    rating: 5,
  },
  {
    id: "t02",
    quote:
      "I don't often notice tailoring, but I noticed this. The trouser sits right without a single adjustment.",
    name: "Owen T.",
    context: "Tailored Wide-Leg Trouser",
    rating: 5,
  },
  {
    id: "t03",
    quote:
      "Slow shipping, but the kind of slow that tells you someone is actually making the thing. Worth it.",
    name: "Priya N.",
    context: "Silk Column Slip",
    rating: 4,
  },
  {
    id: "t04",
    quote:
      "It's rare to find basics that still feel considered. The tee has outlasted three of its imitators.",
    name: "Callum R.",
    context: "Essential Crew Tee",
    rating: 5,
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: ["New Arrivals", "Essentials", "Accessories", "The Collection"],
  },
  {
    title: "Customer Care",
    links: ["Shipping & Returns", "Size Guide", "Care Instructions", "Contact Us"],
  },
  {
    title: "House",
    links: ["About AMIRA", "Editorial", "Sustainability", "Stockists"],
  },
];
