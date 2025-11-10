import { Label } from '@components/ui';

type GeneratedCSSPreviewProps = {
  css: string;
};

const GeneratedCSSPreview = ({ css }: GeneratedCSSPreviewProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">Generated CSS (for index.css :root)</Label>
      <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs font-mono max-h-40 overflow-y-auto">
        {css}
      </pre>
      <p className="text-xs text-muted-foreground">
        Copy this CSS and paste it in your <code className="bg-muted px-1 py-0.5 rounded">index.css</code> file inside the <code className="bg-muted px-1 py-0.5 rounded">:root</code> selector.
      </p>
    </div>
  );
};

export default GeneratedCSSPreview;

