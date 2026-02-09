use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, FromRow, Deserialize, Serialize, Clone)]
pub struct ArtistMessage {
    pub id_message: Option<String>,
    pub customer_name: String,
    pub customer_email: String,
    pub customer_phone: Option<String>,
    pub message_content: String,
    pub id_artist: String, // To link the message to a specific artist
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct NewArtistMessage {
    pub customer_name: String,
    pub customer_email: String,
    pub customer_phone: Option<String>,
    pub message_content: String,
    pub id_artist: String,
}
