import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { selectAllProducts } from '@/store/slices/productsSlice';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import GeneralGallery from '@/components/GeneralGallery';
import { ButtonOrganic } from '@/components/ui/button-organic';
import { Leaf, Shield, Heart, Globe, ArrowRight, HeartHandshake, Rocket,Timer,BookCheck } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const products = useAppSelector(selectAllProducts);

  const whyChooseUs = [
    {
      icon: Leaf,
      title: t('home.why.organic'),
      description: t('home.why.organicDesc')
    },
    {
      icon: Shield,
      title: t('home.why.chemicalFree'),
      description: t('home.why.chemicalFreeDesc')
    },
    {
      icon: Heart,
      title: t('home.why.noSideEffects'),
      description: t('home.why.noSideEffectsDesc')
    },
    {
      icon: Globe,
      title: t('home.why.ecoFriendly'),
      description: t('home.why.ecoFriendlyDesc')
    },
    {
      icon: BookCheck,
      title: t('home.why.trusted'),
      description: t('home.why.trustedDesc')
    },
    {
      icon: HeartHandshake,
      title: t('home.why.backed'),
      description: t('home.why.backedDesc')
    },
    {
      icon: Rocket,
      title: t('home.why.Productivity'),
      description: t('home.why.ProductivityDesc')
    },
    {
      icon: Timer,
      title: t('home.why.lifetime'),
      description: t('home.why.lifetimeDesc')
    }

  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <HeroCarousel />
          </div>
        </section>

        {/* Why Choose CROPSEN Section */}
        <section className="py-10 bg-gradient-to-b from-primary-light to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {t('home.why.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our commitment to organic excellence and environmental sustainability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-success text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {t('home.products.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover our range of premium organic plant care solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* Gallery Section */}
        <GeneralGallery />

        {/* Testimonials Section */}
        <section className="py-10 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {t('home.testimonials.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real experiences from customers who chose organic
              </p>
            </div>

            <TestimonialSlider />

            <div className="text-center mt-12">
              <Link to="/testimonials">
                <ButtonOrganic variant="outline" size="lg">
                  Read More Reviews
                </ButtonOrganic>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-r from-primary to-success text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <ButtonOrganic
                  variant="accent"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </ButtonOrganic>
              </Link>
              <Link to="/contact">
                <ButtonOrganic
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Get In Touch
                </ButtonOrganic>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
