
FROM rust:latest as builder

WORKDIR /app

# Copy Cargo.toml and Cargo.lock
COPY Cargo.toml Cargo.lock ./

# Copy source code
COPY src ./src

# Build the application
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the built binary from builder stage
COPY --from=builder /app/target/release/app /app/app

# Create data directory for database
RUN mkdir -p /data

# Expose port
EXPOSE 3007

# Make sure the binary exists and is executable
RUN ls -la /app/ && test -f /app/app && chmod +x /app/app

# Set the binary as entrypoint
CMD ["./app"]
