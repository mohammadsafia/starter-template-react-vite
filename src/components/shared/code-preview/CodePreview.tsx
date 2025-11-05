import { useState } from 'react';

import { Button } from '@components/ui/button';

type CodePreviewProps = {
  code?: string;
  imports?: string;
};

export const CodePreview = ({ code, imports }: CodePreviewProps) => {
  const [copied, setCopied] = useState<string>('');

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1200);
    } catch {
      // ignore copy errors
    }
  };

  if (!code && !imports) return null;

  return (
    <div className="mt-3 space-y-3">
      {imports ? (
        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-medium">
            <span>Imports</span>
            <Button variant="secondary" size="sm" onClick={() => copy(imports, 'imports')}>
              {copied === 'imports' ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <pre className="overflow-auto rounded bg-muted p-3 text-xs">
            <code>{imports}</code>
          </pre>
        </div>
      ) : null}

      {code ? (
        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-medium">
            <span>Usage</span>
            <Button variant="secondary" size="sm" onClick={() => copy(code, 'code')}>
              {copied === 'code' ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <pre className="overflow-auto rounded bg-muted p-3 text-xs">
            <code>{code}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
};

export default CodePreview;


