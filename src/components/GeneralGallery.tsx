import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Image as ImageIcon, X } from 'lucide-react';

const GeneralGallery = () => {
  const { t } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'image' | 'video' | null>(null);

  // Sample gallery data - can be moved to Redux store later
  const galleryItems = [
    {
      id: 1,
      type: 'image' as const,
      src: '/api/placeholder/400/300',
      title: 'Healthy Plant Growth',
      category: 'Before & After'
    },
    {
      id: 2,
      type: 'video' as const,
      src: '/api/placeholder/400/300',
      videoSrc: '#',
      title: 'How to Apply CROPSEN',
      category: 'Tutorial'
    },
    {
      id: 3,
      type: 'image' as const,
      src: '/api/placeholder/400/300',
      title: 'Blooming Results',
      category: 'Results'
    },
    {
      id: 4,
      type: 'image' as const,
      src: '/api/placeholder/400/300',
      title: 'Organic Ingredients',
      category: 'Product'
    },
    {
      id: 5,
      type: 'video' as const,
      src: '/api/placeholder/400/300',
      videoSrc: '#',
      title: 'Customer Testimonial',
      category: 'Reviews'
    },
    {
      id: 6,
      type: 'image' as const,
      src: '/api/placeholder/400/300',
      title: 'Garden Transformation',
      category: 'Before & After'
    }
  ];

  const openLightbox = (src: string, type: 'image' | 'video') => {
    setSelectedMedia(src);
    setSelectedType(type);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    setSelectedType(null);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('home.gallery.title', 'Our Gallery')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.gallery.subtitle', 'See the amazing results and learn how to use our organic products')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card 
                key={item.id} 
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => openLightbox(item.videoSrc || item.src, item.type)}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Media Type Indicator */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {item.type === 'video' ? (
                          <Play className="w-3 h-3" />
                        ) : (
                          <ImageIcon className="w-3 h-3" />
                        )}
                        {item.type === 'video' ? 'Video' : 'Photo'}
                      </Badge>
                    </div>

                    {/* Play Button for Videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                          <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="outline" className="bg-white/90 text-foreground">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            {selectedType === 'video' ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedMedia}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedMedia}
                  alt="Gallery item"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralGallery;