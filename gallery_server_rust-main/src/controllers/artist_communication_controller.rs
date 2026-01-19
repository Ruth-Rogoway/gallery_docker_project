use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
pub struct SendToArtistRequest {
    pub image_url: String,
    pub message: String,
    pub customer_info: String, // Placeholder for customer details (e.g., email)
}

#[derive(Serialize)]
pub struct SendToArtistResponse {
    pub status: String,
    pub message: String,
}

pub async fn send_to_artist_handler(req: web::Json<SendToArtistRequest>) -> impl Responder {
    println!("Received request to send image to artist:");
    println!("  Image URL: {}", req.image_url);
    println!("  Message: {}", req.message);
    println!("  Customer Info: {}", req.customer_info);

    // In a real application, you would implement email sending logic here,
    // for example, using a library like `lettre` or by calling an external email service API.
    // For now, we just log the request.

    HttpResponse::Ok().json(SendToArtistResponse {
        status: "success".to_string(),
        message: "Message to artist sent successfully (logged only).".to_string(),
    })
}
