import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { ButtonOrganic } from '@/components/ui/button-organic';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate WhatsApp message
    const whatsappMessage = `
Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message: ${formData.message}
    `.trim();
    
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Message Sent!",
      description: "Your message has been sent via WhatsApp. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contactInfo.phone'),
      value: '+92 300 123 4567',
      action: () => window.open('tel:+923001234567')
    },
    {
      icon: MessageCircle,
      title: t('contactInfo.whatsapp'),
      value: '+92 300 123 4567',
      action: () => window.open('https://wa.me/923001234567')
    },
    {
      icon: Mail,
      title: t('contactInfo.email'),
      value: 'info@cropsen.com',
      action: () => window.open('mailto:info@cropsen.com')
    },
    {
      icon: MapPin,
      title: t('contactInfo.address'),
      value: 'Lahore, Punjab, Pakistan',
      action: null
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
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                  {t('contact.getInTouch')}
                </h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-4 p-4 rounded-lg ${
                          item.action ? 'cursor-pointer hover:bg-primary-light transition-colors' : ''
                        }`}
                        onClick={item.action || undefined}
                      >
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-accent-light p-6 rounded-xl">
                  <h3 className="font-heading font-semibold text-accent-foreground mb-3">
                    {t('contact.businessHours')}
                  </h3>
                  <div className="space-y-2 text-sm text-accent-foreground">
                    <div className="flex justify-between">
                      <span>{t('businessInfo.monday_friday')}</span>
                      <span>{t('businessInfo.hours_weekday')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessInfo.saturday')}</span>
                      <span>{t('businessInfo.hours_saturday')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessInfo.sunday')}</span>
                      <span>{t('businessInfo.closed')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="card-organic">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                    {t('contact.sendMessage')}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('form.name')} {t('form.required')}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder={t('form.placeholders.name')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('form.email')} {t('form.required')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t('form.placeholders.email')}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t('form.phone')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t('form.placeholders.phone')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">{t('form.subject')}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t('form.placeholders.subject')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">{t('form.message')} {t('form.required')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t('form.placeholders.message')}
                      />
                    </div>
                    
                    <ButtonOrganic type="submit" size="lg" className="w-full">
                      {t('form.send')}
                    </ButtonOrganic>
                  </form>
                </div>
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

export default Contact;