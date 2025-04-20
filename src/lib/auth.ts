'use server';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'guvenal-secret-key';

export const verifyJwtToken = async (token: string) => {
  try {
    console.log('Token doğrulanıyor:', token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token doğrulandı:', decoded);
    return true;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return false;
  }
}; 