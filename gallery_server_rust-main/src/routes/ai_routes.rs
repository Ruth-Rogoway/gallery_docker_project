use actix_web::web;
use crate::controllers::ai_controller::generate_image_ai_handler;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/api/ai/generate")
        .route(web::post().to(generate_image_ai_handler))
    );
}