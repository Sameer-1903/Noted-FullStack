import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export const testConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    await initDB();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id         SERIAL PRIMARY KEY,
      title      TEXT NOT NULL DEFAULT '',
      body       TEXT NOT NULL DEFAULT '',
      color      INTEGER NOT NULL DEFAULT 0,
      pinned     BOOLEAN NOT NULL DEFAULT false,
      type       TEXT NOT NULL DEFAULT 'note',
      items      TEXT NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // -- Add columns if upgrading from v1
  await pool.query(`ALTER TABLE notes ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'note'`);
  await pool.query(`ALTER TABLE notes ADD COLUMN IF NOT EXISTS items TEXT NOT NULL DEFAULT '[]'`);

  console.log("✅ Notes table ready (v2)");
};

export default pool;