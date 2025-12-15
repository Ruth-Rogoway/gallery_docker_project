use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
use crate::controllers::init_db;
use crate::routes::customers_routes::customer_routes;
use crate::routes::artists_routes::artist_routes;
use crate::routes::artworks_routes::artworks_routes; 
use crate::routes::artworks_in_order_routes::artworks_in_order_routes;
use crate::routes::orders_routes::orders_routes;

mod models;
mod controllers;
mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize database
    let pool = init_db::init_db().await.expect("Failed to initialize database");

    let port = std::env::var("PORT").unwrap_or_else(|_| "3007".to_string()).parse::<u16>().unwrap();
    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());

    println!("🚀 Server running at http://{}:{}", host, port);
    println!("📊 SQLite database initialized");

    HttpServer::new(move || {
        let cors = Cors::permissive(); // Allow all origins for development
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .service(customer_routes())
            .service(artist_routes())
            .service(artworks_routes())
            .service(orders_routes())
            .service(artworks_in_order_routes())
    })
    .bind((host, port))?
    .run()
    .await
}