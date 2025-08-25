import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectProductBySlug, setSelectedProduct } from '@/store/slices/productsSlice';
import { addItem, setDrawerOpen } from '@/store/slices/cartSlice';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { ButtonOrganic } from '@/components/ui/button-organic';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, CheckCircle } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => 
    slug ? selectProductBySlug(state, slug) : null
  );

  useEffect(() => {
    if (slug && product) {
      dispatch(setSelectedProduct(slug));
    }
  }, [slug, product, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ id: product.id, name: product.name }));
      dispatch(setDrawerOpen(true));
    }
  };

  const handleWhatsAppOrder = () => {
    if (product) {
      const message = `Hi! I'm interested in ordering ${product.name}. Please provide more details about pricing and availability.`;
      const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!slug || !product) {
    return <Navigate to="/products" replace />;
  }

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'organic': return 'default';
      case 'chemicalFree': return 'secondary';
      case 'noSideEffects': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 2}`}
                  className="aspect-square rounded-lg object-cover"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                {product.tagline}
              </p>
              <p className="text-muted-foreground text-lg">
                {product.shortDesc}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {product.badges.map((badge) => (
                <Badge 
                  key={badge} 
                  variant={getBadgeVariant(badge)}
                  className="px-4 py-2 text-sm"
                >
                  {t(`badges.${badge}`)}
                </Badge>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold">Key Benefits</h3>
              <div className="space-y-2">
                {product.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <ButtonOrganic
                size="lg"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t('cta.addToCart')}</span>
              </ButtonOrganic>
              
              <ButtonOrganic
                variant="whatsapp"
                size="lg"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('cta.orderWhatsapp')}</span>
              </ButtonOrganic>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-card rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold mb-4">About {product.name}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.longDesc}
          </p>
        </div>

        {/* Usage Instructions */}
        {product.usage && (
          <div className="bg-primary-light rounded-xl p-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Usage Instructions
            </h2>
            <p className="text-primary text-lg">
              {product.usage}
            </p>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;