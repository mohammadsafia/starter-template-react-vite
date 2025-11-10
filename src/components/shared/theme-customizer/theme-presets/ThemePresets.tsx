import { Button, Label } from '@components/ui';
import type { ThemePreset } from '../types';
import { themePresets } from '../constants';

type ThemePresetsProps = {
  onLoadPreset: (preset: ThemePreset) => void;
};

const ThemePresets = ({ onLoadPreset }: ThemePresetsProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">Quick Presets</Label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(themePresets).map(([name, preset]) => (
          <Button
            key={name}
            variant="outline"
            size="sm"
            onClick={() => onLoadPreset(preset)}
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
  );
};

export default ThemePresets;

