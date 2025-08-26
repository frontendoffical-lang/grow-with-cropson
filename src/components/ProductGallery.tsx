import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
          <img
            src={images[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onClick={() => setIsLightboxOpen(true)}
          />
          <div 
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            onClick={() => setIsLightboxOpen(true)}
          >
            <div className="bg-white/90 rounded-full p-3">
              <ZoomIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary shadow-lg scale-95'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>
            
            <img
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;