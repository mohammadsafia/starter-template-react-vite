import { Label } from '@components/ui';
import { ThemeSwitcher } from '@components/shared';
import { useTheme } from '@contexts';

const ThemeModeSection = () => {
  const { theme } = useTheme();

  return (
    <>
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
    </>
  );
};

export default ThemeModeSection;

