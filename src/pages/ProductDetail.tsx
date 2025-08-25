import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectProductBySlug, setSelectedProduct } from '@/store/slices/productsSlice';
import { addItem, setDrawerOpen } from '@/store/slices/cartSlice';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { ButtonOrganic } from '@/components/ui/button-organic';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ShoppingCart, CheckCircle, Star, Award, Shield, Leaf } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('description');
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

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'organic': return <Leaf className="w-4 h-4" />;
      case 'chemicalFree': return <Shield className="w-4 h-4" />;
      case 'noSideEffects': return <Award className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-primary font-medium mb-6">
                {product.tagline}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {product.shortDesc}
              </p>
              
              {/* Rating Display */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.9/5 from 150+ reviews)</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {product.badges.map((badge) => (
                <Badge 
                  key={badge} 
                  variant={getBadgeVariant(badge)}
                  className="px-4 py-2 text-sm flex items-center gap-2"
                >
                  {getBadgeIcon(badge)}
                  {t(`badges.${badge}`)}
                </Badge>
              ))}
            </div>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <ButtonOrganic
                size="lg"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 text-lg py-6"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{t('cta.addToCart')}</span>
              </ButtonOrganic>
              
              <ButtonOrganic
                variant="whatsapp"
                size="lg"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center space-x-2 text-lg py-6"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{t('cta.orderWhatsapp')}</span>
              </ButtonOrganic>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {['description', 'advantages', 'specifications', 'usage'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <Card>
                <CardHeader>
                  <CardTitle>About {product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {product.longDesc}
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'advantages' && product.advantages && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-success-light rounded-lg">
                        <Star className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col space-y-1 p-4 border rounded-lg">
                        <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                        <dd className="text-lg font-semibold text-foreground">{value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'usage' && product.usage && (
              <Card>
                <CardHeader>
                  <CardTitle>Usage Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary-light rounded-xl p-6">
                    <p className="text-primary text-lg leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-16">
          <BeforeAfterSlider 
            beforeImage={product.beforeAfter.before}
            afterImage={product.beforeAfter.after}
            productName={product.name}
          />
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Transform Your Garden?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust {product.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <ButtonOrganic
              size="lg"
              onClick={handleAddToCart}
              className="bg-white text-primary hover:bg-white/90 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </ButtonOrganic>
            
            <ButtonOrganic
              variant="whatsapp"
              size="lg"
              onClick={handleWhatsAppOrder}
              className="border-white text-white hover:bg-white/10 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order Now</span>
            </ButtonOrganic>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;