import { Card, Badge, Tabs } from '@components/ui';
import { CodePreview } from '@components/shared/code-preview/CodePreview';
import type { HookUtilDoc } from './hooks-utils.data';
import { Check } from 'lucide-react';

type HookUtilCardProps = { doc: HookUtilDoc };

const HookUtilCard = ({ doc }: HookUtilCardProps) => {
  return (
    <Card className="overflow-hidden h-fit flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Card.Header className="border-b bg-muted/20 pb-4">
        <div className="flex items-center justify-between mb-2">
          <Card.Title className="text-xl font-semibold">{doc.title}</Card.Title>
          <Badge variant={doc.category === 'hook' ? 'default' : 'secondary'}>
            {doc.category === 'hook' ? '🪝 Hook' : '🔧 Utility'}
          </Badge>
        </div>
        <Card.Description className="text-sm mt-1.5 text-muted-foreground">
          {doc.description}
        </Card.Description>
      </Card.Header>

      <Card.Content className="pt-6 pb-6 flex-1 flex flex-col gap-6">
        {/* Benefits Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">✨ Benefits</h4>
          <ul className="space-y-1">
            {doc.benefits.map((benefit, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Usage Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">📖 Usage</h4>
          {doc.usage}
        </div>

        {/* Parameters & Returns */}
        {(doc.parameters || doc.returns) && (
          <Tabs defaultValue={doc.parameters ? 'parameters' : 'returns'} className="w-full">
            <Tabs.List>
              {doc.parameters && (
                <Tabs.Trigger value="parameters">Parameters</Tabs.Trigger>
              )}
              {doc.returns && (
                <Tabs.Trigger value="returns">Returns</Tabs.Trigger>
              )}
            </Tabs.List>

            {doc.parameters && (
              <Tabs.Content value="parameters" className="mt-4">
                <div className="space-y-3">
                  {doc.parameters.map((param, idx) => (
                    <div key={idx} className="border rounded-md p-3 bg-muted/20">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-mono text-primary">{param.name}</code>
                        <code className="text-xs font-mono text-muted-foreground">{param.type}</code>
                      </div>
                      <p className="text-xs text-muted-foreground">{param.description}</p>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            )}

            {doc.returns && (
              <Tabs.Content value="returns" className="mt-4">
                <div className="space-y-3">
                  {doc.returns.map((ret, idx) => (
                    <div key={idx} className="border rounded-md p-3 bg-muted/20">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-mono text-primary">{ret.name}</code>
                        <code className="text-xs font-mono text-muted-foreground">{ret.type}</code>
                      </div>
                      <p className="text-xs text-muted-foreground">{ret.description}</p>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            )}
          </Tabs>
        )}

        {/* Examples Section */}
        {doc.examples && doc.examples.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">💡 Examples</h4>
            <Tabs defaultValue="0" className="w-full">
              <Tabs.List>
                {doc.examples.map((example, idx) => (
                  <Tabs.Trigger key={idx} value={idx.toString()}>
                    {example.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {doc.examples.map((example, idx) => (
                <Tabs.Content key={idx} value={idx.toString()} className="mt-4">
                  <CodePreview
                    code={example.code}
                    imports=""
                  />
                </Tabs.Content>
              ))}
            </Tabs>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default HookUtilCard;

