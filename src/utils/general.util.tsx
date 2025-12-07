export const isHexColor = (color: string): boolean => {
  const hexColorRegex = /^#([\dA-Fa-f]{3}){1,2}$/;
  return hexColorRegex.test(color);
};
