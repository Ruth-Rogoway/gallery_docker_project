import React, { useState } from 'react';
import './SendToArtistModal.css';

const SendToArtistModal = ({ imageUrl, onClose }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [sendSuccess, setSendSuccess] = useState(false);

    const resetModalState = () => {
        setMessage('');
        setIsSending(false);
        setSendError('');
        setSendSuccess(false);
    };

    const handleClose = () => {
        resetModalState();
        onClose();
    };

    const handleSendMessage = async () => {
        setIsSending(true);
        setSendError('');
        setSendSuccess(false);

        try {
            // Placeholder for API call to send email to artist
            console.log('Sending message to artist:', { imageUrl, message });
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSendSuccess(true);
            // In a real application, you would make a fetch/axios call here:
            /*
            const response = await fetch('/api/send-to-artist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl, message, customerInfo: 'user_email@example.com' }), // Add real customer info
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorData}`);
            }
            setSendSuccess(true);
            */

        } catch (err) {
            console.error('Failed to send message to artist:', err);
            setSendError(`Failed to send message: ${err.message}`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="send-to-artist-modal-overlay">
            <div className="send-to-artist-modal-content">
                <button className="close-modal-button" onClick={handleClose}>X</button>
                <h2>Send Image to Artist</h2>
                {imageUrl && (
                    <div className="image-preview">
                        <h3>Generated Image:</h3>
                        <img src={imageUrl} alt="AI Generated Artwork" />
                    </div>
                )}
                <div className="message-input-area">
                    <label htmlFor="artistMessage">Add a message for the artist:</label>
                    <textarea
                        id="artistMessage"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        rows="5"
                        disabled={isSending}
                    ></textarea>
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={isSending || sendSuccess}
                    className="send-message-button"
                >
                    {isSending ? 'Sending...' : sendSuccess ? 'Sent Successfully!' : 'Send Message'}
                </button>
                {sendError && <p className="error-message">{sendError}</p>}
                {sendSuccess && <p className="success-message">Message sent! The artist will be in touch.</p>}
            </div>
        </div>
    );
};

export default SendToArtistModal;
