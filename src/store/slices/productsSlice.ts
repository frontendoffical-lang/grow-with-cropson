import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
// Import hero images
import mrFlower from '@/assets/9.png';
import fruitamil from '@/assets/10.png';
import bugBaan from '@/assets/11.png';
import drGreen from '@/assets/12.png';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  highlights: string[];
  shortDesc: string;
  longDesc?: string;
  usage?: string;
  images: string[];
  video?: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  price?: number;
  advantages?: string[];
  specifications?: Record<string, string>;
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
      name: "Mr. Flower",
      tagline: "Grow More Flowers Naturally",
      highlights: ["Enhances flowering", "Reduces flower drop", "Extends bloom life","improve folwer shelf life","higher production"],
      shortDesc: "Helps plants grow more flowers that last longer.",
      longDesc: "Mr. Flowers is a revolutionary organic flowering booster that naturally enhances your plants' blooming capacity. Made from premium botanical extracts sourced from sustainable farms, this advanced formula contains natural growth stimulants that work in harmony with your plants' biological processes. The unique blend includes seaweed extracts, amino acids, and organic minerals that promote cellular division in flower buds, resulting in dramatically increased bloom production. Unlike synthetic alternatives, Mr. Flowers works gradually to build long-term plant health while delivering immediate flowering results. The formula also contains natural preservatives that help flowers maintain their vibrant colors and fresh appearance for extended periods, making it perfect for both commercial growers and home gardeners who want stunning, long-lasting blooms.",
      usage: "Mix 2-3ml per liter of water. Apply during early flowering stage and repeat every 15 days. For best results, apply in early morning or late evening when temperatures are cooler.",
      images: [mrFlower],
      video: null,
      beforeAfter: { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300" },
      advantages: [
        "Increases flower count by up to 60%",
        "Extends bloom life by 40%",
        "Enhances flower size and color intensity",
        "100% natural and biodegradable formula",
        "Safe for beneficial insects and pollinators",
        "Improves overall plant immunity"
      ],
      specifications: {
        "Active Ingredients": "Seaweed Extract, Amino Acids, Organic Minerals",
        "NPK Ratio": "2-4-6",
        "pH Level": "6.5-7.0",
        "Shelf Life": "24 months",
        "Application Rate": "2-3ml per liter",
        "Coverage": "500ml covers 100 square meters"
      }
    },
    {
      id: "dr-green",
      name: "Dr. Green",
      tagline: "The secret to lush green plants",
      highlights: ["Lush green growth", "Boosts vigor", "Enhances root growth"],
      shortDesc: "Supports natural growth and strong roots.",
      longDesc: "Dr. Green provides comprehensive plant hormonal therapy that promotes vigorous vegetative growth through advanced biotechnology. This scientifically formulated solution contains naturally derived plant hormones including auxins, cytokinins, and gibberellins that work synergistically to optimize plant development. The unique formula strengthens root systems at the cellular level, promoting extensive root networks that improve nutrient uptake and water absorption. Rich in chelated micronutrients and organic acids, Dr. Green ensures maximum bioavailability of essential nutrients, resulting in robust stem development, increased leaf production, and enhanced chlorophyll synthesis. The treatment also includes natural stress-resistance compounds that help plants adapt to environmental challenges while maintaining optimal growth rates throughout the growing season.",
      usage: "Mix 3-4ml per liter of water. Apply every 10-14 days during growing season. Apply as soil drench for root development or foliar spray for quick absorption.",
      images: [drGreen],
      video: null,
      beforeAfter: { before: "https://herbal-shield.vercel.app/images/extracted_images/slide6_image7.jpg", after: "/api/placeholder/400/300" },
      advantages: [
        "Promotes 70% faster root development",
        "Increases leaf density and size",
        "Enhances chlorophyll production for greener foliage",
        "Improves plant stress tolerance",
        "Accelerates overall growth rate by 50%",
        "Strengthens plant immunity against diseases"
      ],
      specifications: {
        "Active Ingredients": "Plant Hormones, Chelated Micronutrients, Organic Acids",
        "NPK Ratio": "4-2-3",
        "pH Level": "6.0-6.8",
        "Shelf Life": "24 months",
        "Application Rate": "3-4ml per liter",
        "Coverage": "500ml covers 150 square meters"
      }
    },
    {
      id: "fruitamil",
      name: "Fruitamil",
      tagline: "Nutrition booster",
      highlights: ["Better fruit set", "Bigger size", "Color & sweetness"],
      shortDesc: "Improves fruit quality and yield.",
      longDesc: "Fruitamil is a specialized nutrition booster designed to enhance fruit development through targeted nutritional support during critical growth phases. This advanced formula combines essential macro and micronutrients with natural fruit-enhancing compounds that optimize fruit setting, development, and maturation processes. The unique blend includes calcium for cell wall strength, potassium for sugar transport, and boron for proper fruit formation, along with natural enzymes that improve nutrient absorption and utilization. Fruitamil's proprietary formula also contains organic compounds that enhance the natural sugar accumulation process, resulting in sweeter, more flavorful fruits with improved texture and shelf life. The balanced nutrition profile ensures uniform fruit sizing while maintaining the natural taste characteristics that make homegrown produce superior to commercial alternatives.",
      usage: "Mix 4-5ml per liter of water. Apply from fruit setting stage, repeat every 20 days. Continue applications until 2 weeks before harvest for optimal results.",
      images: [fruitamil],
      video: null,
      beforeAfter: { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300" },
      advantages: [
        "Increases fruit size by up to 35%",
        "Improves fruit set rate by 45%",
        "Enhances natural sweetness and flavor",
        "Extends fruit shelf life by 25%",
        "Reduces fruit cracking and splitting",
        "Improves uniform fruit coloring"
      ],
      specifications: {
        "Active Ingredients": "Calcium, Potassium, Boron, Natural Enzymes",
        "NPK Ratio": "1-5-8",
        "pH Level": "6.2-7.2",
        "Shelf Life": "24 months",
        "Application Rate": "4-5ml per liter",
        "Coverage": "500ml covers 80 square meters"
      }
    },
    {
      id: "herbal-shield",
      name: "Organic Herbal Shield",
      tagline: "Natural pest control",
      highlights: ["Plant-based", "Safe for edibles", "Eco-friendly"],
      shortDesc: "Keeps pests away without chemicals.",
      longDesc: "Organic Herbal Shield provides comprehensive pest protection using an innovative blend of plant-based essential oils and natural deterrents that create an invisible barrier against harmful insects while remaining completely safe for beneficial organisms. This revolutionary formula combines neem oil extracts, peppermint oil, and garlic compounds with natural surfactants that ensure excellent coverage and penetration. The unique multi-action approach works by disrupting pest feeding patterns, interfering with reproduction cycles, and creating an inhospitable environment for common garden pests including aphids, spider mites, whiteflies, and caterpillars. Unlike synthetic pesticides, Herbal Shield breaks down naturally in the environment, leaving no harmful residues on edible crops or in soil, making it the perfect choice for organic farming and home gardens where safety is paramount.",
      usage: "Mix 5-6ml per liter of water. Spray in early morning or evening, repeat weekly or as needed. Ensure complete coverage of plant surfaces including undersides of leaves.",
      images: [bugBaan],
      video: null,
      beforeAfter: { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300" },
      advantages: [
        "Controls 15+ common garden pests naturally",
        "Safe for children, pets, and beneficial insects",
        "No pre-harvest interval required",
        "Biodegradable with zero environmental impact",
        "Can be used up to day of harvest",
        "Improves plant natural defense mechanisms"
      ],
      specifications: {
        "Active Ingredients": "Neem Oil, Peppermint Oil, Garlic Extract, Natural Surfactants",
        "Concentration": "Concentrated formula - dilute before use",
        "pH Level": "6.8-7.5",
        "Shelf Life": "36 months",
        "Application Rate": "5-6ml per liter",
        "Coverage": "500ml covers 200 square meters"
      }
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