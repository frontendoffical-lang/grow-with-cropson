import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  highlights: string[];
  shortDesc: string;
  longDesc?: string;
  usage?: string;
  badges: string[];
  images: string[];
  video?: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  price?: number;
}

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
}

const initialState: ProductsState = {
  products: [
    {
      id: "mr-flowers",
      name: "Mr. Flowers",
      tagline: "Natural booster for more blooms",
      highlights: ["Enhances flowering", "Reduces flower drop", "Extends bloom life"],
      shortDesc: "Helps plants grow more flowers that last longer.",
      longDesc: "Mr. Flowers is a revolutionary organic flowering booster that naturally enhances your plants' blooming capacity. Made from premium botanical extracts, it promotes abundant flower formation while extending their lifespan.",
      usage: "Mix 2-3ml per liter of water. Apply during early flowering stage and repeat every 15 days.",
      badges: ["organic", "chemicalFree", "noSideEffects"],
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      video: null,
      beforeAfter: { before: "/api/placeholder/300/200", after: "/api/placeholder/300/200" }
    },
    {
      id: "dr-green",
      name: "Dr. Green",
      tagline: "Plant hormonal therapy",
      highlights: ["Lush green growth", "Boosts vigor", "Enhances root growth"],
      shortDesc: "Supports natural growth and strong roots.",
      longDesc: "Dr. Green provides comprehensive plant hormonal therapy that promotes vigorous vegetative growth. Its unique formula strengthens root systems and ensures lush, healthy foliage.",
      usage: "Mix 3-4ml per liter of water. Apply every 10-14 days during growing season.",
      badges: ["organic", "chemicalFree", "noSideEffects"],
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      video: null,
      beforeAfter: { before: "/api/placeholder/300/200", after: "/api/placeholder/300/200" }
    },
    {
      id: "fruitamil",
      name: "Fruitamil",
      tagline: "Nutrition booster",
      highlights: ["Better fruit set", "Bigger size", "Color & sweetness"],
      shortDesc: "Improves fruit quality and yield.",
      longDesc: "Fruitamil is a specialized nutrition booster designed to enhance fruit development. It improves fruit set, increases size, and enhances natural color and sweetness.",
      usage: "Mix 4-5ml per liter of water. Apply from fruit setting stage, repeat every 20 days.",
      badges: ["organic", "chemicalFree", "noSideEffects"],
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      video: null,
      beforeAfter: { before: "/api/placeholder/300/200", after: "/api/placeholder/300/200" }
    },
    {
      id: "herbal-shield",
      name: "Organic Herbal Shield",
      tagline: "Natural pest control",
      highlights: ["Plant-based", "Safe for edibles", "Eco-friendly"],
      shortDesc: "Keeps pests away without chemicals.",
      longDesc: "Organic Herbal Shield provides comprehensive pest protection using only natural plant-based ingredients. Safe for all edible crops and environmentally friendly.",
      usage: "Mix 5-6ml per liter of water. Spray in early morning or evening, repeat weekly.",
      badges: ["organic", "chemicalFree", "noSideEffects"],
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      video: null,
      beforeAfter: { before: "/api/placeholder/300/200", after: "/api/placeholder/300/200" }
    }
  ],
  selectedProduct: null,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = state.products.find(p => p.id === action.payload) || null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectProductBySlug = (state: RootState, slug: string) => 
  state.products.products.find(p => p.id === slug);
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;

export default productsSlice.reducer;