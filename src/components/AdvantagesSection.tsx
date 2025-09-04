import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Leaf, Shield, Award, Heart, Zap, Target } from 'lucide-react';

interface AdvantagesSectionProps {
  advantages: string[];
  product?: any;
}

const AdvantagesSection = ({ advantages, product }: AdvantagesSectionProps) => {
  const { t, i18n } = useTranslation();

  const getIcon = (index: number) => {
    const icons = [CheckCircle, Leaf, Shield, Award, Heart, Zap, Target];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-primary" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">
          {t('productDetail.advantages')}
        </h3>
        <p className="text-muted-foreground">
          Why this product stands out from the rest
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(i18n.language === 'ur' && product.advantagesUrdu ? product.advantagesUrdu : advantages).map((advantage, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  {getIcon(index)}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium leading-relaxed">
                    {advantage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesSection;