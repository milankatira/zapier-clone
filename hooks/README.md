# Local Development Setup

## PostgreSQL Database Configuration

To run PostgreSQL locally using Docker:

```bash
docker run --name postgres-zapier \
  -e POSTGRES_DB=zapier \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  -d postgres:16-alpine

```

```bash
npx prisma migrate dev  # Create database schema
npx prisma studio       # Launch DB admin UI
```


