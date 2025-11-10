import { useState } from 'react';

import { Button, Collapsible } from '@components/ui';
import { ChevronDown } from 'lucide-react';

type CodePreviewProps = {
  code?: string;
  imports?: string;
};

export const CodePreview = ({ code, imports }: CodePreviewProps) => {
  const [copied, setCopied] = useState<string>('');
  const [importsOpen, setImportsOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

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
        <Collapsible open={importsOpen} onOpenChange={setImportsOpen}>
          <div className="flex items-center justify-between">
            <Collapsible.Trigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1 text-xs font-medium">
                <ChevronDown
                  className={`mr-1 h-3 w-3 transition-transform duration-200 ${importsOpen ? 'rotate-180' : ''}`}
                />
                Imports
              </Button>
            </Collapsible.Trigger>
            <Button variant="secondary" size="sm" onClick={() => copy(imports, 'imports')}>
              {copied === 'imports' ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <Collapsible.Content className="mt-2">
            <pre className="overflow-auto rounded bg-muted p-3 text-xs">
              <code>{imports}</code>
            </pre>
          </Collapsible.Content>
        </Collapsible>
      ) : null}

      {code ? (
        <Collapsible open={codeOpen} onOpenChange={setCodeOpen}>
          <div className="flex items-center justify-between">
            <Collapsible.Trigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1 text-xs font-medium">
                <ChevronDown
                  className={`mr-1 h-3 w-3 transition-transform duration-200 ${codeOpen ? 'rotate-180' : ''}`}
                />
                Usage
              </Button>
            </Collapsible.Trigger>
            <Button variant="secondary" size="sm" onClick={() => copy(code, 'code')}>
              {copied === 'code' ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <Collapsible.Content className="mt-2">
            <pre className="overflow-auto rounded bg-muted p-3 text-xs">
              <code>{code}</code>
            </pre>
          </Collapsible.Content>
        </Collapsible>
      ) : null}
    </div>
  );
};

export default CodePreview;


