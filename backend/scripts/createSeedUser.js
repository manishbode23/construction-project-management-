import dotenv from 'dotenv';
import { hashPassword } from '../src/services/authService.js';
import { query } from '../src/db/index.js';

dotenv.config();

const email = process.argv[2] || 'admin@example.com';
const password = process.argv[3] || 'Password123!';
const name = process.argv[4] || 'Admin User';
const roleId = process.argv[5] ? Number.parseInt(process.argv[5], 10) : null;
const companyId = process.argv[6] ? parseInt(process.argv[6], 10) : null;

const ensureRoleId = async () => {
  if (roleId) {
    return roleId;
  }

  const result = await query(
    `INSERT INTO roles (name)
     VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    ['admin']
  );

  return result.rows[0].id;
};

(async () => {
  try {
    const resolvedRoleId = await ensureRoleId();
    const passwordHash = await hashPassword(password);
    const res = await query(
      `INSERT INTO users (company_id, role_id, name, email, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET
        company_id = EXCLUDED.company_id,
        role_id = EXCLUDED.role_id,
        name = EXCLUDED.name,
        password_hash = EXCLUDED.password_hash,
        active = TRUE
       RETURNING id, email, name`,
      [companyId, resolvedRoleId, name, email, passwordHash]
    );
    console.log('Seed user ready:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Failed to create user:', err.message || err);
    process.exit(1);
  }
})();
