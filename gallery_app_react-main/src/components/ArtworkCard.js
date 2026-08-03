import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

const ArtworkCard = ({ artwork, onAddToCart, isInCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="artwork-mount bg-card overflow-hidden relative border border-border/70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-[1.04]' : 'scale-100'
          }`}
        />

        <div
          className={`absolute inset-0 bg-gallery-ink/75 flex items-center justify-center p-6 transition-opacity duration-400 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundColor: 'hsl(200 18% 14% / 0.78)' }}
        >
          <p className="text-header-foreground text-center text-sm leading-relaxed font-light">
            {artwork.description}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex justify-between items-end gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg text-card-foreground leading-snug truncate">
            {artwork.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5 truncate">{artwork.artistName}</p>
          <p className="text-muted-foreground/80 text-xs mt-0.5">{artwork.artType}</p>
          <p className="text-card-foreground font-semibold mt-2 tabular-nums tracking-wide">
            ₪{artwork.price.toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(artwork)}
          disabled={isInCart}
          className={`shrink-0 px-3 py-2 rounded-md transition-all duration-300 flex items-center gap-1.5 text-sm font-medium ${
            isInCart
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span className="hidden sm:inline">{isInCart ? 'בסל' : 'הוסף'}</span>
        </button>
      </div>
    </article>
  );
};

export default ArtworkCard;
