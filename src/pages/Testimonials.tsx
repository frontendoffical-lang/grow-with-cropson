import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { selectAllTestimonials } from '@/store/slices/testimonialsSlice';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = useAppSelector(selectAllTestimonials);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-10 bg-gradient-to-b from-primary-light to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              {t('home.testimonials.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real experiences from our customers who have transformed their gardens with CROPSEN
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card-organic">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                    <Quote className="w-6 h-6 text-accent flex-shrink-0" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-accent fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Used: <span className="text-primary font-medium">{testimonial.product}</span>
                    </p>
                  </div>

                  <blockquote className="text-foreground leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Testimonials;