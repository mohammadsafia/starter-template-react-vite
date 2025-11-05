import * as React from 'react';
import { LexicalComposer, InitialConfigType } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, $getRoot, EditorState, $createParagraphNode, $createTextNode } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ParagraphNode, TextNode } from 'lexical';
import { Card } from '@components/ui';
import { Conditional } from '@components/shared';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

type RichTextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  BottomActionsComponent?: React.ComponentType;
};

type ToolbarButtonProps = {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, title, children }) => (
  <button type="button" title={title} onClick={onClick} className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1 select-none">
    {children}
  </button>
);

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="top-10 z-10 flex gap-2 rounded-xl rounded-br-none rounded-bl-none border-b border-gray-300 p-2">
      <ToolbarButton title="Bold" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton title="Italic" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton title="Underline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}>
        <u>U</u>
      </ToolbarButton>
      <ToolbarButton title="Strike" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}>
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton title="Undo" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        ↺
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        ↻
      </ToolbarButton>
    </div>
  );
}

function ValueUpdatePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();
  const [hasInitialized, setHasInitialized] = React.useState(false);

  React.useEffect(() => {
    if (editor && value !== undefined) {
      editor.update(() => {
        const root = $getRoot();

        const currentContent = root.getTextContent();
        if (currentContent !== value) {
          root.clear();

          if (value.trim()) {
            const lines = value.split('\n');
            lines.forEach((line) => {
              const paragraph = $createParagraphNode();
              const textNode = $createTextNode(line);
              paragraph.append(textNode);
              root.append(paragraph);
            });
          } else {
            const paragraph = $createParagraphNode();
            root.append(paragraph);
          }
        }

        setHasInitialized(true);
      });
    }
  }, [editor, value, hasInitialized]);

  return null;
}

export function RichTextInput({ value, onChange, placeholder = '', BottomActionsComponent }: RichTextInputProps) {
  const initialConfig: InitialConfigType = {
    namespace: 'RichTextEditor',
    onError: (error) => console.error(error),
    nodes: [HeadingNode, QuoteNode, ParagraphNode, TextNode],
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const textContent = $getRoot().getTextContent();
      if (onChange) onChange(textContent);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Card className="border-accent rounded-xl border-1">
        <Toolbar />
        <div className="relative min-h-[200px] p-4">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-[150px] p-4 outline-none" data-testid="editor" />}
            placeholder={<p className="pointer-events-none absolute top-3 left-4 text-gray-400 italic">{placeholder}</p>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <ValueUpdatePlugin value={value} />
        </div>

        <Conditional.If condition={!!BottomActionsComponent}>
          {(() => {
            const Component = BottomActionsComponent!;
            return <Component />;
          })()}
        </Conditional.If>

        <HistoryPlugin />
      </Card>
    </LexicalComposer>
  );
}
