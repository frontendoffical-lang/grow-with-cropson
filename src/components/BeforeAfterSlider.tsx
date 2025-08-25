import { useState, useRef } from 'react';
import { Slider } from '@/components/ui/slider';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  productName: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, productName }: BeforeAfterSliderProps) => {
  const [sliderValue, setSliderValue] = useState([50]);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">Before & After Comparison</h3>
        <p className="text-muted-foreground">See the remarkable difference {productName} makes</p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={`${productName} - After treatment`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }}
        >
          <img
            src={beforeImage}
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