import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.NEON_URL });
export default pool;