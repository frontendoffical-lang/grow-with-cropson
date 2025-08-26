import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { selectAllProducts } from '@/store/slices/productsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface ProductComparisonProps {
  currentProductId: string;
}

const ProductComparison = ({ currentProductId }: ProductComparisonProps) => {
  const { t } = useTranslation();
  const products = useAppSelector(selectAllProducts);
  const currentProduct = products.find(p => p.id === currentProductId);
  
  // Get related products (for this demo, we'll show all products)
  const comparisonProducts = products.slice(0, 4);

  const features = [
    'organic',
    'chemicalFree', 
    'noSideEffects',
    'fastActing',
    'longLasting'
  ];

  const getFeatureValue = (productId: string, feature: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    
    switch (feature) {
      case 'organic':
      case 'chemicalFree':
      case 'noSideEffects':
        return product.badges.includes(feature);
      case 'fastActing':
        return productId === 'dr-green' || productId === 'herbal-shield';
      case 'longLasting':
        return productId === 'mr-flowers' || productId === 'fruitamil';
      default:
        return false;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('productDetail.comparison')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-2 font-medium text-muted-foreground">
                  Features
                </th>
                {comparisonProducts.map((product) => (
                  <th key={product.id} className="text-center py-4 px-2 min-w-[120px]">
                    <div className="space-y-2">
                      <div className="font-semibold text-foreground text-sm">
                        {product.name}
                      </div>
                      {product.id === currentProductId && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium text-foreground">
                    {t(`badges.${feature}`, feature)}
                  </td>
                  {comparisonProducts.map((product) => (
                    <td key={product.id} className="text-center py-3 px-2">
                      {getFeatureValue(product.id, feature) ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;