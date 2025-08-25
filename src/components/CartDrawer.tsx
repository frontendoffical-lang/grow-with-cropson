import { useTranslation } from 'react-i18next';
import { X, Minus, Plus, MessageCircle, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  selectCartItems, 
  selectCartDrawerOpen, 
  selectCartNotes,
  setDrawerOpen, 
  updateQty, 
  removeItem, 
  clearCart,
  setNotes 
} from '@/store/slices/cartSlice';
import { ButtonOrganic } from './ui/button-organic';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';

const CartDrawer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const notes = useAppSelector(selectCartNotes);

  const closeDrawer = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    dispatch(updateQty({ id, qty }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleNotesChange = (value: string) => {
    dispatch(setNotes(value));
  };

  const generateWhatsAppMessage = () => {
    let message = `${t('brand')} RTQ\\n\\n`;
    
    if (items.length > 0) {
      message += `Items:\\n`;
      items.forEach(item => {
        message += `- ${item.name} x${item.qty}\\n`;
      });
    }
    
    if (notes.trim()) {
      message += `\\nNotes: ${notes}\\n`;
    }
    
    message += `\\nPlease provide quote for the above items.`;
    
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeDrawer}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-heading font-semibold">{t('cart.title')}</h2>
            <ButtonOrganic variant="ghost" size="icon" onClick={closeDrawer}>
              <X className="w-5 h-5" />
            </ButtonOrganic>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <ButtonOrganic
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </ButtonOrganic>
                      
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      
                      <ButtonOrganic
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </ButtonOrganic>
                      
                      <ButtonOrganic
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </ButtonOrganic>
                    </div>
                  </div>
                ))}

                {/* Notes Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    {t('cart.notes')}
                  </label>
                  <Textarea
                    placeholder="Special instructions, preferred contact method, etc."
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex space-x-2">
                <ButtonOrganic
                  variant="whatsapp"
                  className="flex-1 flex items-center justify-center space-x-2"
                  onClick={generateWhatsAppMessage}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('cta.sendRTQ')}</span>
                </ButtonOrganic>
              </div>
              
              <div className="flex space-x-2">
                <ButtonOrganic
                  variant="ghost"
                  className="flex-1"
                  onClick={closeDrawer}
                >
                  {t('cta.continueShopping')}
                </ButtonOrganic>
                
                <ButtonOrganic
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearCart}
                >
                  {t('cta.clearCart')}
                </ButtonOrganic>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;