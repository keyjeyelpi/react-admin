import CryptoJS from 'crypto-js';

export const encrypt = (data: string) =>
  CryptoJS.AES.encrypt(data, import.meta.env.VITE_PRISMA_SECRET || 'secret').toString();

export const decrypt = (data: string) =>
  CryptoJS.AES.decrypt(data, import.meta.env.VITE_PRISMA_SECRET || 'secret').toString(
    CryptoJS.enc.Utf8,
  );

export const signature = (data: Object) =>
  encrypt(
    Object.values(data)
      .map((v) => JSON.stringify(v))
      .join(''),
  );
