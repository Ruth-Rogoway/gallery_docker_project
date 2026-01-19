import React from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react'; // Import Sparkles
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Slider } from './ui/Slider';

const Header = ({
  artTypeFilter,
  setArtTypeFilter,
  minPriceFilter,
  setMinPriceFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  cartItemCount,
  onShowCart,
  isAuthenticated,
  userName,
  onLogout,
  onShowAuth,
  uniqueArtTypes,
  onToggleAISidebar // New prop for AI sidebar
}) => {
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
            value={artTypeFilter || 'all'}
            onValueChange={(value) => setArtTypeFilter(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="w-48 bg-background">
              <SelectValue placeholder="כל הסוגים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסוגים</SelectItem>
              {uniqueArtTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-4">
          <span className="text-header-foreground font-medium min-w-20">מחיר:</span>
          <div className="flex items-center gap-4 flex-1">
            <span className="text-header-foreground text-sm">₪{minPriceFilter || '0'}</span>
            <Slider
              value={[parseFloat(minPriceFilter || '0'), parseFloat(maxPriceFilter || '3000')]}
              onValueChange={(value) => {
                setMinPriceFilter(value[0].toString());
                setMaxPriceFilter(value[1].toString());
              }}
              min={0}
              max={3000}
              step={50}
              className="flex-1"
            />
            <span className="text-header-foreground text-sm">₪{maxPriceFilter || '3000'}</span>
          </div>
        </div>

      </div>

      {/* Left side - Cart & Auth (1/5 width) */}
      <div className="w-1/5 flex flex-col items-center gap-2">
        {/* AI Generate Button */}
        <button
          onClick={onToggleAISidebar}
          className="relative p-2 hover:bg-accent/50 rounded-full transition-colors"
        >
          <Sparkles className="w-6 h-6 text-header-foreground" />
        </button>

        {/* Cart Icon */}
        <button
          onClick={onShowCart}
          className="relative p-2 hover:bg-accent/50 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-header-foreground" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Auth Section */}
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-header-foreground text-sm">שלום, {userName}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
            >
              התנתק
            </Button>
          </div>
        ) : (
          <Button
            onClick={onShowAuth}
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