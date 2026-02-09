use actix_web::{web, Scope};
use crate::controllers::artist_message_controller;

pub fn artist_message_routes() -> Scope {
    web::scope("/artist_messages")
        .service(artist_message_controller::get_all_artist_messages)
        .service(artist_message_controller::get_artist_messages_by_artist_id)
        .service(artist_message_controller::create_artist_message)
}
