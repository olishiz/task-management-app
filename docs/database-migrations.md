# Database Migrations Guide

This document explains how to manage database migrations for the Task Management App.

## Table of Contents

1. [Introduction](#introduction)
2. [Using Prisma Migrate](#using-prisma-migrate)
3. [Migration Workflow](#migration-workflow)
4. [Handling Migration in Different Environments](#handling-migration-in-different-environments)
5. [Troubleshooting](#troubleshooting)

## Introduction

The Task Management App uses Prisma ORM to manage database migrations. Prisma Migrate creates SQL migration files when you change your Prisma schema, allowing you to:

- Keep track of all database schema changes
- Apply migrations in development and production environments
- Roll back changes when needed
- Collaborate with team members using version control

## Using Prisma Migrate

### Prerequisites

- Node.js installed
- Access to your PostgreSQL database
- Environment variables properly set up

### Key Commands

```bash
# Generate a new migration
npx prisma migrate dev --name <migration-name>

# Apply pending migrations to a database
npx prisma migrate deploy

# Reset the database (development only)
npx prisma migrate reset

# Create a migration without applying it
npx prisma migrate dev --create-only

# Generate Prisma client
npx prisma generate
```

## Migration Workflow

### Development Flow

1. **Make changes to your Prisma schema**:
   Edit `backend/prisma/schema.prisma` to add new models or modify existing ones.

2. **Generate and apply migration**:
   ```bash
   cd backend
   npx prisma migrate dev --name <descriptive-name>
   ```
   This will:
   - Create a new migration file in the `prisma/migrations` directory
   - Apply the migration to your development database
   - Generate the Prisma Client

3. **Test your changes** to ensure they work as expected.

4. **Commit the changes** to your version control system:
   ```bash
   git add prisma/migrations
   git add prisma/schema.prisma
   git commit -m "Add new feature X"
   ```

### Production Flow

In production, migrations should be applied automatically when the backend service starts. This is configured in the Docker Compose file:

```yaml
command: >
  sh -c "npx prisma migrate deploy && 
         node dist/main"
```

The `prisma migrate deploy` command applies pending migrations without generating new ones.

## Handling Migration in Different Environments

### Local Development

Use `npx prisma migrate dev` which:
- Creates migration files
- Applies them to your database
- Regenerates Prisma Client

### Staging/Testing

Use `npx prisma migrate deploy` which:
- Applies pending migrations
- Does not create new migration files
- Works in non-interactive environments

### Production

Always use `npx prisma migrate deploy` in production to apply existing migrations without creating new ones.

## Advanced Migration Scenarios

### Adding New Fields

To add a new field to an existing model:

1. Add the field to your model in `schema.prisma`
2. Generate a migration with `npx prisma migrate dev --name add_field_x`
3. The generated migration will include an `ALTER TABLE` statement

### Renaming Fields

Prisma doesn't detect renames automatically. To rename a field:

1. Create a migration with `--create-only` flag
2. Edit the SQL to use `ALTER TABLE ... RENAME COLUMN`
3. Apply the custom migration

### Data Migrations

To migrate data (not just schema):

1. Create a migration with `--create-only`
2. Edit the SQL to include data transformation logic
3. Apply the custom migration

## Troubleshooting

### Common Issues

1. **Migration doesn't apply**:
   - Check connection string and database permissions
   - Verify that previous migrations completed successfully
   - Look for errors in the logs

2. **Conflicts in schema**:
   - If your local schema conflicts with the database schema, use `prisma migrate dev --reset` (caution: resets database)

3. **Migrations work locally but fail in production**:
   - Check for environment-specific database features
   - Verify production database permissions
   - Check for database version differences

### Migration Drift

If your database schema drifts from your Prisma schema:

1. Use `npx prisma migrate diff` to identify differences
2. Create a new migration to resolve the differences
3. Apply the migration using `npx prisma migrate deploy`

### Resetting in Development

To completely reset your development database:

```bash
npx prisma migrate reset
```

This will:
- Drop all database tables
- Re-apply all migrations
- Run seed scripts if configured

**Warning**: Never use `migrate reset` in production as it destroys all data.
