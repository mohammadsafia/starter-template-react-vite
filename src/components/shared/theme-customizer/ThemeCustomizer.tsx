import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Button, Label, Slider, Tabs } from '@components/ui';
import { Palette, Copy, RotateCcw, Check } from 'lucide-react';
import { useToast } from '@hooks/shared';
import { useTheme } from '@contexts';
import { ThemeSwitcher } from '@components/shared';

type ColorVar = {
  name: string;
  cssVar: string;
  value: string;
  label: string;
  group: 'core' | 'semantic' | 'special';
};

const defaultLightTheme: ColorVar[] = [
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

const defaultDarkTheme: ColorVar[] = [
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

type ThemePreset = {
  light: ColorVar[];
  dark: ColorVar[];
};

const themePresets: Record<string, ThemePreset> = {
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

export const ThemeCustomizer = () => {
  const [lightColors, setLightColors] = useState<ColorVar[]>(defaultLightTheme);
  const [darkColors, setDarkColors] = useState<ColorVar[]>(defaultDarkTheme);
  const [radius, setRadius] = useState(0.5);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  // Get colors based on current theme
  const colors = theme === 'dark' ? darkColors : lightColors;
  const setColors = theme === 'dark' ? setDarkColors : setLightColors;

  // Continuously track scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isUpdatingRef.current) {
        scrollPositionRef.current = container.scrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore scroll position immediately after color updates using layoutEffect
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (container && scrollPositionRef.current > 0) {
      isUpdatingRef.current = true;
      container.scrollTop = scrollPositionRef.current;
      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    }
  }, [lightColors, darkColors]);

  // Apply theme colors to CSS variables in real-time
  useEffect(() => {
    const root = document.documentElement;
    colors.forEach((color) => {
      root.style.setProperty(color.cssVar, color.value);
    });
    root.style.setProperty('--radius', `${radius}rem`);
  }, [colors, radius, theme]);

  const updateColor = (cssVar: string, value: string) => {
    setColors(colors.map((c) => (c.cssVar === cssVar ? { ...c, value } : c)));
  };

  const loadPreset = (preset: ThemePreset) => {
    // Apply light theme preset
    const mergedLightColors = lightColors.map((color) => {
      const presetColor = preset.light.find((p) => p.cssVar === color.cssVar);
      return presetColor || color;
    });
    setLightColors(mergedLightColors);

    // Apply dark theme preset
    const mergedDarkColors = darkColors.map((color) => {
      const presetColor = preset.dark.find((p) => p.cssVar === color.cssVar);
      return presetColor || color;
    });
    setDarkColors(mergedDarkColors);

    toast({ 
      title: 'Theme Applied', 
      description: 'Preset applied to both light and dark modes!' 
    });
  };

  const resetTheme = () => {
    setLightColors(defaultLightTheme);
    setDarkColors(defaultDarkTheme);
    setRadius(0.5);
    toast({ title: 'Theme Reset', description: 'Both light and dark themes have been reset to default.' });
  };

  const exportTheme = () => {
    const lightCss = lightColors.map((c) => `  ${c.cssVar}: ${c.value};`).join('\n');
    const darkCss = darkColors.map((c) => `  ${c.cssVar}: ${c.value};`).join('\n');
    const css = `:root {\n${lightCss}\n  --radius: ${radius}rem;\n}\n\n.dark {\n${darkCss}\n  --radius: ${radius}rem;\n}`;
    return css;
  };

  const copyToClipboard = () => {
    const fullCSS = `:root {\n${exportTheme()}\n}`;
    navigator.clipboard.writeText(fullCSS);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Theme CSS copied to clipboard. Paste it in your index.css!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const parseOklch = (oklchString: string) => {
    const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (match) {
      return { l: parseFloat(match[1]), c: parseFloat(match[2]), h: parseFloat(match[3]) };
    }
    return { l: 0.5, c: 0.1, h: 0 };
  };

  const formatOklch = (l: number, c: number, h: number) => {
    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} ${h.toFixed(2)})`;
  };

  const ColorEditor = ({ color }: { color: ColorVar }) => {
    const { l, c, h } = parseOklch(color.value);

    return (
      <div className="space-y-3 p-3 border rounded-lg bg-card">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">{color.label}</Label>
          {/* Color Preview */}
          <div
            className="h-8 w-16 rounded border shadow-sm"
            style={{ background: color.value }}
            title={color.value}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Lightness</span>
            <span className="font-mono">{(l * 100).toFixed(0)}%</span>
          </div>
          <div className="py-2">
            <Slider
              value={[l * 100]}
              onValueChange={([value]) => {
                const newColor = formatOklch(value / 100, c, h);
                updateColor(color.cssVar, newColor);
              }}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Chroma</span>
            <span className="font-mono">{(c * 100).toFixed(0)}%</span>
          </div>
          <div className="py-2">
            <Slider
              value={[c * 100]}
              onValueChange={([value]) => {
                const newColor = formatOklch(l, value / 100, h);
                updateColor(color.cssVar, newColor);
              }}
              min={0}
              max={40}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Hue</span>
            <span className="font-mono">{h.toFixed(0)}°</span>
          </div>
          <div className="py-2">
            <Slider
              value={[h]}
              onValueChange={([value]) => {
                const newColor = formatOklch(l, c, value);
                updateColor(color.cssVar, newColor);
              }}
              min={0}
              max={360}
              step={1}
            />
          </div>
        </div>

        {/* OKLCH Value Display */}
        <div className="pt-1 border-t">
          <p className="text-xs font-mono text-muted-foreground">{color.value}</p>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="w-80 border-l bg-card h-screen overflow-y-auto sticky top-0 hidden xl:block"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customizer
          </h3>
          <p className="text-xs text-muted-foreground">
            Customize your theme in real-time. Changes apply immediately to all components.
          </p>
        </div>

        {/* Dark/Light Mode Toggle */}
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
          <Label className="text-sm font-medium">Theme Mode</Label>
          <ThemeSwitcher />
        </div>

        {/* Current Mode Indicator */}
        <div className="p-3 border rounded-lg bg-primary/5">
          <p className="text-xs text-muted-foreground">
            Currently editing: <span className="font-semibold text-foreground capitalize">{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System'} Mode</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Changes apply to the {theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'active'} theme only.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetTheme} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={copyToClipboard} className="flex-1">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </Button>
        </div>

            {/* Theme Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(themePresets).map(([name, preset]) => (
                  <Button
                    key={name}
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset(preset)}
                    className="h-auto flex-col items-start gap-1 p-2"
                  >
                    <Label className="text-xs text-muted-foreground capitalize">{name}</Label>
                    <div className="flex items-center gap-1 w-full">
                      <div className="flex gap-0.5">
                        {preset.light.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-sm border"
                            style={{ background: color.value }}
                            title="Light mode"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground mx-1">|</span>
                      <div className="flex gap-0.5">
                        {preset.dark.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-sm border"
                            style={{ background: color.value }}
                            title="Dark mode"
                          />
                        ))}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Radius Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Border Radius</Label>
                <span className="text-xs font-mono text-muted-foreground">{radius}rem</span>
              </div>
              <Slider
                value={[radius * 10]}
                onValueChange={([value]) => setRadius(value / 10)}
                min={0}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex gap-2">
                {[0, 0.3, 0.5, 0.75, 1].map((r) => (
                  <Button
                    key={r}
                    variant={radius === r ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRadius(r)}
                    className="flex-1 text-xs"
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Editors */}
            <Tabs defaultValue="semantic">
              <Tabs.List className="w-full">
                <Tabs.Trigger value="semantic" className="flex-1">Semantic</Tabs.Trigger>
                <Tabs.Trigger value="core" className="flex-1">Core</Tabs.Trigger>
                <Tabs.Trigger value="special" className="flex-1">Special</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="semantic" className="space-y-3 mt-4">
                {colors.filter((c) => c.group === 'semantic').map((color) => (
                  <ColorEditor key={color.cssVar} color={color} />
                ))}
              </Tabs.Content>

              <Tabs.Content value="core" className="space-y-3 mt-4">
                {colors.filter((c) => c.group === 'core').map((color) => (
                  <ColorEditor key={color.cssVar} color={color} />
                ))}
              </Tabs.Content>

              <Tabs.Content value="special" className="space-y-3 mt-4">
                {colors.filter((c) => c.group === 'special').map((color) => (
                  <ColorEditor key={color.cssVar} color={color} />
                ))}
              </Tabs.Content>
            </Tabs>

            {/* Generated CSS Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Generated CSS (for index.css :root)</Label>
              <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs font-mono max-h-40 overflow-y-auto">
                {exportTheme()}
              </pre>
              <p className="text-xs text-muted-foreground">
                Copy this CSS and paste it in your <code className="bg-muted px-1 py-0.5 rounded">index.css</code> file inside the <code className="bg-muted px-1 py-0.5 rounded">:root</code> selector.
              </p>
            </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;

