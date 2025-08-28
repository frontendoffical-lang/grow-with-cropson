import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Leaf, Shield, Heart, Globe, HeartHandshake, Rocket, Timer, BookCheck } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

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
        <section className="py-10 bg-gradient-to-b from-primary-light to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {t('home.why.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our commitment to organic excellence sets us apart in the industry
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

        {/* Story Section */}
        <section className="py-10 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  {t('about.ourStory')}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>
                    {t('about.storyText1')}
                  </p>
                  <p>
                    {t('about.storyText2')}
                  </p>
                  <p>
                    {t('about.storyText3')}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-light to-success-light rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="w-24 h-24 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-heading font-bold text-primary">
                      {t('about.naturallyBetter')}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {t('about.timeline.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.timelineSubtitle')}
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary"></div>
              
              <div className="space-y-12">
                {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                  <div key={year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                    
                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 ml-12 md:ml-0' : 'md:pl-8 ml-12 md:ml-0'}`}>
                      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-primary">{year}</span>
                          <h3 className="text-xl font-heading font-semibold text-foreground">
                            {t(`about.timeline.${year}.title`)}
                          </h3>
                        </div>
                        <p className="text-muted-foreground">
                          {t(`about.timeline.${year}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default About;