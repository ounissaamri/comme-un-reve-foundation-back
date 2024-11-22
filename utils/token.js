import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_KEY_SECRET, {expiresIn});
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY_SECRET);
};
