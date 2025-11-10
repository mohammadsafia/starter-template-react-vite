import { Label, Slider } from '@components/ui';
import type { ColorVar } from '../types';
import { parseOklch, formatOklch } from '../utils';

type ColorEditorProps = {
  color: ColorVar;
  onColorChange: (cssVar: string, value: string) => void;
};

const ColorEditor = ({ color, onColorChange }: ColorEditorProps) => {
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
      <div className="pt-1 border-t">
        <p className="text-xs font-mono text-muted-foreground">{color.value}</p>
      </div>
    </div>
  );
};

export default ColorEditor;

