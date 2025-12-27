import { encrypt } from './encryption.util';

export const DEMO_MODE: boolean = import.meta.env.VITE_DEMO_MODE === 'true';
export const isNumber = (a: unknown): a is number => !Number.isNaN(a) && typeof a === 'number';
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const start = performance.now();
    const check = () => {
      if (ms <= performance.now() - start) resolve();
      else requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
};

export const createSignature = (data: Record<string, unknown>) =>
  encrypt(
    Object.values(data)
      .map((v) => JSON.stringify(v))
      .join(''),
  );
