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

import AdvantagesSection from '@/components/AdvantagesSection';
import ProductReviews from '@/components/ProductReviews';
import { ButtonOrganic } from '@/components/ui/button-organic';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, ShoppingCart, CheckCircle, Star, Award, Shield, Leaf } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
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
                {i18n.language === 'ur' && product.taglineUrdu ? product.taglineUrdu : product.tagline}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {i18n.language === 'ur' && product.shortDescUrdu ? product.shortDescUrdu : product.shortDesc}
              </p>
              
              {/* Rating Display */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground">{product.rating || 4.9}</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <span className="text-sm text-muted-foreground">{product.reviewCount || 150}+ {t('productDetail.reviews')}</span>
              </div>
            </div>

            {/* Badges */}
            {/* <div className="flex flex-wrap gap-3">
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
            </div> */}

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {t('productDetail.keyBenefits')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {(i18n.language === 'ur' && product.highlightsUrdu ? product.highlightsUrdu : product.highlights).map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Volume Options */}
            {product.volumes && product.volumes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {t('productDetail.availableVolumes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {product.volumes.map((volume, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/30 transition-colors">
                        <span className="font-medium text-foreground">{volume.size}</span>
                        <Badge variant="secondary">{t('product.contactForPrice')}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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

        {/* Advantages Section */}
        {product.advantages && (
          <div className="mb-16">
            <AdvantagesSection advantages={product.advantages} product={product} />
          </div>
        )}


        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{t('productDetail.overview')}</TabsTrigger>
              <TabsTrigger value="usage">{t('productDetail.howToUse')}</TabsTrigger>
              <TabsTrigger value="specifications">{t('productDetail.specifications')}</TabsTrigger>
              <TabsTrigger value="faqs">{t('productDetail.faqs')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('productDetail.overview')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground text-lg leading-relaxed">
                    {i18n.language === 'ur' && product.longDescUrdu 
                      ? product.longDescUrdu 
                      : product.longDesc}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('productDetail.howToUse')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                    <p className="text-foreground text-lg leading-relaxed">
                      {i18n.language === 'ur' && product.usageUrdu 
                        ? product.usageUrdu 
                        : product.usage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('productDetail.specifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col space-y-2 p-4 border rounded-lg hover:border-primary/30 transition-colors">
                          <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {i18n.language === 'ur' && t(`productDetail.specificationLabels.${key}`) !== `productDetail.specificationLabels.${key}` 
                              ? t(`productDetail.specificationLabels.${key}`) 
                              : key}
                          </dt>
                          <dd className="text-lg font-semibold text-foreground">{value}</dd>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faqs" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('productDetail.faqs')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {i18n.language === 'ur' ? 'میں اس پروڈکٹ کو کتنی بار لگاؤں؟' : 'How often should I apply this product?'}
                      </h4>
                      <p className="text-muted-foreground">
                        {i18n.language === 'ur' 
                          ? 'بہترین نتائج کے لیے، بڑھنے کے موسم میں ہر 10-15 دنوں میں لگائیں۔ پودے کے ردعمل اور بڑھنے کی حالات کی بنیاد پر تعدد کو ایڈجسٹ کریں۔'
                          : 'For best results, apply every 10-15 days during the growing season. Adjust frequency based on plant response and growing conditions.'
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {i18n.language === 'ur' ? 'کیا یہ کھانے والے پودوں کے لیے محفوظ ہے؟' : 'Is it safe for edible plants?'}
                      </h4>
                      <p className="text-muted-foreground">
                        {i18n.language === 'ur'
                          ? 'جی ہاں، ہماری تمام پروڈکٹس 100% آرگینک ہیں اور کھانے والے پودوں پر استعمال کے لیے محفوظ ہیں۔ کوئی نقصان دہ کیمیکل یا باقیات نہیں۔'
                          : 'Yes, all our products are 100% organic and safe for use on edible plants. No harmful chemicals or residues.'
                        }
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {i18n.language === 'ur' ? 'کیا میں اسے دوسری کھادوں کے ساتھ ملا سکتا ہوں؟' : 'Can I mix it with other fertilizers?'}
                      </h4>
                      <p className="text-muted-foreground">
                        {i18n.language === 'ur'
                          ? 'ہماری پروڈکٹس زیادہ تر آرگینک کھادوں کے ساتھ مطابقت رکھتی ہیں۔ تاہم، ہم پہلے چھوٹے علاقے میں ٹیسٹ کرنے یا ہماری سپورٹ ٹیم سے مشورہ کرنے کی سفارش کرتے ہیں۔'
                          : 'Our products are compatible with most organic fertilizers. However, we recommend testing on a small area first or consulting our support team.'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-16">
          <BeforeAfterSlider 
            images={product.beforeAfter.images || [
              {
                before: product.beforeAfter.before,
                after: product.beforeAfter.after,
                title: `${product.name} Results`
              }
            ]}
            productName={product.name}
          />
        </div>

        {/* Customer Reviews */}
        <div className="mb-16">
          <ProductReviews productId={product.id} />
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-heading font-bold mb-4">
            {t('productDetail.readyToTransform')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('productDetail.joinCustomers')} {product.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <ButtonOrganic
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-white text-primary hover:bg-white/90 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{t('cta.addToCart')}</span>
                </ButtonOrganic>
                
                <ButtonOrganic
                  variant="whatsapp"
                  size="lg"
                  onClick={handleWhatsAppOrder}
                  className="border-white text-white hover:bg-white/10 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('cta.orderWhatsapp')}</span>
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