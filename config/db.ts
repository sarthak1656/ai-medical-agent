import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

declare global {
  var pool: Pool | undefined;
}

const pool =
  global.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5, // important for Supabase free
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  global.pool = pool;
}

export const db = drizzle(pool);
