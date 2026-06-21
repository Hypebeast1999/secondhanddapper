export type Product = {
  id: string;
  category: "hats" | "rugs" | "sneakers";
  emoji: string;
  tag: string;
  title: string;
  sub: string;
  price: number;
};

export const PRODUCTS: Product[] = [
  { id: "h1", category: "hats", emoji: "🧢", tag: "New Era 59FIFTY", title: "Lakers Purple Reign Fitted", sub: "Los Angeles Lakers", price: 45 },
  { id: "h2", category: "hats", emoji: "🧢", tag: "Mitchell & Ness", title: "Bulls Snapback '96", sub: "Chicago Bulls", price: 40 },
  { id: "h3", category: "hats", emoji: "🧢", tag: "New Era 59FIFTY", title: "Celtics Shamrock Fitted", sub: "Boston Celtics", price: 42 },
  { id: "h4", category: "hats", emoji: "🧢", tag: "Mitchell & Ness", title: "Heat Vice Nights Cap", sub: "Miami Heat", price: 44 },
  { id: "h5", category: "hats", emoji: "🧢", tag: "New Era 59FIFTY", title: "Knicks Classic Fitted", sub: "New York Knicks", price: 45 },
  { id: "h6", category: "hats", emoji: "🧢", tag: "Mitchell & Ness", title: "Warriors Dub Nation Cap", sub: "Golden State Warriors", price: 40 },

  { id: "r1", category: "rugs", emoji: "🟫", tag: "Moroccan Beni Ourain", title: "Atlas Diamond Wool Rug", sub: "8x10 Handwoven", price: 1280 },
  { id: "r2", category: "rugs", emoji: "🟧", tag: "Jonathan Adler", title: "Mojave Geometric Rug", sub: "5x7 Wool & Cotton", price: 890 },
  { id: "r3", category: "rugs", emoji: "🟥", tag: "Ben Soleimani", title: "Vintage Persian Tabriz", sub: "9x12 Silk Blend", price: 3450 },
  { id: "r4", category: "rugs", emoji: "🟦", tag: "Kelim Studio", title: "Indigo Flatweave Kilim", sub: "6x9 Handloomed", price: 720 },
  { id: "r5", category: "rugs", emoji: "🟩", tag: "Anthropologie Edition", title: "Verdant Botanical Rug", sub: "5x8 Tufted Wool", price: 540 },
  { id: "r6", category: "rugs", emoji: "⬛", tag: "Calvin Klein Home", title: "Monochrome Shibori Rug", sub: "8x10 Viscose", price: 980 },

  { id: "s1", category: "sneakers", emoji: "👟", tag: "Nike", title: "Air Jordan 4 'Bred Reimagined'", sub: "Men's, OG Box", price: 410 },
  { id: "s2", category: "sneakers", emoji: "👟", tag: "Nike x Travis Scott", title: "Air Force 1 Low 'Cactus Jack'", sub: "Men's, Deadstock", price: 1250 },
  { id: "s3", category: "sneakers", emoji: "👟", tag: "Adidas x Yeezy", title: "Boost 350 V2 'Zebra'", sub: "Men's, VNDS", price: 380 },
  { id: "s4", category: "sneakers", emoji: "👟", tag: "Nike x Off-White", title: "Dunk Low 'Lot 38'", sub: "Men's, Box Included", price: 1600 },
  { id: "s5", category: "sneakers", emoji: "👟", tag: "New Balance", title: "990v3 'Teddy Santis'", sub: "Unisex, Brand New", price: 250 },
  { id: "s6", category: "sneakers", emoji: "👟", tag: "Nike x A Ma Maniere", title: "Air Jordan 4 'Violet Ore'", sub: "Women's, Rare", price: 890 },
];

export const TESTIMONIALS = [
  { text: "Fit was clean and shipped fast. Exactly as pictured.", image: "https://i.pravatar.cc/100?img=1", name: "Marcus T.", role: "Bought: Lakers Purple Reign Fitted" },
  { text: "Stunning rug, way better in person. Worth every penny.", image: "https://i.pravatar.cc/100?img=2", name: "Jasmine R.", role: "Bought: Vintage Persian Tabriz" },
  { text: "Authentic and in great shape. Box had a small dent but the shoes are fire.", image: "https://i.pravatar.cc/100?img=3", name: "Devon K.", role: "Bought: Air Jordan 4 'Bred Reimagined'" },
  { text: "Been hunting for these forever. Seller was responsive and packaging was secure.", image: "https://i.pravatar.cc/100?img=4", name: "Olivia P.", role: "Bought: Air Force 1 Low 'Cactus Jack'" },
  { text: "Quality is top notch, smells brand new. Will buy again.", image: "https://i.pravatar.cc/100?img=5", name: "Tyrell B.", role: "Bought: Bulls Snapback '96" },
  { text: "Beautiful colors, slightly smaller than expected but still happy with it.", image: "https://i.pravatar.cc/100?img=6", name: "Sara M.", role: "Bought: Mojave Geometric Rug" },
  { text: "Cash App checkout was instant. Sneakers are 100% legit.", image: "https://i.pravatar.cc/100?img=7", name: "Andre F.", role: "Bought: Dunk Low 'Lot 38'" },
  { text: "Rug arrived rolled in solid packaging, zero creases. Looks amazing in my living room.", image: "https://i.pravatar.cc/100?img=8", name: "Priya N.", role: "Bought: Atlas Diamond Wool Rug" },
  { text: "Best fitted I own. True to size and the colors pop.", image: "https://i.pravatar.cc/100?img=9", name: "Chris L.", role: "Bought: Celtics Shamrock Fitted" },
];
