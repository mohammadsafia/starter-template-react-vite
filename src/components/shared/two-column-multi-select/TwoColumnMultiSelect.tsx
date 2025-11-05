import React, { useState, useMemo, useCallback } from 'react';
import { X, Search, ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '@utils';
import { Badge, ScrollArea, Checkbox, Input, Popover, Button, Avatar } from '@components/ui';
import { Conditional } from '@components/shared';
import { useDebounce } from '@hooks/shared';

/**
 * Base interface for all items with required id field
 */
interface BaseItem {
  id: string;
  [key: string]: any;
}

/**
 * Interface for group items (left column)
 */
interface GroupItem extends BaseItem {
  name: string;
  icon?: React.ReactNode;
}

/**
 * Interface for selectable items (middle column)
 */
interface SelectableItem extends BaseItem {
  groupId: string;
}

/**
 * Main part props with generic type parameters
 */
interface TwoColumnMultiSelectProps<T extends SelectableItem, G extends GroupItem> {
  groups: G[];
  items: T[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (selectedIds: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  labels?: {
    groups?: string;
    items?: string;
    selected?: string;
    search?: string;
    modalTitle?: string;
    selectAll?: string;
    clear?: string;
    confirm?: string;
    noResults?: string;
    itemsCount?: (count: number) => string;
  };

  renderGroupItem?: (group: G, isSelected: boolean) => React.ReactNode;
  renderSelectableItem?: (item: T) => React.ReactNode;
  renderSelectedItem?: (item: T) => React.ReactNode;
  renderTag?: (item: T) => React.ReactNode;

  searchableFields: (keyof T)[];
  searchDebounceMs?: number;

  className?: string;
  disabled?: boolean;
  clearable?: boolean;
  maxHeight?: string | number;
}

/**
 * Default labels configuration
 */
const DEFAULT_LABELS = {
  groups: 'Groups',
  items: 'Items',
  selected: 'Selected',
  search: 'Search',
  selectAll: 'Select all',
  clear: 'Clear',
  confirm: 'Confirm',
  noResults: 'No results found',
  itemsCount: (count: number) => `Selection (${count})`,
};

/**
 * Default avatar component for items
 */
const ItemAvatar: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={cn('size-8', className)}>
      <Avatar.Image alt={`${name} avatar`} />
      <Avatar.Fallback className="text-primary rounded-full border text-sm">{initials}</Avatar.Fallback>
    </Avatar>
  );
};

/**
 * Default icon component for groups
 */
const GroupIcon: React.FC = () => (
  <div className="flex size-8 items-center justify-center rounded bg-gray-100">
    <div className="size-5 rounded-sm bg-gray-400" />
  </div>
);

/**
 * Tag component for selected items
 */
interface TagProps {
  children: React.ReactNode;
  onRemove: (e: React.MouseEvent) => void;
}

const Tag: React.FC<TagProps> = ({ children, onRemove }) => (
  <Badge variant="secondary" className="mb-0 flex items-center gap-1 py-0.5 pr-1.5 pl-2">
    {children}
    <button
      onClick={onRemove}
      className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
      aria-label="Remove"
    >
      <X className="text-muted-foreground hover:text-foreground size-3" />
    </button>
  </Badge>
);

/**
 * Hook for managing component state
 */
function useMultiSelectState<T extends string>(value?: T[], defaultValue?: T[], onChange?: (value: T[]) => void) {
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue || []);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (newValue: T[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}

/**
 * Two-column multi-select component for selecting items grouped by categories
 *
 * @example
 * ```tsx
 * <TwoColumnMultiSelect
 *   groups={departments}
 *   items={users}
 *   value={selectedIds}
 *   onChange={setSelectedIds}
 *   searchableFields={['name', 'email']}
 * />
 * ```
 */
function TwoColumnMultiSelect<T extends SelectableItem, G extends GroupItem>({
  groups,
  items,
  value,
  defaultValue,
  onChange,
  onOpenChange,
  placeholder = 'Select items',
  labels: customLabels,
  renderGroupItem,
  renderSelectableItem,
  renderSelectedItem,
  renderTag,
  searchableFields,
  searchDebounceMs = 300,
  className,
  disabled = false,
  clearable = true,
  maxHeight = 400,
}: TwoColumnMultiSelectProps<T, G>) {
  const labels = { ...DEFAULT_LABELS, ...customLabels };

  const [open, setOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useMultiSelectState(value, defaultValue, onChange);
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedValue);
  const debouncedSearchQuery = useDebounce(searchQuery, searchDebounceMs);

  const getSearchableText = useCallback(
    (item: T): string => {
      return searchableFields
        .map((field) => {
          const value = item[field];
          return typeof value === 'string' ? value : '';
        })
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
    },
    [searchableFields],
  );

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (selectedGroups.length > 0) {
      filtered = filtered.filter((item) => selectedGroups.includes(item.groupId));
    }

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter((item) => getSearchableText(item).includes(query));
    }

    return filtered;
  }, [items, selectedGroups, debouncedSearchQuery, getSearchableText]);

  const selectedItemObjects = useMemo(() => {
    return items.filter((item) => selectedValue.includes(item.id));
  }, [items, selectedValue]);

  const tempSelectedItemObjects = useMemo(() => {
    return items.filter((item) => tempSelectedIds.includes(item.id));
  }, [items, tempSelectedIds]);

  const isAllSelected = useMemo(() => {
    return filteredItems.length > 0 && filteredItems.every((item) => tempSelectedIds.includes(item.id));
  }, [filteredItems, tempSelectedIds]);

  const handleOpen = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);

      if (isOpen) {
        setTempSelectedIds(selectedValue);
        setSelectedGroups([]);
        setSearchQuery('');
      }
    },
    [selectedValue, onOpenChange],
  );

  const handleGroupToggle = useCallback((groupId: string) => {
    setSelectedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]));
  }, []);

  const handleItemToggle = useCallback((itemId: string) => {
    setTempSelectedIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  }, []);

  const handleSelectAll = useCallback(() => {
    const allFilteredIds = filteredItems.map((item) => item.id);

    if (isAllSelected) {
      setTempSelectedIds((prev) => prev.filter((id) => !allFilteredIds.includes(id)));
    } else {
      setTempSelectedIds((prev) => [...new Set([...prev, ...allFilteredIds])]);
    }
  }, [filteredItems, isAllSelected]);

  const handleClear = useCallback(() => {
    setTempSelectedIds([]);
  }, []);

  const handleConfirm = useCallback(() => {
    setSelectedValue(tempSelectedIds);
    handleOpen(false);
  }, [tempSelectedIds, setSelectedValue, handleOpen]);

  const handleCancel = useCallback(() => {
    handleOpen(false);
  }, [handleOpen]);

  const removeItem = useCallback((itemId: string) => {
    setTempSelectedIds((prev) => prev.filter((id) => id !== itemId));
  }, []);

  const removeItemFromField = useCallback(
    (itemId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSelection = selectedValue.filter((id) => id !== itemId);
      setSelectedValue(newSelection);
    },
    [selectedValue, setSelectedValue],
  );

  const defaultRenderGroupItem = useCallback(
    (group: G) => (
      <>
        {group.icon || <GroupIcon />}
        <span className="text-sm">{group.name}</span>
      </>
    ),
    [],
  );

  const defaultRenderSelectableItem = useCallback((item: T) => {
    const displayName = item.name || item.label || item.title || 'Item';
    const displaySecondary = item.email || item.description || item.subtitle || '';
    return (
      <>
        <ItemAvatar name={displayName} />
        <div className="min-w-0 flex-1">
          <div className="max-w-[150px] truncate text-sm font-medium">{displayName}</div>
          {displaySecondary && <div className="truncate text-xs text-gray-500">{displaySecondary}</div>}
        </div>
      </>
    );
  }, []);

  const defaultRenderTag = useCallback((item: T) => {
    const displayName = item.name || item.label || item.title || 'Item';
    return <span className="text-xs">{displayName}</span>;
  }, []);

  return (
    <div className={cn('mt-4 w-full', className)}>
      <Popover open={open} onOpenChange={handleOpen}>
        <Popover.Trigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={placeholder}
            disabled={disabled}
            className="h-auto min-h-[40px] w-full justify-between px-3 py-2 text-left font-normal"
          >
            <div className="flex flex-1 flex-wrap gap-1">
              <Conditional>
                <Conditional.If condition={selectedItemObjects.length > 0}>
                  <>
                    {selectedItemObjects.slice(0, 3).map((item) => (
                      <Tag key={item.id} onRemove={(e) => removeItemFromField(item.id, e)}>
                        {renderTag ? renderTag(item) : defaultRenderTag(item)}
                      </Tag>
                    ))}

                    {selectedItemObjects.length > 3 && (
                      <span className="text-muted-foreground bg-muted rounded px-2 py-1 text-sm">
                        +{selectedItemObjects.length - 3} more
                      </span>
                    )}
                  </>
                </Conditional.If>
                <Conditional.Else>
                  <span className="text-muted-foreground">{placeholder}</span>
                </Conditional.Else>
              </Conditional>
            </div>
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </Popover.Trigger>

        <Popover.Content className="w-[var(--radix-popover-trigger-width)] max-w-[900px] min-w-[600px] p-0" align="start">
          <div className="flex flex-col">
            <Conditional.If condition={!!labels.modalTitle}>
              <header className="border-accent flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-semibold">{labels.modalTitle}</h3>
                <Button variant="ghost" size="icon" onClick={handleCancel} className="size-8" aria-label="Close">
                  <X className="size-4" />
                </Button>
              </header>
            </Conditional.If>
            <div className="border-accent border-b p-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={labels.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label={labels.search}
                  type="search"
                />
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <section className="border-accent w-1/3 border-r">
                <h4 className="p-4 text-sm font-semibold">{labels.groups}</h4>
                <ScrollArea
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ height: maxHeight }}
                >
                  <div className="space-y-1 p-4 pt-0">
                    {groups.map((group) => (
                      <label key={group.id} className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded p-2">
                        <Checkbox
                          checked={selectedGroups.includes(group.id)}
                          onCheckedChange={() => handleGroupToggle(group.id)}
                          aria-label={`Select ${group.name}`}
                        />
                        <Conditional>
                          <Conditional.If condition={!!renderGroupItem}>
                            {renderGroupItem?.(group, selectedGroups.includes(group.id))}
                          </Conditional.If>
                          <Conditional.Else>{defaultRenderGroupItem(group)}</Conditional.Else>
                        </Conditional>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </section>

              <section className="border-accent w-1/3 border-r">
                <div className="flex items-center justify-between p-4">
                  <h4 className="text-sm font-semibold">{labels.items}</h4>
                  <Conditional.If condition={filteredItems.length > 0}>
                    <label className="flex cursor-pointer items-center">
                      <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label={labels.selectAll} />
                      <span className="ml-2 text-sm font-normal">{labels.selectAll}</span>
                    </label>
                  </Conditional.If>
                </div>
                <ScrollArea
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ height: maxHeight }}
                >
                  <div className="space-y-1 p-4 pt-0">
                    <Conditional>
                      <Conditional.If condition={filteredItems.length === 0}>
                        <p className="text-muted-foreground py-8 text-center text-sm">{labels.noResults}</p>
                      </Conditional.If>
                      <Conditional.Else>
                        {filteredItems.map((item) => (
                          <label key={item.id} className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded p-2">
                            <Checkbox
                              checked={tempSelectedIds.includes(item.id)}
                              onCheckedChange={() => handleItemToggle(item.id)}
                              aria-label={`Select ${item.name || item.label || item.title || 'item'}`}
                            />
                            <Conditional>
                              <Conditional.If condition={!!renderSelectableItem}>{renderSelectableItem?.(item)}</Conditional.If>
                              <Conditional.Else>{defaultRenderSelectableItem?.(item)}</Conditional.Else>
                            </Conditional>
                          </label>
                        ))}
                      </Conditional.Else>
                    </Conditional>
                  </div>
                </ScrollArea>
              </section>

              <section className="w-1/3">
                <h4 className="p-4 text-sm font-semibold">{labels.selected}</h4>
                <ScrollArea
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ height: maxHeight }}
                >
                  <div className="space-y-1 p-4 pt-0">
                    <Conditional>
                      <Conditional.If condition={tempSelectedItemObjects.length === 0}>
                        <p className="text-muted-foreground py-8 text-center text-sm">No items selected</p>
                      </Conditional.If>
                      <Conditional.Else>
                        {tempSelectedItemObjects.map((item) => (
                          <div key={item.id} className="group hover:bg-accent flex items-center justify-between rounded p-2">
                            <div className="flex min-w-0 flex-1 items-center space-x-3">
                              <Conditional>
                                <Conditional.If condition={!!renderSelectedItem}>{renderSelectedItem?.(item)}</Conditional.If>
                                <Conditional.Else>
                                  <Conditional>
                                    <Conditional.If condition={!!renderSelectableItem}>{renderSelectableItem?.(item)}</Conditional.If>
                                    <Conditional.Else>{defaultRenderSelectableItem(item)}</Conditional.Else>
                                  </Conditional>
                                </Conditional.Else>
                              </Conditional>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name || item.label || item.title || 'item'}`}
                            >
                              <Trash2 className="text-muted-foreground size-4" />
                            </Button>
                          </div>
                        ))}
                      </Conditional.Else>
                    </Conditional>
                  </div>
                </ScrollArea>
              </section>
            </div>

            <footer className="border-accent flex items-center justify-between border-t p-4">
              <span className="text-muted-foreground text-sm">{labels.itemsCount(tempSelectedIds.length)}</span>
              <div className="flex gap-2">
                <Conditional.If condition={!!clearable}>
                  <Button variant="outline" onClick={handleClear}>
                    {labels.clear}
                  </Button>
                </Conditional.If>
                <Button onClick={handleConfirm}>{labels.confirm}</Button>
              </div>
            </footer>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default TwoColumnMultiSelect;

export type { TwoColumnMultiSelectProps, GroupItem, SelectableItem };
