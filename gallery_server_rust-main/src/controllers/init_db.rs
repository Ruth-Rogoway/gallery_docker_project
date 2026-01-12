use sqlx::{self, SqlitePool};
use crate::controllers::customer_controller;
use crate::controllers::artist_controller;
use crate::controllers::artwork_controller;
use crate::controllers::order_controller;
use crate::controllers::artwork_in_order_controller;
use crate::models::artist::Artist;
use crate::models::artwork::Artwork;

async fn insert_sample_data(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    // Insert sample artists
    let artists = vec![
        Artist {
            artist_id: Some("artist-1".to_string()),
            first_name: "דוד".to_string(),
            last_name: "לוי".to_string(),
            birth_year: 1980,
        },
        Artist {
            artist_id: Some("artist-2".to_string()),
            first_name: "רחל".to_string(),
            last_name: "כהן".to_string(),
            birth_year: 1975,
        },
        Artist {
            artist_id: Some("artist-3".to_string()),
            first_name: "יוסי".to_string(),
            last_name: "אברהם".to_string(),
            birth_year: 1985,
        },
    ];

    for artist in artists {
        sqlx::query(
            "INSERT OR IGNORE INTO artists (artist_id, first_name, last_name, birth_year) VALUES (?, ?, ?, ?)"
        )
        .bind(&artist.artist_id)
        .bind(&artist.first_name)
        .bind(&artist.last_name)
        .bind(&artist.birth_year)
        .execute(pool)
        .await?;
    }

    // Insert sample artworks
    let artworks = vec![
        Artwork {
            id_artwork: Some("artwork-1".to_string()),
            title: "שקיעה על הים".to_string(),
            description: "ציור שמן מרהיב של שקיעה על חוף הים התיכון. צבעים חמים של כתום וזהב משתקפים על פני המים.".to_string(),
            year_created: 2023,
            price: 1200.0,
            id_artist: "artist-1".to_string(),
            art_type: "ציור שמן".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1518173946687-a4c036bc5c92?w=400&h=400&fit=crop".to_string()),
        },
        Artwork {
            id_artwork: Some("artwork-2".to_string()),
            title: "פרחי אביב".to_string(),
            description: "זר פרחים צבעוני בסגנון אימפרסיוניסטי. טכניקת אקריליק עם מריחות רחבות ודינמיות.".to_string(),
            year_created: 2023,
            price: 850.0,
            id_artist: "artist-2".to_string(),
            art_type: "אקריליק".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop".to_string()),
        },
        Artwork {
            id_artwork: Some("artwork-3".to_string()),
            title: "נוף הרים".to_string(),
            description: "נוף הרים עדין בטכניקת צבעי מים. שקיפות הצבעים יוצרת תחושה אווררית ורגועה.".to_string(),
            year_created: 2022,
            price: 950.0,
            id_artist: "artist-3".to_string(),
            art_type: "צבעי מים".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop".to_string()),
        },
        Artwork {
            id_artwork: Some("artwork-4".to_string()),
            title: "דיוקן חלומי".to_string(),
            description: "דיוקן רך בטכניקת פסטל. גווני עור עדינים ומבט עמוק יוצרים אווירה רגשית.".to_string(),
            year_created: 2023,
            price: 1500.0,
            id_artist: "artist-1".to_string(),
            art_type: "פסטל".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop".to_string()),
        },
        Artwork {
            id_artwork: Some("artwork-5".to_string()),
            title: "עיר עתיקה".to_string(),
            description: "נוף עירוני של סמטאות ירושלים. ציור שמן עם טקסטורות עשירות ואור חם.".to_string(),
            year_created: 2022,
            price: 1100.0,
            id_artist: "artist-2".to_string(),
            art_type: "ציור שמן".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop".to_string()),
        },
        Artwork {
            id_artwork: Some("artwork-6".to_string()),
            title: "גלים כחולים".to_string(),
            description: "מופשט של גלי ים באקריליק. מריחות אנרגטיות בגווני כחול וטורקיז.".to_string(),
            year_created: 2023,
            price: 780.0,
            id_artist: "artist-3".to_string(),
            art_type: "אקריליק".to_string(),
            image_url: Some("https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop".to_string()),
        },
    ];

    for artwork in artworks {
        sqlx::query(
            "INSERT OR IGNORE INTO artworks (id_artwork, title, description, year_created, price, id_artist, art_type, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(&artwork.id_artwork)
        .bind(&artwork.title)
        .bind(&artwork.description)
        .bind(&artwork.year_created)
        .bind(artwork.price)
        .bind(&artwork.id_artist)
        .bind(&artwork.art_type)
        .bind(&artwork.image_url)
        .execute(pool)
        .await?;
    }

    Ok(())
}

pub async fn init_db() -> Result<SqlitePool, sqlx::Error> {
    let database_url = std::env::var("DATABASE_URL").unwrap_or_else(|_| "sqlite:./mydb.db".to_string());
    let pool = SqlitePool::connect(&database_url).await?;

    sqlx::query("PRAGMA foreign_keys = ON;").execute(&pool).await?;

    customer_controller::init_customers_table(&pool).await?;
    artist_controller::init_artists_table(&pool).await?;
    artwork_controller::init_artwork_table(&pool).await?;
    order_controller::init_orders_table(&pool).await?;
    artwork_in_order_controller::init_artworks_in_order_table(&pool).await?;

    // Insert sample data
    insert_sample_data(&pool).await?;

    Ok(pool)
}