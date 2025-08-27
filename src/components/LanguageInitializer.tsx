import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setLanguage } from '@/store/slices/uiSlice';

const LanguageInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ur' | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ur')) {
      dispatch(setLanguage(savedLanguage));
    } else {
      dispatch(setLanguage('en'));
    }
  }, [dispatch]);

  return null;
};

export default LanguageInitializer;