import { Tabs } from '@components/ui';
import { ColorEditor } from '../color-editor';
import type { ColorVar } from '../types';

type ColorEditorsTabsProps = {
  colors: ColorVar[];
  onColorChange: (cssVar: string, value: string) => void;
};

const ColorEditorsTabs = ({ colors, onColorChange }: ColorEditorsTabsProps) => {
  return (
    <Tabs defaultValue="semantic">
      <Tabs.List className="w-full">
        <Tabs.Trigger value="semantic" className="flex-1">Semantic</Tabs.Trigger>
        <Tabs.Trigger value="core" className="flex-1">Core</Tabs.Trigger>
        <Tabs.Trigger value="special" className="flex-1">Special</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="semantic" className="space-y-3 mt-4">
        {colors.filter((c) => c.group === 'semantic').map((color) => (
          <ColorEditor key={color.cssVar} color={color} onColorChange={onColorChange} />
        ))}
      </Tabs.Content>

      <Tabs.Content value="core" className="space-y-3 mt-4">
        {colors.filter((c) => c.group === 'core').map((color) => (
          <ColorEditor key={color.cssVar} color={color} onColorChange={onColorChange} />
        ))}
      </Tabs.Content>

      <Tabs.Content value="special" className="space-y-3 mt-4">
        {colors.filter((c) => c.group === 'special').map((color) => (
          <ColorEditor key={color.cssVar} color={color} onColorChange={onColorChange} />
        ))}
      </Tabs.Content>
    </Tabs>
  );
};

export default ColorEditorsTabs;

