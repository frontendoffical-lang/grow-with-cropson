import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  text: string;
  image?: string;
}

interface TestimonialsState {
  testimonials: Testimonial[];
}

const initialState: TestimonialsState = {
  testimonials: [
    {
      id: '1',
      name: 'Ahmed Hassan',
      location: 'Lahore, Pakistan',
      product: 'Mr. Flowers',
      rating: 5,
      text: 'Amazing results! My roses have never bloomed so beautifully. Completely organic and safe.',
      image: '/api/placeholder/60/60'
    },
    {
      id: '2',
      name: 'Sarah Khan',
      location: 'Karachi, Pakistan',
      product: 'Dr. Green',
      rating: 5,
      text: 'My plants are so much healthier and greener after using Dr. Green. Highly recommended!',
      image: '/api/placeholder/60/60'
    },
    {
      id: '3',
      name: 'Muhammad Ali',
      location: 'Faisalabad, Pakistan',
      product: 'Fruitamil',
      rating: 5,
      text: 'The fruit quality has improved dramatically. Bigger, sweeter fruits with no chemicals.',
      image: '/api/placeholder/60/60'
    },
    {
      id: '4',
      name: 'Fatima Sheikh',
      location: 'Islamabad, Pakistan',
      product: 'Herbal Shield',
      rating: 5,
      text: 'Perfect natural pest control. Safe for my vegetable garden and very effective.',
      image: '/api/placeholder/60/60'
    }
  ],
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
});

export const selectAllTestimonials = (state: RootState) => state.testimonials.testimonials;
export const selectTestimonialsByProduct = (state: RootState, product: string) =>
  state.testimonials.testimonials.filter(t => t.product === product);

export default testimonialsSlice.reducer;