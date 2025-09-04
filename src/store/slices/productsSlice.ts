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
  taglineUrdu?: string;
  highlights: string[];
  highlightsUrdu?: string[];
  shortDesc: string;
  shortDescUrdu?: string;
  longDesc?: string;
  longDescUrdu?: string;
  usage?: string;
  usageUrdu?: string;
  images: string[];
  video?: string;
  rating?: number;
  reviewCount?: number;
  beforeAfter: {
    before: string;
    after: string;
    images?: Array<{
      before: string;
      after: string;
      title: string;
    }>;
  };
  price?: number;
  volumes?: Array<{
    size: string;
    price: number;
    hidden?: boolean;
  }>;
  advantages?: string[];
  advantagesUrdu?: string[];
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
      name: "Mr. Flowers",
      tagline: "Flowering Stimulant",
      taglineUrdu: "پھولوں کا متحرک",
      highlights: ["Enhances flowering", "Reduces flower drop", "Extends bloom life","improve flower shelf life","higher production"],
      highlightsUrdu: ["پھولوں میں اضافہ", "پھولوں کا گرنا کم کرتا ہے", "کھلنے کی مدت بڑھاتا ہے", "پھولوں کی زندگی میں بہتری", "زیادہ پیداوار"],
      shortDesc: "Helps plants grow more flowers that last longer.",
      shortDescUrdu: "پودوں کو زیادہ پھول اگانے میں مدد کرتا ہے جو زیادہ دیر تک ٹکتے ہیں۔",
      longDesc: "Transform your garden into a blooming paradise with Mr. Flowers, a natural flowering stimulant that promotes profuse, long-lasting blooms. This gentle yet effective formula reduces premature flower drop, extends blooming periods, and encourages healthy, uniform flower development. Specially designed for ornamental and flowering plants like roses, marigolds, and jasmine, Mr. Flowers ensures your garden stays vibrant and colorful for longer. Mix 5-10 mL per liter and apply during pre-flowering and flowering stages for spectacular results.",
      longDescUrdu: "مسٹر فلاورز کے ساتھ اپنے باغ کو کھلتے پھولوں کی جنت میں تبدیل کر دیں، یہ قدرتی پھولوں کا محرک ہے جو بھرپور، طویل المیعاد کھلنے کو فروغ دیتا ہے۔ یہ نرم لیکن مؤثر فارمولا قبل از وقت پھولوں کا گرنا کم کرتا ہے، کھلنے کی مدت بڑھاتا ہے، اور صحت مند، یکسان پھولوں کی نشوونما کی حوصلہ افزائی کرتا ہے۔ خاص طور پر آرائشی اور پھولوں کے پودوں جیسے گلاب، گیندا، اور چمیلی کے لیے ڈیزائن کیا گیا، مسٹر فلاورز یقینی بناتا ہے کہ آپ کا باغ زیادہ دیر تک جیورنت اور رنگ برنگا رہے۔ 5-10 ملی لٹر فی لٹر ملا کر پھول آنے سے پہلے اور پھول آنے کے مراحل میں لگائیں اور شاندار نتائج حاصل کریں۔",
      usage: "Mix 5-10 mL per liter of water. Apply during pre-flowering and flowering stages. For best results, apply in early morning or late evening when temperatures are cooler.",
      usageUrdu: "5-10 ملی لٹر فی لٹر پانی میں ملائیں۔ پھول آنے سے پہلے اور پھول آنے کے مراحل میں لگائیں۔ بہترین نتائج کے لیے صبح سویرے یا شام کے وقت لگائیں جب درجہ حرارت کم ہو۔",
      images: [mrFlower],
      video: null,
      volumes: [
        { size: "50 mL", price: 300, hidden: true },
        { size: "500 mL", price: 1500, hidden: true },
        { size: "1000 mL", price: 2500, hidden: true }
      ],
      beforeAfter: { 
        before: "/api/placeholder/400/300", 
        after: "/api/placeholder/400/300",
        images: [
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Rose Garden Transformation" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Flower Density Improvement" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Bloom Quality Enhancement" }
        ]
      },
      advantages: [
        "Increases flower count by up to 60%",
        "Extends bloom life by 40%",
        "Enhances flower size and color intensity",
        "100% natural and biodegradable formula",
        "Safe for beneficial insects and pollinators",
        "Improves overall plant immunity"
      ],
      advantagesUrdu: [
        "پھولوں کی تعداد میں 60% تک اضافہ",
        "کھلنے کی زندگی میں 40% اضافہ",
        "پھولوں کے سائز اور رنگ کی شدت میں اضافہ",
        "100% قدرتی اور حیاتیاتی طور پر قابل تحلیل فارمولا",
        "مفید کیڑوں اور پولن کرنے والوں کے لیے محفوظ",
        "پودوں کی مجموعی قوت مدافعت میں بہتری"
      ],
      specifications: {
        "Active Ingredients": "Seaweed Extract, Amino Acids, Organic Minerals",
        "NPK Ratio": "2-4-6",
        "pH Level": "6.5-7.0",
        "Shelf Life": "24 months",
        "Application Rate": "5-10ml per liter",
        "Coverage": "500ml covers 100 square meters"
      }
    },
    {
      id: "dr-green",
      name: "Dr. Green",
      tagline: "Plant Hormonal Therapy",
      taglineUrdu: "پودوں کی ہارمونل تھراپی",
      highlights: ["Lush green growth", "Boosts vigor", "Enhances root growth"],
      highlightsUrdu: ["سرسبز و شاداب بڑھوار", "طاقت میں اضافہ", "جڑوں کی بڑھوار میں بہتری"],
      shortDesc: "Supports natural growth and strong roots.",
      shortDescUrdu: "قدرتی بڑھوار اور مضبوط جڑوں میں مدد کرتا ہے۔",
      longDesc: "Give your plants the boost they need with Dr. Green, a natural hormonal formula that stimulates robust growth and vibrant health. This plant-extract-based solution enhances chlorophyll production for lush green foliage, promotes stronger root development, and helps plants recover from environmental stress. Ideal for all crops during early growth stages, Dr. Green transforms weak, stressed plants into vigorous, healthy specimens. Mix 10 mL per liter of water and watch your plants develop rich green canopies and stronger root systems.",
      longDescUrdu: "ڈاکٹر گرین کے ساتھ اپنے پودوں کو وہ طاقت دیں جس کی انہیں ضرورت ہے، یہ قدرتی ہارمونل فارمولا ہے جو مضبوط نشرونما اور شاندار صحت کو متحرک کرتا ہے۔ یہ پودوں کے عرق پر مبنی حل کلوروفل کی پیداوار بڑھاتا ہے، مضبوط جڑوں کی نشرونما کو فروغ دیتا ہے، اور پودوں کو ماحولیاتی دباؤ سے بحالی میں مدد کرتا ہے۔ ابتدائی نشرونما کے مرحلے میں تمام فصلوں کے لیے مثالی، ڈاکٹر گرین کمزور، دباؤ زدہ پودوں کو طاقتور، صحت مند نشرونما میں تبدیل کر دیتا ہے۔ 10 ملی لٹر فی لٹر پانی میں ملائیں اور اپنے پودوں کو بھرپور سبز چھتری اور مضبوط جڑوں کا نظام تیار کرتے ہوئے دیکھیں۔",
      usage: "Mix 10 mL per liter of water. Apply every 10-14 days during growing season. Apply as soil drench for root development or foliar spray for quick absorption.",
      usageUrdu: "10 ملی لٹر فی لٹر پانی میں ملائیں۔ بڑھنے کے موسم میں ہر 10-14 دنوں میں لگائیں۔ جڑوں کی نشوونما کے لیے مٹی میں یا تیزی سے جذب کے لیے پتوں پر چھڑکیں۔",
      images: [drGreen],
      video: null,
      volumes: [
        { size: "50 mL", price: 300, hidden: true },
        { size: "500 mL", price: 1500, hidden: true },
        { size: "1000 mL", price: 2500, hidden: true }
      ],
      beforeAfter: { 
        before: "https://herbal-shield.vercel.app/images/extracted_images/slide6_image7.jpg", 
        after: "/api/placeholder/400/300",
        images: [
          { before: "https://herbal-shield.vercel.app/images/extracted_images/slide6_image7.jpg", after: "/api/placeholder/400/300", title: "Plant Growth Boost" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Root Development" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Leaf Density Increase" }
        ]
      },
      advantages: [
        "Promotes 70% faster root development",
        "Increases leaf density and size",
        "Enhances chlorophyll production for greener foliage",
        "Improves plant stress tolerance",
        "Accelerates overall growth rate by 50%",
        "Strengthens plant immunity against diseases"
      ],
      advantagesUrdu: [
        "جڑوں کی نشوونما میں 70% تیزی",
        "پتوں کی کثافت اور سائز میں اضافہ",
        "سبز پتوں کے لیے کلوروفل کی پیداوار بڑھاتا ہے",
        "پودوں کی دباؤ برداشت کرنے کی صلاحیت بہتر بناتا ہے",
        "مجموعی نشوونما کی رفتار میں 50% اضافہ",
        "پودوں کی بیماریوں کے خلاف قوت مدافعت مضبوط بناتا ہے"
      ],
      specifications: {
        "Active Ingredients": "Plant Hormones, Chelated Micronutrients, Organic Acids",
        "NPK Ratio": "4-2-3",
        "pH Level": "6.0-6.8",
        "Shelf Life": "24 months",
        "Application Rate": "10ml per liter",
        "Coverage": "500ml covers 150 square meters"
      }
    },
    {
      id: "fruitamil",
      name: "Fruitamil",
      tagline: "Premium Nutrition Booster",
      highlights: ["Better fruit set", "Bigger size", "Color & sweetness"],
      shortDesc: "Improves fruit quality and yield.",
      rating: 4.9,
      reviewCount: 150,
      longDesc: "Maximize your harvest quality and yield with Fruitamil, a scientifically formulated nutrition booster designed specifically for fruit-bearing and vegetable crops. This precision nutrition formula improves fruit setting and retention, enhances fruit size and uniformity, and intensifies both color and sweetness. Perfect for citrus, mango, grapes, tomatoes, and other fruiting and vegetable crops, Fruitamil helps you achieve premium, marketable produce that commands better prices. Apply 5-10 mL per liter during fruit-setting and development stages for exceptional results.",
      longDescUrdu: "فروٹامل کے ساتھ اپنی فصل کے معیار اور پیداوار کو زیادہ سے زیادہ بنائیں، یہ سائنسی طور پر تیار کردہ غذائی بوسٹر خاص طور پر پھل دار فصلوں اور سبزیوں کے لیے ڈیزائن کیا گیا ہے۔ یہ درست غذائیت کا فارمولا پھلوں کی سیٹنگ اور برقراری کو بہتر بناتا ہے، پھلوں کا سائز اور یکسانیت بڑھاتا ہے، اور رنگ اور مٹھاس دونوں کو تیز کرتا ہے۔ سٹرس، آم، انگور، ٹماٹر، اور دیگر پھل دار فصلوں اور سبزیوں کے لیے بہترین، فروٹامل آپ کو پریمیم، قابل فروخت پیداوار حاصل کرنے میں مدد کرتا ہے جو بہتر قیمتوں کا مطالبہ کرتی ہے۔ پھل سیٹنگ اور نشوونما کے مراحل میں 5-10 ملی لٹر فی لٹر لگائیں اور غیر معمولی نتائج حاصل کریں۔",
      usage: "Mix 5-10 mL per liter of water. Apply from fruit setting stage, repeat every 20 days. Continue applications until 2 weeks before harvest for optimal results.",
      usageUrdu: "5-10 ملی لٹر فی لٹر پانی میں ملائیں۔ پھل لگنے کے مرحلے سے شروع کریں، ہر 20 دنوں میں دہرائیں۔ بہترین نتائج کے لیے فصل کٹنے سے 2 ہفتے پہلے تک لگاتے رہیں۔",
      images: [fruitamil],
      video: null,
      volumes: [
        { size: "50 mL", price: 300, hidden: true },
        { size: "500 mL", price: 1500, hidden: true },
        { size: "1000 mL", price: 2500, hidden: true }
      ],
      beforeAfter: { 
        before: "/api/placeholder/400/300", 
        after: "/api/placeholder/400/300",
        images: [
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Fruit Size Enhancement" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Fruit Quality Improvement" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Yield Increase" }
        ]
      },
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
        "Application Rate": "5-10ml per liter",
        "Coverage": "500ml covers 80 square meters"
      }
    },
    {
      id: "herbal-shield",
      name: "Organic Herbal Shield",
      tagline: "Natural Crop Protection",
      highlights: ["Plant-based", "Safe for edibles", "Eco-friendly"],
      shortDesc: "Keeps pests away without chemicals.",
      longDesc: "Protect your crops the natural way with Herbal Shield, an organic plant-extract-based pesticide that delivers powerful pest control without harmful chemicals. This eco-friendly solution effectively repels aphids, thrips, whiteflies, and caterpillars while also providing natural fungicide protection. Safe for humans, animals, and beneficial pollinators, Herbal Shield is perfect for fruits, vegetables, ornamentals, and field crops. Simply mix 5-10 mL per liter of water and spray for comprehensive crop protection that won't harm the environment.",
      longDescUrdu: "ہربل شیلڈ کے ساتھ اپنی فصلوں کو قدرتی طریقے سے محفوظ رکھیں، یہ پودوں کے عرق پر مبنی نامیاتی کیڑے مار دوا ہے جو نقصان دہ کیمیکلز کے بغیر طاقتور کیڑے مکوڑوں کا کنٹرول فراہم کرتا ہے۔ یہ ماحول دوست حل مؤثر طریقے سے شپش، تھرپس، سفید مکھی، اور کیٹرپلر کو بھگاتا ہے اور قدرتی فنجی سائیڈ کی حفاظت بھی فراہم کرتا ہے۔ انسانوں، جانوروں، اور مفید پولینیٹرز کے لیے محفوظ، ہربل شیلڈ پھلوں، سبزیوں، آرائشی پودوں، اور کھیتی کی فصلوں کے لیے بہترین ہے۔ صرف 5-10 ملی لٹر فی لٹر پانی میں ملا کر چھڑکیں اور جامع فصل تحفظ حاصل کریں جو ماحول کو نقصان نہیں پہنچائے گا۔",
      usage: "Mix 5-10 mL per liter of water. Spray in early morning or evening, repeat weekly or as needed. Ensure complete coverage of plant surfaces including undersides of leaves.",
      usageUrdu: "5-10 ملی لٹر فی لٹر پانی میں ملائیں۔ صبح سویرے یا شام کو چھڑکیں، ہفتہ وار یا ضرورت کے مطابق دہرائیں۔ پتوں کی نچلی سطح سمیت پودوں کی تمام سطحوں کا مکمل احاطہ یقینی بنائیں۔",
      images: [bugBaan],
      video: null,
      volumes: [
        { size: "50 mL", price: 300, hidden: true },
        { size: "500 mL", price: 1500, hidden: true },
        { size: "1000 mL", price: 2500, hidden: true }
      ],
      beforeAfter: { 
        before: "/api/placeholder/400/300", 
        after: "/api/placeholder/400/300",
        images: [
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Pest Control Results" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Plant Health Recovery" },
          { before: "/api/placeholder/400/300", after: "/api/placeholder/400/300", title: "Damage Prevention" }
        ]
      },
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
        "Application Rate": "5-10ml per liter",
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