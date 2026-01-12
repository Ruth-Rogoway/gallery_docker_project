import { X, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  const handleContactEmail = () => {
    const subject = encodeURIComponent('הזמנה חדשה מהגלריה');
    const body = encodeURIComponent(
      `שלום,\n\nאני מעוניין/ת לרכוש את היצירות הבאות:\n\n${items
        .map((item) => `- ${item.name} (₪${item.price.toLocaleString()}) x ${item.quantity}`)
        .join('\n')}\n\nסה"כ: ₪${getTotalPrice().toLocaleString()}\n\nפרטי יצירת קשר:\nשם: \nטלפון: \n\nתודה!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">סל הקניות</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">הסל ריק</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-muted rounded-lg p-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">כמות: {item.quantity}</p>
                    <p className="font-bold">₪{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-destructive/10 rounded-full text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>סה"כ:</span>
              <span>₪{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleContactEmail}
                className="flex-1 bg-primary text-primary-foreground"
              >
                <Mail className="w-4 h-4 ml-2" />
                שלח הזמנה במייל
              </Button>
              <Button variant="outline" onClick={clearCart}>
                נקה סל
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
