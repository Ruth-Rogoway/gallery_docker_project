FROM alpine:3.21

# Create data directory, set permissions, and create database file
RUN apk add --no-cache sqlite=3.47.2-r0 && \
    mkdir -p /data && \
    chmod -R 777 /data && \
    touch /data/mydb.db

# Set working directory
WORKDIR /data

# Keep container running
CMD ["tail", "-f", "/dev/null"]