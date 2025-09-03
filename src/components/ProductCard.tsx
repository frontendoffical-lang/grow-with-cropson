import { useTranslation } from 'react-i18next';
import { MessageCircle, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/store/slices/productsSlice';
import { useAppDispatch } from '@/store';
import { addItem, setDrawerOpen } from '@/store/slices/cartSlice';
import { ButtonOrganic } from './ui/button-organic';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.id, name: product.name }));
    dispatch(setDrawerOpen(true));
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering ${product.name}. Please provide more details about pricing and availability.`;
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'organic':
        return 'default';
      case 'chemicalFree':
        return 'secondary';
      case 'noSideEffects':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className={cn("card-organic group", className)}>
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* View Details Overlay */}
        <Link
          to={`/products/${product.id}`}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <ButtonOrganic variant="accent" size="sm" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{t('cta.viewDetails')}</span>
          </ButtonOrganic>
        </Link>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-primary font-medium text-sm mb-2">
            {i18n.language === 'ur' && product.taglineUrdu ? product.taglineUrdu : product.tagline}
          </p>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {i18n.language === 'ur' && product.shortDescUrdu ? product.shortDescUrdu : product.shortDesc}
          </p>
        </div>

        {/* Badges */}
        {/* <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge 
              key={badge} 
              variant={getBadgeVariant(badge)}
              className="text-xs"
            >
              {t(`badges.${badge}`)}
            </Badge>
          ))}
        </div> */}

        {/* Highlights */}
        <div className="space-y-1">
          {product.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-success rounded-full mr-2 flex-shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Volume Options */}
        {product.volumes && product.volumes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{t('product.availableVolumes')}:</p>
            <div className="flex flex-wrap gap-2">
              {product.volumes.map((volume, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {volume.size}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 pt-2">
          <ButtonOrganic
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('cta.addToCart')}</span>
          </ButtonOrganic>
          
          <div className="flex space-x-2">
            <ButtonOrganic
              variant="whatsapp"
              size="sm"
              onClick={handleWhatsAppOrder}
              className="flex-1 flex items-center justify-center space-x-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>{t('cta.orderWhatsapp')}</span>
            </ButtonOrganic>
            
            <Link to={`/products/${product.id}`} className="flex-1">
              <ButtonOrganic variant="outline" size="sm" className="w-full">
                {t('cta.enquiry')}
              </ButtonOrganic>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;