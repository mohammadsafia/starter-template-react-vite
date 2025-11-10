import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useToast } from '@hooks/shared';
import { useTheme } from '@contexts';

import {
  ActionButtons,
  type ColorVar,
  type ThemePreset,
  ThemePresets,
  ThemeCustomizerHeader,
  ThemeModeSection,
  RadiusControl,
  ColorEditorsTabs,
  GeneratedCSSPreview,
  defaultLightTheme,
  defaultDarkTheme,
} from '@components/shared';

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
      description: 'Preset applied to both light and dark modes!',
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

  return (
    <div ref={scrollContainerRef} className="bg-card sticky top-0 hidden h-screen w-80 overflow-y-auto border-l xl:block">
      <div className="space-y-6 p-6">
        <ThemeCustomizerHeader />
        <ThemeModeSection />
        <ActionButtons onReset={resetTheme} onCopy={copyToClipboard} copied={copied} />
        <ThemePresets onLoadPreset={loadPreset} />
        <RadiusControl radius={radius} onRadiusChange={setRadius} />
        <ColorEditorsTabs colors={colors} onColorChange={updateColor} />
        <GeneratedCSSPreview css={exportTheme()} />
      </div>
    </div>
  );
};

export default ThemeCustomizer;

