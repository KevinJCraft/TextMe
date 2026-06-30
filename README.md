# Backend Template

Node/Express/TypeScript backend template with Prisma, JWT auth, and standard tooling.

## Stack

- Node.js, Express, TypeScript
- Prisma + PostgreSQL
- JWT + bcrypt for auth
- Zod for validation
- Winston for logging

## Setup

1. Clone this template
2. npm install
3. Copy .env.example to .env and fill in values
4. npx prisma migrate dev --name init
5. npm run dev

## Environment Variables

- DATABASE_URL - Postgres connection string
- JWT_SECRET - secret key for signing JWTs
- PORT - optional, defaults to 3001
- NODE_ENV - optional, defaults to development

## Project Structure

src/
config/ - environment variable validation
controllers/ - request/response handling
dtos/ - Zod schemas for request validation
lib/ - shared utilities (prisma client, logger, asyncHandler, apiResponse)
middleware/ - auth, error handling, rate limiting
models/ - database queries
routes/ - route definitions
generated/ - Prisma generated client (gitignored)
prisma/
schema.prisma - database schema
seed.ts - seed entry point
seeders/ - individual seed files

## Patterns

- Controllers use asyncHandler to avoid repetitive try/catch
- All responses use sendSuccess helper for consistent shape: success, message, data
- Errors use AppError class with a status code, caught by global errorHandler
- Protected routes use authenticate middleware, which adds userId to req

## Scripts

- npm run dev - start dev server with hot reload
- npm run build - compile TypeScript
- npm start - run compiled build
