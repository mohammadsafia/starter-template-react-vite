import { Button, Label, Slider } from '@components/ui';

type RadiusControlProps = {
  radius: number;
  onRadiusChange: (radius: number) => void;
};

const RadiusControl = ({ radius, onRadiusChange }: RadiusControlProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Border Radius</Label>
        <span className="text-xs font-mono text-muted-foreground">{radius}rem</span>
      </div>
      <Slider
        value={[radius * 10]}
        onValueChange={([value]) => onRadiusChange(value / 10)}
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
            onClick={() => onRadiusChange(r)}
            className="flex-1 text-xs"
          >
            {r}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RadiusControl;

