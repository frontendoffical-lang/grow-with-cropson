import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { t } = useTranslation();

  // Mock reviews data - in real app, this would come from API
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      rating: 5,
      comment: 'Incredible results! My roses have never bloomed so beautifully. The flowers are larger and more vibrant than ever before.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2', 
      name: 'Fatima Ali',
      rating: 5,
      comment: 'Finally found a natural solution that actually works. My vegetable garden is thriving and I feel safe using it around my children.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      name: 'Mohammad Khan',
      rating: 4,
      comment: 'Great product, easy to use. I noticed improvements within just 2 weeks of application. Will definitely order again.',
      date: '2024-01-05',
      verified: true
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">
          {t('productDetail.customerReviews')}
        </h3>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {renderStars(5)}
            <span className="text-sm text-muted-foreground">4.9/5 from 150+ reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="h-full">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                {renderStars(review.rating)}
                {review.verified && (
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                "{review.comment}"
              </p>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
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

export default ProductReviews;