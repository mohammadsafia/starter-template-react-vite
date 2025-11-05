import { Button, DropdownMenu } from '@components/ui';

import { THEME_TYPES, useTheme } from '@contexts';

import { cn } from '@utils';

import { Check, Moon, Sun } from 'lucide-react';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="default" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setTheme(THEME_TYPES.LIGHT)}>
          Light <Check size={14} className={cn('ms-auto', theme !== THEME_TYPES.LIGHT && 'hidden')} />
        </DropdownMenu.Item>

        <DropdownMenu.Item onClick={() => setTheme(THEME_TYPES.DARK)}>
          Dark <Check size={14} className={cn('ms-auto', theme !== THEME_TYPES.DARK && 'hidden')} />
        </DropdownMenu.Item>

        <DropdownMenu.Item onClick={() => setTheme(THEME_TYPES.SYSTEM)}>
          System <Check size={14} className={cn('ms-auto', theme !== THEME_TYPES.SYSTEM && 'hidden')} />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export default ThemeSwitcher;
