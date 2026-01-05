FROM alpine:3.19

# Install sqlite and create data directory with proper permissions
RUN apk add --no-cache sqlite && \
    mkdir -p /data && \
    chmod -R 777 /data && \
    touch /data/mydb.db

# Set working directory
WORKDIR /data

# Keep container running
CMD ["tail", "-f", "/dev/null"]