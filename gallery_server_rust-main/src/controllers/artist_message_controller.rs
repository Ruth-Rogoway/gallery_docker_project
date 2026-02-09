use actix_web::{get, post, web, HttpResponse, Responder};
use sqlx::{sqlite::SqlitePool, Error};
use uuid::Uuid;
use crate::models::artist_message::{ArtistMessage, NewArtistMessage};

pub async fn init_artist_message_table(pool: &SqlitePool) -> Result<(), Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS ARTIST_MESSAGES (
            id_message TEXT PRIMARY KEY NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT,
            message_content TEXT NOT NULL,
            id_artist TEXT NOT NULL,
            FOREIGN KEY (id_artist) REFERENCES artists(id_artist) ON DELETE CASCADE
        );
        "#,
    )
    .execute(pool)
    .await?;
    Ok(())
}

#[get("/")]
pub async fn get_all_artist_messages(pool: web::Data<SqlitePool>) -> impl Responder {
    match sqlx::query_as::<_, ArtistMessage>("SELECT * FROM ARTIST_MESSAGES")
        .fetch_all(&**pool)
        .await
    {
        Ok(messages) => HttpResponse::Ok().json(messages),
        Err(e) => {
            eprintln!("Failed to fetch artist messages: {}", e);
            HttpResponse::InternalServerError().body(format!("Database error: {}", e))
        }
    }
}

#[get("/artist/{id_artist}")]
pub async fn get_artist_messages_by_artist_id(pool: web::Data<SqlitePool>, path: web::Path<String>) -> impl Responder {
    let id_artist = path.into_inner();
    match sqlx::query_as::<_, ArtistMessage>("SELECT * FROM ARTIST_MESSAGES WHERE id_artist = ?")
        .bind(&id_artist)
        .fetch_all(&**pool)
        .await
    {
        Ok(messages) => HttpResponse::Ok().json(messages),
        Err(e) => {
            eprintln!("Failed to fetch artist messages for artist {}: {}", id_artist, e);
            HttpResponse::InternalServerError().body(format!("Database error: {}", e))
        }
    }
}


#[post("/")]
pub async fn create_artist_message(pool: web::Data<SqlitePool>, new_message: web::Json<NewArtistMessage>) -> impl Responder {
    let id = Uuid::new_v4().to_string();
    let result = sqlx::query(
        r#"
        INSERT INTO ARTIST_MESSAGES (id_message, customer_name, customer_email, customer_phone, message_content, id_artist)
        VALUES (?, ?, ?, ?, ?, ?)
        "#
    )
    .bind(&id)
    .bind(&new_message.customer_name)
    .bind(&new_message.customer_email)
    .bind(&new_message.customer_phone)
    .bind(&new_message.message_content)
    .bind(&new_message.id_artist)
    .execute(&**pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Created().json(ArtistMessage {
            id_message: Some(id),
            customer_name: new_message.customer_name.clone(),
            customer_email: new_message.customer_email.clone(),
            customer_phone: new_message.customer_phone.clone(),
            message_content: new_message.message_content.clone(),
            id_artist: new_message.id_artist.clone(),
        }),
        Err(e) => {
            eprintln!("Failed to create artist message: {}", e);
            HttpResponse::InternalServerError().body(format!("Database error: {}", e))
        }
    }
}
