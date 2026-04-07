import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/worker/db/schema.ts",
  dbCredentials: {
    url: process.env.CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE!,
  },
});

// url: import.meta.env.VITE_NEON_DATA_API_URL,
