import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-encryption-key';

export const encrypt = (data: string) =>
  CryptoJS.AES.encrypt(data, ENCRYPTION_KEY || 'secret').toString();

export const decrypt = (data: string) =>
  CryptoJS.AES.decrypt(data, ENCRYPTION_KEY || 'secret').toString(CryptoJS.enc.Utf8);

export const hash = (data?: string) =>
  bcrypt.hash(data || ENCRYPTION_KEY || 'default-password', 10);
