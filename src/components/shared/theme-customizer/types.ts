export type ColorVar = {
  name: string;
  cssVar: string;
  value: string;
  label: string;
  group: 'core' | 'semantic' | 'special';
};

export type ThemePreset = {
  light: ColorVar[];
  dark: ColorVar[];
};

