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

// Validate hex color code
export const isValidHex = (hex: string): boolean => {
  const cleanHex = hex.replace('#', '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex);
};

// Helper: Convert sRGB to linear RGB
const srgbToLinear = (val: number): number => {
  const normalized = val / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

// Helper: Convert linear RGB to sRGB
const linearToSrgb = (val: number): number => {
  const clamped = Math.max(0, Math.min(1, val));
  const normalized = clamped <= 0.0031308
    ? clamped * 12.92
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(normalized * 255);
};

// Helper: Convert linear RGB to XYZ (D65)
const linearRgbToXyz = (r: number, g: number, b: number) => {
  const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  return { x, y, z };
};

// Helper: Convert XYZ to linear RGB (D65)
const xyzToLinearRgb = (x: number, y: number, z: number) => {
  const r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  const g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
  const b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
  return { r, g, b };
};

// Helper: Convert XYZ to OKLab
const xyzToOklab = (x: number, y: number, z: number) => {
  const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
};

// Helper: Convert OKLab to XYZ
const oklabToXyz = (L: number, a: number, b: number) => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return {
    x: +1.2270138511 * l - 0.5577999807 * m + 0.2812561489 * s,
    y: -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s,
    z: -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s,
  };
};

// Helper: Convert OKLab to OKLCH
const oklabToOklch = (L: number, a: number, b: number) => {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return { l: L, c, h };
};

// Helper: Convert OKLCH to OKLab
const oklchToOklab = (l: number, c: number, h: number) => {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  return { L: l, a, b };
};

// Convert hex to OKLCH
export const hexToOklch = (hex: string): string => {
  if (!isValidHex(hex)) {
    return 'oklch(0.5 0.1 0)';
  }

  // Remove # and expand shorthand
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Convert to linear RGB
  const rLinear = srgbToLinear(r);
  const gLinear = srgbToLinear(g);
  const bLinear = srgbToLinear(b);

  // Convert to XYZ
  const { x, y, z } = linearRgbToXyz(rLinear, gLinear, bLinear);

  // Convert to OKLab
  const { L, a: labA, b: labB } = xyzToOklab(x, y, z);

  // Convert to OKLCH
  const { l, c, h } = oklabToOklch(L, labA, labB);

  return formatOklch(l, c, h);
};

// Convert OKLCH to hex
export const oklchToHex = (oklchString: string): string => {
  const { l, c, h } = parseOklch(oklchString);

  // Convert to OKLab
  const { L, a, b: labB } = oklchToOklab(l, c, h);

  // Convert to XYZ
  const { x, y, z } = oklabToXyz(L, a, labB);

  // Convert to linear RGB
  const { r: rLinear, g: gLinear, b: bLinear } = xyzToLinearRgb(x, y, z);

  // Convert to sRGB
  const rSrgb = linearToSrgb(rLinear);
  const gSrgb = linearToSrgb(gLinear);
  const bSrgb = linearToSrgb(bLinear);

  // Convert to hex
  const toHex = (val: number) => {
    const clamped = Math.max(0, Math.min(255, val));
    return clamped.toString(16).padStart(2, '0');
  };

  return `#${toHex(rSrgb)}${toHex(gSrgb)}${toHex(bSrgb)}`;
};

