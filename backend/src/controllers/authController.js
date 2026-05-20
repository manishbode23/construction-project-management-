import { authenticate, createToken } from '../services/authService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    const token = createToken(user);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res) => {
  res.json({ message: 'Refresh endpoint placeholder' });
};

export const logout = async (req, res) => {
  res.json({ message: 'Logout successful' });
};
