import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';

const SALT_ROUNDS = 10;
const DEMO_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'Password123!';

const createInvalidCredentialsError = () => {
  const error = new Error('Invalid credentials');
  error.status = 401;
  return error;
};

const isDatabaseConnectionError = (error) =>
  ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT'].includes(error?.code);

const authenticateDemoUser = (email, password) => {
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw createInvalidCredentialsError();
  }

  return {
    id: 1,
    email: DEMO_EMAIL,
    name: 'Admin User',
    roleId: 1,
  };
};

export const authenticate = async (email, password) => {
  let result;

  try {
    result = await query('SELECT id, email, password_hash, role_id, name FROM users WHERE email = $1', [email]);
  } catch (error) {
    if (process.env.DEMO_AUTH_ENABLED === 'true' && isDatabaseConnectionError(error)) {
      return authenticateDemoUser(email, password);
    }

    throw error;
  }

  const user = result.rows[0];
  if (!user) {
    throw createInvalidCredentialsError();
  }
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw createInvalidCredentialsError();
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roleId: user.role_id,
  };
};

export const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

export const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const payload = { sub: user.id, roleId: user.roleId, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};
