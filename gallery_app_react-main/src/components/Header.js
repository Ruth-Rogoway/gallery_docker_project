import React from 'react';
import { ShoppingCart, Sparkles, LogOut } from 'lucide-react';
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
  onToggleAISidebar
}) => {
  return (
    <div className="sticky top-0 z-50" dir="rtl">
      <header className="bg-header text-header-foreground border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="group shrink-0 no-underline min-w-0">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="NAAMA & RUTH Gallery"
              className="brand-mark h-14 sm:h-16 md:h-[4.5rem] w-auto object-contain rounded-sm"
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onToggleAISidebar}
              aria-label="מחולל AI"
              className="p-2.5 rounded-md text-header-foreground/85 hover:text-header-foreground hover:bg-white/10 transition-colors duration-300"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onShowCart}
              aria-label="סל קניות"
              className="relative p-2.5 rounded-md text-header-foreground/85 hover:text-header-foreground hover:bg-white/10 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-accent text-accent-foreground text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3 mr-1">
                <span className="hidden sm:inline text-sm text-header-foreground/80">
                  שלום, {userName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="bg-transparent border-header-foreground/25 text-header-foreground hover:bg-white/10 hover:text-header-foreground gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  התנתק
                </Button>
              </div>
            ) : (
              <Button
                onClick={onShowAuth}
                size="sm"
                className="bg-[hsl(40_20%_96%)] text-[hsl(95_12%_22%)] hover:bg-white font-semibold"
              >
                התחברות
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm text-muted-foreground whitespace-nowrap">סוג:</span>
            <Select
              value={artTypeFilter || 'all'}
              onValueChange={(value) => setArtTypeFilter(value === 'all' ? '' : value)}
            >
              <SelectTrigger className="w-40 sm:w-48 bg-background border-border h-9">
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

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm text-muted-foreground whitespace-nowrap">מחיר:</span>
            <span className="text-xs text-foreground/70 tabular-nums">₪{minPriceFilter || '0'}</span>
            <Slider
              value={[parseFloat(minPriceFilter || '0'), parseFloat(maxPriceFilter || '3000')]}
              onValueChange={(value) => {
                setMinPriceFilter(value[0].toString());
                setMaxPriceFilter(value[1].toString());
              }}
              min={0}
              max={3000}
              step={50}
              className="flex-1 max-w-md"
            />
            <span className="text-xs text-foreground/70 tabular-nums">₪{maxPriceFilter || '3000'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
