FROM alpine:latest

RUN apk add --no-cache sqlite

# Create data directory
RUN mkdir -p /data

# Set working directory
WORKDIR /data

# Keep container running
CMD ["tail", "-f", "/dev/null"]
