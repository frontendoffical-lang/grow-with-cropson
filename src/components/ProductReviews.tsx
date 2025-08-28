import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddReviewForm from './AddReviewForm';

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
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>([
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
  ]);

  const handleReviewAdded = (newReview: Review) => {
    setReviewsList(prev => [newReview, ...prev]);
    setShowAddReview(false);
  };

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
            <span className="text-sm text-muted-foreground">4.9/5 from {reviewsList.length}+ reviews</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              View All Reviews ({reviewsList.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-heading">
                Customer Reviews ({reviewsList.length})
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowAddReview(!showAddReview)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {showAddReview ? 'Cancel' : 'Write a Review'}
                </Button>
              </div>

              {showAddReview && (
                <div className="mb-6">
                  <AddReviewForm 
                    productId={productId} 
                    onReviewAdded={handleReviewAdded}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsList.map((review) => (
                  <Card key={review.id} className="h-full">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        {renderStars(review.rating)}
                        {review.verified && (
                          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "{review.comment}"
                      </p>
                      
                      <div className="flex items-center space-x-3 pt-3 border-t border-border">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductReviews;