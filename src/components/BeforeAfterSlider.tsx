import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterImage {
  before: string;
  after: string;
  title: string;
}

interface BeforeAfterSliderProps {
  images: BeforeAfterImage[];
  productName: string;
}

const BeforeAfterSlider = ({ images, productName }: BeforeAfterSliderProps) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState([50]);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">{t('productDetail.beforeAfter')}</h3>
        <p className="text-muted-foreground">
          {t('gallery.subtitle')} - {currentImage.title}
        </p>
      </div>
      
      <div className="relative">
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </>
        )}

        <div 
          ref={containerRef}
          className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
        >
          {/* After Image (Background) */}
          <img
            src={currentImage.after}
            alt={`${productName} - After treatment`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }}
          >
            <img
              src={currentImage.before}
              alt={`${productName} - Before treatment`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderValue[0]}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            After
          </div>
        </div>
      </div>
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Slider Control */}
      <div className="px-4">
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={100}
          step={1}
          className="cursor-grab active:cursor-grabbing"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;