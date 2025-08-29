import { useAppSelector, useAppDispatch } from '@/store';
import { selectLanguage, setLanguage } from '@/store/slices/uiSlice';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const LanguageSwitch = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectLanguage);

  const handleLanguageChange = (checked: boolean) => {
    dispatch(setLanguage(checked ? 'ur' : 'en'));
  };

  return (
    <div className="flex items-center space-x-3 bg-muted/50 rounded-full p-1">
      <span 
        className={cn(
          "text-sm font-medium px-3 py-1 rounded-full transition-colors",
          currentLanguage === 'en' ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        )}
       >
        EN
      </span>
      <Switch
        checked={currentLanguage === 'ur'}
        onCheckedChange={handleLanguageChange}
        className="data-[state=checked]:bg-primary"
      />
      <span 
        className={cn(
          "text-sm font-medium px-3 py-1 rounded-full transition-colors",
          currentLanguage === 'ur' ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        )}
       >
        UR
      </span>
    </div>
  );
};

export default LanguageSwitch;