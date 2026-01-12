import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import ArtworkGrid from '@/components/ArtworkGrid';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import { artworks } from '@/data/artworks';

const Index = () => {
  const [selectedArtType, setSelectedArtType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesType = !selectedArtType || artwork.artType === selectedArtType;
      const matchesPrice = artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
      return matchesType && matchesPrice;
    });
  }, [selectedArtType, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedArtType={selectedArtType}
        setSelectedArtType={setSelectedArtType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      {/* Main content - 3/4 of screen height */}
      <main className="min-h-[75vh]">
        <ArtworkGrid artworks={filteredArtworks} />
      </main>

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Index;
