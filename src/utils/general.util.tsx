export const isHexColor = (color: string): boolean => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return hexColorRegex.test(color);
};
