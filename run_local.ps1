# Run the gallery project locally without Docker
# Backend: http://localhost:3007
# Frontend: http://localhost:3000

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Rust backend on http://localhost:3007 ..."
$backendJob = Start-Job -ScriptBlock {
    param($root)
    Set-Location "$root\gallery_server_rust-main"
    $env:DATABASE_URL = "sqlite:./mydb.db"
    $env:PORT = "3007"
    & "$root\gallery_server_rust-main\target\release\app.exe"
} -ArgumentList $root

Start-Sleep -Seconds 3

Write-Host "Starting React frontend on http://localhost:3000 ..."
Write-Host "API base URL: http://localhost:3007"
Set-Location "$root\gallery_app_react-main"
$env:REACT_APP_API_BASE_URL = "http://localhost:3007"
npm start

Stop-Job $backendJob -ErrorAction SilentlyContinue
Remove-Job $backendJob -ErrorAction SilentlyContinue
