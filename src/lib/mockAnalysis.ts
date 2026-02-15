// Simulated AI analysis results

export const skinAnalysis = {
  skinTone: "Medium",
  undertone: "Warm",
  skinType: "Combination",
  issues: ["Mild Acne", "Slight Pigmentation", "Minor Dark Circles"],
  scores: { hydration: 72, clarity: 68, elasticity: 80, overall: 73 },
  recommendations: {
    serum: "Vitamin C Brightening Serum",
    moisturizer: "Hyaluronic Acid Gel Cream",
    foundation: "Warm Beige 03",
    compact: "Natural Sand 02",
    lipstick: ["Dusty Rose", "Warm Nude", "Terracotta"],
    blush: ["Soft Peach", "Warm Coral"],
    sunscreen: "SPF 50+ PA++++ Gel-based",
  },
  routine: [
    "Cleanse with gentle micellar water",
    "Apply Vitamin C serum",
    "Moisturize with HA gel cream",
    "SPF 50+ sunscreen (AM)",
    "Retinol serum 2x/week (PM)",
    "Clay mask once a week",
  ],
};

export const hairAnalysis = {
  hairType: "Wavy",
  density: "Medium",
  frizzLevel: "Moderate",
  issues: ["Mild Frizz", "Slight Dryness", "Minor Split Ends"],
  healthScore: 71,
  recommendations: {
    shampoo: "Sulfate-Free Hydrating Shampoo",
    conditioner: "Argan Oil Deep Conditioner",
    serum: "Anti-Frizz Smoothing Serum",
    oil: "Cold-Pressed Coconut Oil Blend",
    mask: "Keratin Repair Hair Mask",
  },
  routine: [
    "Wash 2-3 times per week",
    "Deep condition after every wash",
    "Apply serum on damp hair",
    "Oil massage once a week",
    "Hair mask every 2 weeks",
    "Trim every 6-8 weeks",
  ],
};

export const stylingAnalysis = {
  bodyShape: "Hourglass",
  heightProportion: "Balanced",
  bestColors: ["Dusty Rose", "Navy Blue", "Emerald Green", "Cream", "Burgundy"],
  suggestions: {
    outfitTypes: ["A-line dresses", "Wrap tops", "High-waisted pants"],
    sleeveType: "3/4 Sleeves, Puff Sleeves",
    neckDesign: "V-neck, Sweetheart, Off-shoulder",
    pantStyle: "High-waisted straight, Wide-leg",
    kurtiStyle: "Anarkali, Straight-cut with belt",
    westernOutfits: ["Midi dress", "Tailored blazer + jeans", "Jumpsuit"],
    occasions: {
      casual: "Flowy midi skirt + tucked blouse",
      formal: "Structured sheath dress",
      party: "Sequin wrap dress",
      ethnic: "Silk saree or Anarkali suit",
    },
  },
};

export const ornamentAnalysis = {
  faceShape: "Oval",
  metalSuggestion: "Gold",
  roseGold: "Excellent match",
  recommendations: {
    necklace: "Layered delicate chains",
    earrings: "Medium hoops or drop earrings",
    noseRing: "Small gold stud",
    bangles: "Thin stacking bangles",
    style: "Minimalist with occasional statement pieces",
  },
  matchReason: "Gold complements warm undertone beautifully. Oval face shape suits versatile jewelry styles.",
};

export const dressAnalysis = {
  color: "Burgundy",
  pattern: "Solid",
  fabric: "Silk",
  style: "Semi-Formal",
  matchScore: 87,
  recommendations: {
    pant: "Cream or Champagne",
    dupatta: "Gold shimmer or Dusty Pink",
    footwear: "Nude strappy heels",
    handbag: "Gold clutch",
    doNotPair: ["Bright Orange", "Neon Green", "Electric Blue"],
  },
  colorClash: false,
  verdict: "Perfect Match",
};

export interface Product {
  id: string;
  name: string;
  brand: string;
  shade: string;
  reason: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  matchScore: number;
}

export const skinProducts: Product[] = [
  { id: "s1", name: "Luminous Foundation", brand: "GlowLab", shade: "Warm Beige 03", reason: "Perfect for warm undertone & medium skin tone", price: 1299, rating: 4.5, description: "Lightweight, buildable coverage with skin-loving ingredients.", category: "Foundation", image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop", matchScore: 94 },
  { id: "s2", name: "Silk Compact Powder", brand: "VelvetSkin", shade: "Natural Sand 02", reason: "Matches your skin tone for flawless finish", price: 899, rating: 4.3, description: "Micro-fine powder that sets makeup and controls shine.", category: "Compact", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop", matchScore: 91 },
  { id: "s3", name: "Cream Lipstick", brand: "RoseVelvet", shade: "Dusty Rose", reason: "Warm nude shade that complements your undertone", price: 699, rating: 4.7, description: "Hydrating, long-wear formula with velvety matte finish.", category: "Lipstick", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop", matchScore: 96 },
  { id: "s4", name: "Brightening Serum", brand: "SkinGlow", shade: "Vitamin C 20%", reason: "Targets pigmentation detected in your analysis", price: 1499, rating: 4.6, description: "Potent vitamin C serum for brighter, even-toned skin.", category: "Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop", matchScore: 92 },
  { id: "s5", name: "Petal Blush", brand: "BloomBeauty", shade: "Soft Peach", reason: "Warm peach blush enhances your natural glow", price: 599, rating: 4.4, description: "Silky powder blush for a natural, sun-kissed look.", category: "Blush", image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=300&h=300&fit=crop", matchScore: 89 },
  { id: "s6", name: "UV Shield Gel", brand: "SunSafe", shade: "Transparent", reason: "Gel-based formula perfect for combination skin", price: 799, rating: 4.8, description: "Lightweight, non-greasy SPF 50+ with blue light protection.", category: "Sunscreen", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", matchScore: 95 },
];

export const hairProducts: Product[] = [
  { id: "h1", name: "Hydra Cleanse Shampoo", brand: "AquaLocks", shade: "Sulfate-Free", reason: "Gentle cleansing for wavy, frizz-prone hair", price: 649, rating: 4.4, description: "Moisturizing shampoo that tames frizz while cleaning.", category: "Shampoo", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop", matchScore: 90 },
  { id: "h2", name: "Argan Deep Conditioner", brand: "SilkRoot", shade: "Intensive Repair", reason: "Deep hydration for your dryness concerns", price: 749, rating: 4.6, description: "Rich conditioner infused with pure argan oil.", category: "Conditioner", image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=300&h=300&fit=crop", matchScore: 93 },
  { id: "h3", name: "Frizz Control Serum", brand: "SmoothGloss", shade: "Lightweight", reason: "Targets moderate frizz level detected", price: 549, rating: 4.5, description: "Anti-frizz serum with heat protection up to 230°C.", category: "Hair Serum", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop", matchScore: 95 },
  { id: "h4", name: "Coconut Oil Blend", brand: "PureRoots", shade: "Cold-Pressed", reason: "Weekly oil treatment for healthier hair", price: 399, rating: 4.3, description: "Blend of coconut, almond, and jojoba oils.", category: "Hair Oil", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop", matchScore: 88 },
];

export function getProductsForSection(section: string): Product[] {
  switch (section) {
    case "skin": return skinProducts;
    case "hair": return hairProducts;
    default: return skinProducts;
  }
}
