# CROPSEN - Premium Organic Plant Care Solutions

A modern, responsive website for CROPSEN's organic plant care products built with React, Redux Toolkit, and TypeScript.

## Features

### 🌱 **Product Showcase**
- Beautiful hero carousel showcasing 4 premium products
- Detailed product pages with galleries and before/after comparisons
- Shopping cart with RTQ (Request to Quote) functionality

### 📱 **Modern UI/UX**
- Responsive design optimized for all devices
- Organic, farm-fresh aesthetic with custom design system
- Smooth animations and transitions
- Light mode optimized interface

### 🛒 **Shopping Experience**
- Side drawer cart with quantity controls
- WhatsApp integration for orders and inquiries
- RTQ system with custom messaging
- Product badges (Organic, Chemical-Free, No Side Effects)

### 🌐 **Internationalization**
- English and Urdu language support
- RTL text direction for Urdu
- Language persistence in localStorage
- Cultural-appropriate content adaptation

### ⚡ **Technical Features**
- Built with React 18 + TypeScript
- Redux Toolkit for state management
- React Router for navigation
- i18next for internationalization
- Framer Motion for animations
- Tailwind CSS for styling

## Products

1. **Mr. Flowers** - Natural booster for more blooms
2. **Dr. Green** - Plant hormonal therapy for lush growth
3. **Fruitamil** - Nutrition booster for better fruits
4. **Organic Herbal Shield** - Natural pest control

## Pages

- **Home** (`/`) - Hero carousel, products grid, testimonials, CTA
- **Products** (`/products`) - Full product catalog
- **Product Detail** (`/products/:slug`) - Individual product pages
- **About** (`/about`) - Company story and values
- **Testimonials** (`/testimonials`) - Customer reviews
- **Contact** (`/contact`) - Contact form with WhatsApp integration

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update the WhatsApp phone number:
   ```
   VITE_WHATSAPP_PHONE=923001234567
   ```

## Installation & Development

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd cropsen-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Main navigation
│   ├── Footer.tsx       # Site footer
│   ├── CartDrawer.tsx   # Shopping cart sidebar
│   ├── HeroCarousel.tsx # Homepage hero section
│   ├── ProductCard.tsx  # Product display card
│   └── TestimonialSlider.tsx # Customer reviews
├── pages/               # Route components
├── store/               # Redux store and slices
│   ├── slices/          # Redux state slices
│   └── index.ts         # Store configuration
├── i18n/                # Internationalization
│   ├── locales/         # Translation files
│   └── index.ts         # i18n configuration
├── assets/              # Static assets and images
└── lib/                 # Utility functions
```

## State Management

The application uses Redux Toolkit with the following slices:

- **productsSlice** - Product data and selection
- **cartSlice** - Shopping cart state and actions  
- **uiSlice** - Language settings and UI state
- **testimonialsSlice** - Customer testimonials

## WhatsApp Integration

The website integrates with WhatsApp for:
- Individual product inquiries
- Cart RTQ (Request to Quote) messages
- Contact form submissions

Messages are automatically formatted with product details, quantities, and customer notes.

## Design System

The website uses a custom design system with:

### Colors
- **Primary**: Fresh organic green (`hsl(142 71% 45%)`)
- **Secondary**: Earth brown (`hsl(25 45% 45%)`) 
- **Accent**: Natural gold (`hsl(45 93% 47%)`)
- **Success**: Vibrant organic green (`hsl(120 61% 50%)`)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Custom button variants for organic theme
- Semantic color tokens throughout
- Consistent spacing and shadows
- Hover animations and transitions

## SEO Optimization

- Semantic HTML structure
- Meta tags for social sharing
- Descriptive alt text for images
- Clean URL structure
- Mobile-optimized viewport
- Fast loading with code splitting

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Performance

- Code splitting by routes
- Lazy loading of images
- Optimized bundle size
- Fast development with Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 CROPSEN. All rights reserved.

## Contact

- **Website**: [cropsen.com](https://cropsen.com)
- **WhatsApp**: +92 300 123 4567
- **Email**: info@cropsen.com
- **Location**: Lahore, Punjab, Pakistan

---

Built with ❤️ for organic farming and sustainable agriculture.