import { useMemo, useState } from 'react';

import { uiDocs, formDocs, tableDocs, sharedDocs, type ComponentDoc } from './components.data';
import { hooksUtilsDocs, type HookUtilDoc } from './hooks-utils.data';
import DocCard from './DocCard';
import HookUtilCard from './HookUtilCard';
import { Tabs, Input } from '@components/ui';
import { Search } from 'lucide-react';
import { ThemeProvider } from '@contexts';
import { Toaster, ThemeCustomizer } from '@components/shared';

const ComponentsGalleryPage = () => {
  const [query, setQuery] = useState('');  const filter = (docs: ComponentDoc[]) =>
    docs.filter((d) => {
      const hay = `${d.title} ${(d.tags || []).join(' ')}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });

  const filterHooksUtils = (docs: HookUtilDoc[]) =>
    docs.filter((d) => {
      const hay = `${d.title} ${d.description} ${d.category}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });

  const filtered = useMemo(
    () => ({
      ui: filter(uiDocs),
      forms: filter(formDocs),
      tables: filter(tableDocs),
      shared: filter(sharedDocs),
      hooksUtils: filterHooksUtils(hooksUtilsDocs),
    }),
    [query],
  );

  const totalResults = filtered.ui.length + filtered.forms.length + filtered.tables.length + filtered.shared.length + filtered.hooksUtils.length;

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="mb-3 text-4xl font-bold">Components Gallery</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Browse and explore all available components with live demos and usage examples.
            </p>

            <div className="flex items-center gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  aria-label="Search components"
                  placeholder="Search components..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {query && (
                <p className="text-muted-foreground text-sm whitespace-nowrap">
                  {totalResults} result{totalResults !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </header>

          <Tabs defaultValue="ui" className="w-full">
            <Tabs.List className="mb-8 w-full justify-start">
              <Tabs.Trigger value="ui" className="text-sm md:text-base">
                UI Components ({filtered.ui.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="forms" className="text-sm md:text-base"  >
                Forms ({filtered.forms.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="tables" className="text-sm md:text-base">
                Tables ({filtered.tables.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="shared" className="text-sm md:text-base">
                Shared ({filtered.shared.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="hooks-utils" className="text-sm md:text-base">
                Hooks & Utils ({filtered.hooksUtils.length})
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="ui" className="mt-0">
              {filtered.ui.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">No UI components found matching "{query}"</div>
              ) : (
                <div className="columns-1 gap-8 lg:columns-2 xl:columns-3">
                  {filtered.ui.map((doc) => (
                    <div key={doc.id} className="break-inside-avoid mb-8">
                      <DocCard doc={doc} />
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="forms" className="mt-0">
              {filtered.forms.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">No form components found matching "{query}"</div>
              ) : (
                <div className="columns-1 gap-8 lg:columns-2">
                  {filtered.forms.map((doc) => (
                    <div key={doc.id} className="break-inside-avoid mb-8">
                      <DocCard doc={doc} />
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="tables" className="mt-0">
              {filtered.tables.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">No table components found matching "{query}"</div>
              ) : (
                <div className="columns-1 gap-8">
                  {filtered.tables.map((doc) => (
                    <div key={doc.id} className="break-inside-avoid mb-8">
                      <DocCard doc={doc} />
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="shared" className="mt-0">
              {filtered.shared.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">No shared components found matching "{query}"</div>
              ) : (
                <div className="columns-1 gap-8 lg:columns-2 xl:columns-3">
                  {filtered.shared.map((doc) => (
                    <div key={doc.id} className="break-inside-avoid mb-8">
                      <DocCard doc={doc} />
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="hooks-utils" className="mt-0">
              {filtered.hooksUtils.length === 0 ? (
                <div className="text-muted-foreground py-16 text-center">No hooks or utilities found matching "{query}"</div>
              ) : (
                <div className="columns-1 gap-8 xl:columns-2">
                  {filtered.hooksUtils.map((doc) => (
                    <div key={doc.id} className="break-inside-avoid mb-8">
                      <HookUtilCard doc={doc} />
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Content>
          </Tabs>
        </div>

        {/* Theme Customizer Sidebar */}
        <ThemeCustomizer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default ComponentsGalleryPage;

