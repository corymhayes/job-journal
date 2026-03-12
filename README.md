# Application Tracker

A full-stack job application tracker built as a TypeScript monorepo. Track applications, monitor their progress through the hiring pipeline, and keep all the details in one place.

## Motivation
This project solves a real problem I have, compiling and tracking work applications, while also being a good exercise in building a data-heavy, full-stack TypeScript application - covering everything from database schema to UI state management.

## Tech Stack
| Layer    | Technology         |
| -------- | ------------------ |
| Frontend | React 19, Vite     |
| Routing  | TanStack Router    |
| Forms    | TanStack Form      |
| Table    | TanStack Table     |
| UI       | shadcn/ui Tailwind |
| Backend  | Hono on Bun        |
| Database | Postgres (Neon)    |
| ORM      | Drizzle            |
|          |                    |

## Features
- **Add, edit, and delete** job applications
- **Status tracking** across the full hiring pipeline (Applied -> Offer/Rejected)
- **Days Elapsed** counter
- **Sortable columns** for quick organization

## Architecture
- client/ # React + Vite frontend 
- server/ # Hono REST API running on Bun 
- shared/ # Shared TypeScript types for use on both the client and server
