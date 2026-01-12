@echo off
cd gallery_server_rust-main
set DATABASE_URL=sqlite:./mydb.db
cargo run