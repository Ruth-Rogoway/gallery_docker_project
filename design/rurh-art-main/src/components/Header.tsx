import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { artTypes } from '@/data/artworks';
import { useState } from 'react';

interface HeaderProps {
  selectedArtType: string | null;
  setSelectedArtType: (value: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
}

const Header = ({
  selectedArtType,
  setSelectedArtType,
  priceRange,
  setPriceRange,
  onCartClick,
  onAuthClick,
}: HeaderProps) => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 h-[25vh] bg-header flex items-center px-4" dir="rtl">
      {/* Right side - Logo placeholder (1/5 width) */}
      <div className="w-1/5 flex items-center justify-center">
        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
          <span className="text-muted-foreground text-xs text-center">לוגו</span>
        </div>
      </div>

      {/* Center - Filters (3/5 width) */}
      <div className="w-3/5 flex flex-col gap-4 px-8">
        {/* Art Type Filter */}
        <div className="flex items-center gap-4">
          <span className="text-header-foreground font-medium min-w-20">סוג אומנות:</span>
          <Select
            value={selectedArtType || 'all'}
            onValueChange={(value) => setSelectedArtType(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-48 bg-background">
              <SelectValue placeholder="כל הסוגים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסוגים</SelectItem>
              {artTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-4">
          <span className="text-header-foreground font-medium min-w-20">מחיר:</span>
          <div className="flex items-center gap-4 flex-1">
            <span className="text-header-foreground text-sm">₪{priceRange[0]}</span>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={0}
              max={3000}
              step={50}
              className="flex-1"
            />
            <span className="text-header-foreground text-sm">₪{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Left side - Cart & Auth (1/5 width) */}
      <div className="w-1/5 flex flex-col items-center gap-2">
        {/* Cart Icon */}
        <button
          onClick={onCartClick}
          className="relative p-2 hover:bg-accent/50 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-header-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Auth Section */}
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-header-foreground text-sm">שלום, {user?.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
            >
              התנתק
            </Button>
          </div>
        ) : (
          <Button
            onClick={onAuthClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            התחברות / הרשמה
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
