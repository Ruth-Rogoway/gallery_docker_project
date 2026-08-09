# Gallery Application with Docker Load Balancing

This project contains a full-stack art gallery application with Docker containerization and NGINX load balancing.

## Architecture

- **Frontend**: React application (Port 3000)
- **Backend**: 2 Rust API servers with load balancing (Ports 3007, 3008)
- **Database**: SQLite with persistent volume (WAL mode for concurrent access)
- **Load Balancer**: NGINX with `least_conn` (Port 8080)

## Services

1. **database**: SQLite database container
2. **rust-app-1** (`backend`): First Rust backend server (Port 3007)
3. **rust-app-2** (`backend-2`): Second Rust backend server (Port 3008)
4. **nginx**: Load balancer proxying API requests to both backends (Port 8080)
5. **frontend**: React application (Port 3000)

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone and navigate to the project directory**
   ```bash
   cd gallery_docker_project-master
   ```

2. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API Load Balancer: http://localhost:8080
   - Backend Server 1: http://localhost:3007
   - Backend Server 2: http://localhost:3008

## API Endpoints

All API requests from the frontend are proxied through NGINX to the backend servers:

- `GET /artworks/` - Get all artworks
- `POST /artworks/` - Create new artwork
- `PUT /artworks/{id}` - Update artwork
- `DELETE /artworks/{id}` - Delete artwork
- `GET /artists/` - Get all artists
- `POST /customers/` - Register customer
- `GET /customers/login` - Customer login

## Database

The SQLite database is stored in a Docker volume (`db_data`) and persists between container restarts. The database file is located at `/data/mydb.db` inside the database container. WAL mode is enabled to support concurrent reads/writes from both backend instances.

## Load Balancing

NGINX distributes API requests between the two Rust backend servers using `least_conn` (sends each request to the server with the fewest active connections). If a backend fails 3 consecutive health checks, it is temporarily removed for 30 seconds (`max_fails=3 fail_timeout=30s`).

## Development

To run in detached mode:
```bash
docker-compose up -d --build
```

To view logs:
```bash
docker-compose logs -f [service-name]
```

To stop services:
```bash
docker-compose down
```

To rebuild after code changes:
```bash
docker-compose up --build --force-recreate
```

## Troubleshooting

1. **Database connection issues**: Ensure the database container is healthy before starting backend services
2. **Port conflicts**: Make sure ports 3000, 3007, 3008, 8080 are available
3. **Build failures**: Check Docker and Docker Compose versions
4. **Load balancing not working**: Verify both `rust-app-1` and `rust-app-2` are running (`docker ps`)

## Health Checks

- Database health check: `sqlite3 /data/mydb.db "SELECT 1;"`
- Nginx health check: `GET http://localhost:8080/health`
- Backend health check: `GET http://localhost:3007/` or `GET http://localhost:3008/`
