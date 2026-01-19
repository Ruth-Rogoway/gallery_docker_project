use actix_web::web;
use crate::controllers::artist_communication_controller::send_to_artist_handler;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/api/artist-communication/send-email")
        .route(web::post().to(send_to_artist_handler))
    );
}
