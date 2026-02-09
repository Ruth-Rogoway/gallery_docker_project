
FROM rust:1.88-slim AS builder

WORKDIR /app

# Install build dependencies for OpenSSL
# libssl-dev for OpenSSL headers and pkg-config for finding them
RUN apt-get update && apt-get install -y --no-install-recommends \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy Cargo.toml (Cargo.lock will be generated if needed)
COPY Cargo.toml ./

# Copy source code
COPY src ./src

# Build the application
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
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

# Set the binary as entrypoint
CMD ["./app"]
