import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, MessageCircle, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectAllProducts } from '@/store/slices/productsSlice';
import { addItem, setDrawerOpen } from '@/store/slices/cartSlice';
import { ButtonOrganic } from './ui/button-organic';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

// Import hero images
import mrFlowersHero from '@/assets/mr-flowers-hero.jpg';
import drGreenHero from '@/assets/dr-green-hero.jpg';
import fruitamilHero from '@/assets/fruitamil-hero.jpg';
import herbalShieldHero from '@/assets/herbal-shield-hero.jpg';

const HeroCarousel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero images mapping
  const heroImages = {
    'mr-flowers': mrFlowersHero,
    'dr-green': drGreenHero,
    'fruitamil': fruitamilHero,
    'herbal-shield': herbalShieldHero,
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [products.length, isAutoPlaying]);

  const handleAddToCart = (product: any) => {
    dispatch(addItem({ id: product.id, name: product.name }));
    dispatch(setDrawerOpen(true));
  };

  const handleWhatsAppOrder = (product: any) => {
    const message = `Hi! I'm interested in ordering ${product.name}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentSlide];

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-2xl">
      {/* Slides */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className={cn(
            "absolute inset-0 transition-transform duration-700 ease-in-out",
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          )}
        >
          <div className="relative h-full bg-gradient-to-r from-primary-light to-accent-light">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroImages[product.id as keyof typeof heroImages]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.badges.map((badge) => (
                        <Badge 
                          key={badge}
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30"
                        >
                          {t(`badges.${badge}`)}
                        </Badge>
                      ))}
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                      {product.name}
                    </h1>
                    
                    <p className="text-xl md:text-2xl font-medium text-accent mb-6">
                      {product.tagline}
                    </p>
                    
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                      {product.shortDesc}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <ButtonOrganic
                        size="lg"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{t('cta.addToCart')}</span>
                      </ButtonOrganic>
                      
                      <ButtonOrganic
                        variant="whatsapp"
                        size="lg"
                        onClick={() => handleWhatsAppOrder(product)}
                        className="flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{t('cta.orderWhatsapp')}</span>
                      </ButtonOrganic>
                      
                      <Link to={`/products/${product.id}`}>
                        <ButtonOrganic
                          variant="outline"
                          size="lg"
                          className="w-full flex items-center justify-center space-x-2 border-white text-white hover:bg-white hover:text-primary"
                        >
                          <Eye className="w-5 h-5" />
                          <span>{t('cta.viewDetails')}</span>
                        </ButtonOrganic>
                      </Link>
                    </div>
                  </div>

                  {/* Product Image (Mobile Hidden) */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="aspect-square max-w-md mx-auto">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentSlide 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;