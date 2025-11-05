import { CodePreview } from '@components/shared/code-preview/CodePreview';
import type { ComponentDoc } from './components.data';
import { Card } from '@components/ui';

type DocCardProps = { doc: ComponentDoc };

const DocCard = ({ doc }: DocCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Card.Header className="border-b bg-muted/20 pb-4">
        <Card.Title className="text-xl font-semibold">{doc.title}</Card.Title>
        {doc.description ? (
          <Card.Description className="text-sm mt-1.5 text-muted-foreground">
            {doc.description}
          </Card.Description>
        ) : null}
      </Card.Header>
      <Card.Content className="pt-8 pb-6 flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-center p-8 border border-dashed border-accent rounded-xl bg-muted/30 min-h-[140px]">
          {doc.demo}
        </div>
        <CodePreview imports={doc.imports} code={doc.code} />
      </Card.Content>
    </Card>
  );
};

export default DocCard;
