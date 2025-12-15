FROM alpine:latest

RUN apk add --no-cache sqlite

# Create data directory
RUN mkdir -p /data
# Ensure /data is writable by anyone
RUN chmod -R 777 /data

# Set working directory
WORKDIR /data

# Keep container running
CMD ["tail", "-f", "/dev/null"]