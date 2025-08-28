import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import i18n from '@/i18n';

interface UiState {
  language: 'en' | 'ur';
  isRTL: boolean;
}

const initialState: UiState = {
  language: 'en',
  isRTL: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ur'>) => {
      state.language = action.payload;
      // Don't change direction - keep LTR for both languages
      state.isRTL = false;
      
      // Update i18n language
      i18n.changeLanguage(action.payload);
      
      // Update document language but keep LTR direction
      if (typeof document !== 'undefined') {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = action.payload;
      }
      
      // Store in localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
  },
});

export const { setLanguage } = uiSlice.actions;

export const selectLanguage = (state: RootState) => state.ui.language;
export const selectIsRTL = (state: RootState) => state.ui.isRTL;

export default uiSlice.reducer;