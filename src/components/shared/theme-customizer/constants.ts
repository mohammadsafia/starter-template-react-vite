import type { ColorVar, ThemePreset } from './types';

export const defaultLightTheme: ColorVar[] = [
  // Core
  { name: 'background', cssVar: '--background', value: 'oklch(0.98 0 0)', label: 'Background', group: 'core' },
  { name: 'foreground', cssVar: '--foreground', value: 'oklch(0.23 0 0)', label: 'Foreground', group: 'core' },
  { name: 'card', cssVar: '--card', value: 'oklch(1 0 0)', label: 'Card', group: 'core' },
  { name: 'card-foreground', cssVar: '--card-foreground', value: 'oklch(0.23 0 0)', label: 'Card Foreground', group: 'core' },
  
  // Semantic
  { name: 'primary', cssVar: '--primary', value: 'oklch(0.37 0.14 323.4)', label: 'Primary', group: 'semantic' },
  { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
  { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.96 0.01 311.36)', label: 'Secondary', group: 'semantic' },
  { name: 'secondary-foreground', cssVar: '--secondary-foreground', value: 'oklch(0.31 0.11 327.1)', label: 'Secondary Foreground', group: 'semantic' },
  { name: 'accent', cssVar: '--accent', value: 'oklch(0.88 0.02 323.34)', label: 'Accent', group: 'semantic' },
  { name: 'accent-foreground', cssVar: '--accent-foreground', value: 'oklch(0.31 0.11 327.1)', label: 'Accent Foreground', group: 'semantic' },
  { name: 'destructive', cssVar: '--destructive', value: 'oklch(0.59 0.22 11.39)', label: 'Destructive', group: 'semantic' },
  { name: 'destructive-foreground', cssVar: '--destructive-foreground', value: 'oklch(1 0 0)', label: 'Destructive Foreground', group: 'semantic' },
  { name: 'muted', cssVar: '--muted', value: 'oklch(0.97 0 0)', label: 'Muted', group: 'semantic' },
  { name: 'muted-foreground', cssVar: '--muted-foreground', value: 'oklch(0.49 0 0)', label: 'Muted Foreground', group: 'semantic' },
  
  // Special
  { name: 'border', cssVar: '--border', value: 'oklch(0.91 0 0)', label: 'Border', group: 'special' },
  { name: 'ring', cssVar: '--ring', value: 'oklch(0.37 0.14 323.4)', label: 'Ring', group: 'special' },
];

export const defaultDarkTheme: ColorVar[] = [
  // Core
  { name: 'background', cssVar: '--background', value: 'oklch(0.23 0.01 260.69)', label: 'Background', group: 'core' },
  { name: 'foreground', cssVar: '--foreground', value: 'oklch(0.93 0 0)', label: 'Foreground', group: 'core' },
  { name: 'card', cssVar: '--card', value: 'oklch(0.26 0.01 260.7)', label: 'Card', group: 'core' },
  { name: 'card-foreground', cssVar: '--card-foreground', value: 'oklch(0.93 0 0)', label: 'Card Foreground', group: 'core' },
  
  // Semantic
  { name: 'primary', cssVar: '--primary', value: 'oklch(0.73 0.14 327.21)', label: 'Primary', group: 'semantic' },
  { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 260.69)', label: 'Primary Foreground', group: 'semantic' },
  { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.3 0.01 254)', label: 'Secondary', group: 'semantic' },
  { name: 'secondary-foreground', cssVar: '--secondary-foreground', value: 'oklch(0.93 0 0)', label: 'Secondary Foreground', group: 'semantic' },
  { name: 'accent', cssVar: '--accent', value: 'oklch(0.33 0.03 326.28)', label: 'Accent', group: 'semantic' },
  { name: 'accent-foreground', cssVar: '--accent-foreground', value: 'oklch(0.93 0 0)', label: 'Accent Foreground', group: 'semantic' },
  { name: 'destructive', cssVar: '--destructive', value: 'oklch(0.69 0.18 15.39)', label: 'Destructive', group: 'semantic' },
  { name: 'destructive-foreground', cssVar: '--destructive-foreground', value: 'oklch(1 0 0)', label: 'Destructive Foreground', group: 'semantic' },
  { name: 'muted', cssVar: '--muted', value: 'oklch(0.26 0.01 260.7)', label: 'Muted', group: 'semantic' },
  { name: 'muted-foreground', cssVar: '--muted-foreground', value: 'oklch(0.68 0 0)', label: 'Muted Foreground', group: 'semantic' },
  
  // Special
  { name: 'border', cssVar: '--border', value: 'oklch(0.3 0.01 268.37)', label: 'Border', group: 'special' },
  { name: 'ring', cssVar: '--ring', value: 'oklch(0.73 0.14 327.21)', label: 'Ring', group: 'special' },
];

export const themePresets: Record<string, ThemePreset> = {
  default: {
    light: defaultLightTheme,
    dark: defaultDarkTheme,
  },
  ocean: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.55 0.18 230)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.92 0.02 200)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.82 0.15 210)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.65 0.18 220)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 220)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.02 200)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.42 0.15 210)', label: 'Accent', group: 'semantic' },
    ],
  },
  forest: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.5 0.16 150)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.88 0.03 135)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.75 0.12 160)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.60 0.16 145)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 145)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.03 135)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.40 0.12 155)', label: 'Accent', group: 'semantic' },
    ],
  },
  sunset: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.6 0.2 30)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.92 0.05 60)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.85 0.15 40)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.70 0.18 35)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 35)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.05 60)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.45 0.15 40)', label: 'Accent', group: 'semantic' },
    ],
  },
  purple: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.5 0.2 290)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.9 0.05 310)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.75 0.18 280)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.65 0.18 285)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 285)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.05 310)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.42 0.18 280)', label: 'Accent', group: 'semantic' },
    ],
  },
  rose: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.58 0.18 15)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.92 0.04 350)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.85 0.12 10)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.68 0.16 12)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 12)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.04 350)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.45 0.12 10)', label: 'Accent', group: 'semantic' },
    ],
  },
  mint: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.52 0.14 170)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.90 0.03 165)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.78 0.10 175)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.62 0.14 168)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 168)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.03 165)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.42 0.10 175)', label: 'Accent', group: 'semantic' },
    ],
  },
  amber: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.68 0.16 75)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.02 75)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.92 0.04 85)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.82 0.12 65)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.75 0.14 73)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.02 73)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.04 85)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.45 0.12 65)', label: 'Accent', group: 'semantic' },
    ],
  },
  slate: {
    light: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.42 0.08 240)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(1 0 0)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.92 0.01 240)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.75 0.05 240)', label: 'Accent', group: 'semantic' },
    ],
    dark: [
      { name: 'primary', cssVar: '--primary', value: 'oklch(0.52 0.08 240)', label: 'Primary', group: 'semantic' },
      { name: 'primary-foreground', cssVar: '--primary-foreground', value: 'oklch(0.15 0.01 240)', label: 'Primary Foreground', group: 'semantic' },
      { name: 'secondary', cssVar: '--secondary', value: 'oklch(0.32 0.01 240)', label: 'Secondary', group: 'semantic' },
      { name: 'accent', cssVar: '--accent', value: 'oklch(0.40 0.05 240)', label: 'Accent', group: 'semantic' },
    ],
  },
};

