import { Palette } from 'lucide-react';

const ThemeCustomizerHeader = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Palette className="h-5 w-5" />
        Theme Customizer
      </h3>
      <p className="text-xs text-muted-foreground">
        Customize your theme in real-time. Changes apply immediately to all components.
      </p>
    </div>
  );
};

export default ThemeCustomizerHeader;

