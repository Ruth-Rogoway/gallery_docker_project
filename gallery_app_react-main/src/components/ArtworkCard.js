import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ArtworkCard = ({ artwork, onAddToCart, isInCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-card rounded-lg overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container - 3/4 height */}
      <div className="relative aspect-square p-4">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover rounded-md"
        />

        {/* Hover overlay with description */}
        {isHovered && (
          <div className="absolute inset-4 bg-foreground/80 rounded-md flex items-center justify-center p-4 transition-opacity">
            <p className="text-background text-center text-sm leading-relaxed">
              {artwork.description}
            </p>
          </div>
        )}
      </div>

      {/* Info section - 1/4 height */}
      <div className="p-4 pt-2 flex justify-between items-end">
        <div>
          <h3 className="font-semibold text-card-foreground">{artwork.title}</h3>
          <p className="text-muted-foreground text-sm">{artwork.artType}</p>
          <p className="text-muted-foreground text-sm">{artwork.artistName}</p>
          <p className="text-card-foreground font-bold mt-1">₪{artwork.price.toLocaleString()}</p>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(artwork)}
          disabled={isInCart}
          className={`p-2 rounded-md transition-colors flex items-center gap-1 text-sm ${
            isInCart
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{isInCart ? 'בסל' : 'הוסף לסל'}</span>
        </button>
      </div>
    </div>
  );
};

export default ArtworkCard;