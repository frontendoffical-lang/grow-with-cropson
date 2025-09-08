import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, Leaf } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.testimonials'), href: '/testimonials' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 303 4877569',
      action: () => window.open('tel:+923034877569')
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+92 303 4877569',
      action: () => window.open('https://wa.me/923034877569')
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@cropsen.com',
      action: () => window.open('mailto:info@cropsen.com')
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/b9fbd769-4d28-4bb3-9a0b-0811e483cf11.png" 
                alt="CROPSEN Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t('footerDescription')}
            </p>
            <p className="text-sm text-primary font-medium">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-primary" />
                      <span className="text-sm">{item.value}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 {t('brand')}. All rights reserved. Made with ❤️ for organic farming.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;