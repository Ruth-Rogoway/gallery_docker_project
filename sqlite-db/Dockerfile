FROM alpine:latest

RUN apk add --no-cache sqlite

# Create data directory
RUN mkdir -p /data
# Ensure /data is writable by anyone
RUN chmod -R 777 /data

# Create an empty database file to ensure it exists
RUN touch /data/mydb.db

# Set working directory
WORKDIR /data

# Keep container running
CMD ["tail", "-f", "/dev/null"]