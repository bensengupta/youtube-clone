# youtube-clone

## Pre-requisites

- Docker compose

## Development tools

```sh
# templ - install if modifying html components
go install github.com/a-h/templ/cmd/templ@latest
# migrate - install if creating/applying migrations
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

## Useful commands

```sh
cd backend

# Create migration
./bin/create-migration <name_of_the_migration>

# Apply migrations (note: happens automatically when docker-compose starts)
./bin/migrate up
# or ./bin/migrate down

# SQL shell
docker exec -it yt-postgres psql

# Start watching for template changes
templ generate --watch
```
