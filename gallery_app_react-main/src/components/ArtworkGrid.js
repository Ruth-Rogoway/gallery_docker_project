import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkGrid = ({ artworks, onAddToCart, cartItems }) => {
  if (artworks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground text-lg">לא נמצאו יצירות בקריטריונים שנבחרו</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" dir="rtl">
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