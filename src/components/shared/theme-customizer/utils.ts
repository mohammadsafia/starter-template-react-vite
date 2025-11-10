export const parseOklch = (oklchString: string) => {
  const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (match) {
    return { l: parseFloat(match[1]), c: parseFloat(match[2]), h: parseFloat(match[3]) };
  }
  return { l: 0.5, c: 0.1, h: 0 };
};

export const formatOklch = (l: number, c: number, h: number) => {
  return `oklch(${l.toFixed(2)} ${c.toFixed(2)} ${h.toFixed(2)})`;
};

