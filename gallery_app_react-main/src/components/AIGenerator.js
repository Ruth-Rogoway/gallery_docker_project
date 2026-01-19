import React, { useState } from 'react';
import SendToArtistModal from './SendToArtistModal';
import { X } from 'lucide-react'; // Import close icon
import './AIGenerator.css';

const AIGenerator = ({ onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSendToArtistModal, setShowSendToArtistModal] = useState(false); // New state for SendToArtist modal

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setError('');
        setImageUrl(''); // Clear previous image on new generation attempt

        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorData}`);
            }

            const imageDataBase64 = await response.text();
            setImageUrl(`data:image/png;base64,${imageDataBase64}`);

        } catch (err) {
            console.error('Failed to generate image:', err);
            setError(`Failed to generate image: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenSendToArtistModal = () => {
        setShowSendToArtistModal(true);
    };

    const handleCloseSendToArtistModal = () => {
        setShowSendToArtistModal(false);
    };

    return (
        <div className="ai-generator-sidebar">
            <button onClick={onClose} className="ai-sidebar-close-button"><X size={24} /></button>
            <div className="ai-generator-content">
                <h2>Generate AI Art Inspiration</h2>

                <div className="prompt-input-area">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the artwork you envision..."
                        disabled={isLoading}
                        rows="4"
                    />
                    <div className="ai-buttons-row">
                        <button onClick={handleGenerateImage} disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Image'}
                        </button>
                        <button
                            onClick={handleOpenSendToArtistModal}
                            disabled={!imageUrl || isLoading}
                            className="send-to-artist-button"
                        >
                            Send Image to Artist
                        </button>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                {imageUrl && (
                    <div className="image-preview-area">
                        <h3>Generated Image:</h3>
                        <img src={imageUrl} alt="AI Generated Artwork" />
                    </div>
                )}
            </div>

            {showSendToArtistModal && (
                <SendToArtistModal imageUrl={imageUrl} onClose={handleCloseSendToArtistModal} />
            )}
        </div>
    );
};

export default AIGenerator;