import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artworks, onAddToCart, cartItems }) => {
  if (artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <p className="font-display text-2xl text-foreground/80 mb-2">אין תוצאות</p>
        <p className="text-muted-foreground">לא נמצאו יצירות בקריטריונים שנבחרו</p>
      </div>
    );
  }

  return (
    <div
      className="gallery-stagger grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
      dir="rtl"
    >
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.idArtwork}
          artwork={artwork}
          onAddToCart={onAddToCart}
          isInCart={cartItems.some(item => item.idArtwork === artwork.idArtwork)}
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;
