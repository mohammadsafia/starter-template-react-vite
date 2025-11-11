import { useState, useEffect } from 'react';
import { Label, Slider, Input } from '@components/ui';
import type { ColorVar } from '../types';
import { parseOklch, formatOklch, hexToOklch, oklchToHex, isValidHex } from '../utils';
import { cn } from '@lib/utils/tailwind';

type ColorEditorProps = {
  color: ColorVar;
  onColorChange: (cssVar: string, value: string) => void;
};

const ColorEditor = ({ color, onColorChange }: ColorEditorProps) => {
  const { l, c, h } = parseOklch(color.value);
  const [hexInput, setHexInput] = useState('');
  const [hexError, setHexError] = useState(false);

  // Update hex input when color changes from sliders
  useEffect(() => {
    const hexValue = oklchToHex(color.value);
    setHexInput(hexValue);
    setHexError(false);
  }, [color.value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);

    // Validate and convert
    if (value && isValidHex(value)) {
      const oklchValue = hexToOklch(value);
      onColorChange(color.cssVar, oklchValue);
      setHexError(false);
    } else if (value) {
      setHexError(true);
    } else {
      setHexError(false);
    }
  };

  return (
    <div className="bg-card space-y-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">{color.label}</Label>
        {/* Color Preview */}
        <div className="flex items-center gap-2">
          <div className="space-y-1">
            <Input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              placeholder="#000000"
              className={cn('font-mono text-xs w-24', {
                'border-destructive ring-destructive': hexError,
              })}
            />
            {hexError && <p className="text-destructive text-xs">Invalid hex color</p>}
          </div>
          <div className="h-8 w-16 rounded border shadow-sm" style={{ background: color.value }} title={color.value} />
        </div>
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
              onColorChange(color.cssVar, newColor);
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
              onColorChange(color.cssVar, newColor);
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
              onColorChange(color.cssVar, newColor);
            }}
            min={0}
            max={360}
            step={1}
          />
        </div>
      </div>

      {/* OKLCH Value Display */}
      <div className="border-t pt-1">
        <p className="text-muted-foreground font-mono text-xs">{color.value}</p>
      </div>
    </div>
  );
};

export default ColorEditor;

