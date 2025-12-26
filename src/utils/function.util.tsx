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
