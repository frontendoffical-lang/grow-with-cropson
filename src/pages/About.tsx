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
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
              {t('about.title')}
            </h1>
            <p className="text-lg text-primary font-medium mb-6">
              {t('about.tagline')}
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  {t('about.ourMission')}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">100%</div>
                  <div className="text-xl font-semibold text-foreground">{t('badges.organic')}</div>
                </div>
              </div>
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