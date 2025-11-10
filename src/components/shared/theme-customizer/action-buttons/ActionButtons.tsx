import { Button } from '@components/ui';
import { Copy, RotateCcw, Check } from 'lucide-react';

type ActionButtonsProps = {
  onReset: () => void;
  onCopy: () => void;
  copied: boolean;
};

const ActionButtons = ({ onReset, onCopy, copied }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onReset} className="flex-1">
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
      <Button size="sm" onClick={onCopy} className="flex-1">
        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
        {copied ? 'Copied!' : 'Copy CSS'}
      </Button>
    </div>
  );
};

export default ActionButtons;

