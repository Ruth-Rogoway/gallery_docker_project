import React, { useState, useEffect } from 'react';
import { getArtworks, getArtists } from './api';
import Header from './components/Header';
import ArtworkGrid from './components/ArtworkGrid';
import AIGenerator from './components/AIGenerator';

// Helper function to convert snake_case to camelCase
const snakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      let camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

      // Special handling for 'id_artist' to ensure it becomes 'artistId'
      if (key === 'id_artist') {
        camelKey = 'artistId';
      }
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
};

const ArtworksPage = ({ isAuthenticated, onShowAuth, onLogout, onAddToCart, cartItemCount, onShowCart, userName, checkoutTrigger, cartItems }) => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [artTypeFilter, setArtTypeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAISidebar, setShowAISidebar] = useState(false);

  // Fetch data from Rust server on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [artworksRawData, artistsRawData] = await Promise.all([
          getArtworks(),
          getArtists()
        ]);

        // Process artists data
        const artistsCamelCase = artistsRawData.map(artist => snakeToCamel(artist));
        const artistMap = artistsCamelCase.reduce((map, artist) => {
          const camelKey = snakeToCamel(artist);
          map[camelKey.artistId] = `${camelKey.firstName} ${camelKey.lastName}`;
          return map;
        }, {});

        // Process artworks data
        const processedArtworks = artworksRawData.map(artwork => {
          const camelCaseArtwork = snakeToCamel(artwork);
          const artistNameFromMap = artistMap[camelCaseArtwork.artistId];
          return {
            ...camelCaseArtwork,
            artistName: artistNameFromMap || 'Unknown Artist'
          };
        });
        setArtworks(processedArtworks);
        setFilteredArtworks(processedArtworks);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to fetch artworks or artists: ${error.message}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [checkoutTrigger]);

  // Apply filters whenever filter states or artworks change
  useEffect(() => {
    let currentFiltered = artworks;


    if (artTypeFilter) {
      currentFiltered = currentFiltered.filter(artwork =>
        artwork.artType.toLowerCase() === artTypeFilter.toLowerCase()
      );
    }

    if (minPriceFilter) {
      currentFiltered = currentFiltered.filter(artwork =>
        artwork.price >= parseFloat(minPriceFilter)
      );
    }

    if (maxPriceFilter) {
      currentFiltered = currentFiltered.filter(artwork =>
        artwork.price <= parseFloat(maxPriceFilter)
      );
    }

    setFilteredArtworks(currentFiltered);
  }, [artworks, artTypeFilter, minPriceFilter, maxPriceFilter]);

  // Extract unique art types for the dropdown
  const uniqueArtTypes = [...new Set(artworks.map(artwork => artwork.artType))];

  const handleAddToCart = (artwork) => {
    if (!isAuthenticated) {
      onShowAuth();
      alert('אנא התחבר או הירשם כדי להוסיף פריטים לסל.');
    } else {
      onAddToCart(artwork);
      alert(`הפריט "${artwork.title}" נוסף לסל בהצלחה!`);
    }
  };

  const handleToggleAISidebar = () => {
    setShowAISidebar(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex ${showAISidebar ? 'overflow-hidden' : ''}`}>
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          artTypeFilter={artTypeFilter}
          setArtTypeFilter={setArtTypeFilter}
          minPriceFilter={minPriceFilter}
          setMinPriceFilter={setMinPriceFilter}
          maxPriceFilter={maxPriceFilter}
          setMaxPriceFilter={setMaxPriceFilter}
          cartItemCount={cartItemCount}
          onShowCart={onShowCart}
          isAuthenticated={isAuthenticated}
          userName={userName}
          onLogout={onLogout}
          onShowAuth={onShowAuth}
          uniqueArtTypes={uniqueArtTypes}
          onToggleAISidebar={handleToggleAISidebar}
        />

        <main className="flex-1 gallery-page-enter">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-2" dir="rtl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground m-0 inline-block">
              האוסף
            </h1>
            <p className="text-muted-foreground mt-2 mb-0 max-w-xl text-balance text-base sm:text-lg">
              יצירות מקוריות של אמנים שונים — בחרו, התאימו לסגנון שלכם, והזמינו ישירות מהגלריה.
            </p>
          </section>

          {loading && (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground text-lg">טוען יצירות אומנות...</p>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-64 px-4">
              <p className="text-destructive text-lg text-center">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <ArtworkGrid
              artworks={filteredArtworks}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          )}
        </main>
      </div>

      {showAISidebar && (
        <AIGenerator onClose={handleToggleAISidebar} />
      )}
    </div>
  );
};

export default ArtworksPage;
