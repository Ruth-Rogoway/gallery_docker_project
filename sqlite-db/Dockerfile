FROM alpine:3.19

# No apk installs — the Rust apps open/create the SQLite DB themselves via sqlx.
# This also avoids SSL/MITM failures when building behind corporate proxies.
RUN mkdir -p /data && chmod -R 777 /data && touch /data/mydb.db

WORKDIR /data

CMD ["tail", "-f", "/dev/null"]
