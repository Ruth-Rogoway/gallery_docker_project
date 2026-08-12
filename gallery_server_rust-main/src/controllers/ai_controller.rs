use actix_web::{web, HttpResponse, Responder};
use reqwest::Client;
use serde_json::json;
use std::env;

pub async fn generate_image_ai_handler(info: web::Json<serde_json::Value>) -> impl Responder {
    let prompt = match info["prompt"].as_str() {
        Some(s) => s,
        None => {
            eprintln!("Missing 'prompt' in request body");
            return HttpResponse::BadRequest().body("Missing 'prompt' in request body")
        }
    };

    println!("Received request to generate image with prompt: {}", prompt);

    match generate_image_ai(prompt).await {
        Ok(image_data_base64) => { // Changed back to base64
            println!("Successfully generated image data (base64).");
            HttpResponse::Ok().body(image_data_base64) // Return the base64 data
        },
        Err(e) => {
            eprintln!("Failed to generate image from AI API: {}", e);
            HttpResponse::InternalServerError().body(format!("Failed to generate image: {}", e))
        }
    }
}

async fn generate_image_ai(prompt: &str) -> Result<String, Box<dyn std::error::Error>> {
    let api_key = match env::var("HF_API_KEY") { // Changed env var name
        Ok(key) => {
            println!("HF_API_KEY loaded successfully.");
            key
        },
        Err(e) => {
            eprintln!("Failed to load HF_API_KEY: {}", e);
            return Err(Box::new(e));
        }
    };
    // HF Inference no longer serves SDXL 1.0 (410 Gone). Use a current warm model.
    let model_id = env::var("HF_IMAGE_MODEL")
        .unwrap_or_else(|_| "stabilityai/stable-diffusion-3-medium-diffusers".to_string());
    let url = format!(
        "https://router.huggingface.co/hf-inference/models/{}",
        model_id
    );
    println!("Calling Hugging Face API URL: {}", url);

    let client = Client::new();
    let response = client
        .post(&url)
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&json!({
            "inputs": prompt,
        }))
        .send()
        .await?;

    let status = response.status();
    let response_bytes = response.bytes().await?;
    let response_text = String::from_utf8_lossy(&response_bytes).to_string();

    println!("Hugging Face API responded with status: {}", status);
    if !status.is_success() || !response_text.is_empty() {
        println!("Hugging Face API raw response: {}", response_text);
    }


    if !status.is_success() {
        return Err(format!("Hugging Face API returned an error status: {} - {}", status, response_text).into());
    }

    let image_base64_encoded = base64::encode(&response_bytes);

    Ok(image_base64_encoded)
}