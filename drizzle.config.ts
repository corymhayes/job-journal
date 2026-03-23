import { defineConfig } from "drizzle-kit";
console.log(process.env);
export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/worker/db/schema.ts",
  dbCredentials: {
    url: process.env.CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE!,
  },
});
