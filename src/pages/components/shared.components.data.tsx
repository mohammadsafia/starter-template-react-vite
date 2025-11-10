import { Home, Settings, Plus, CheckCircle } from 'lucide-react';
import { Input } from '@components/ui';
import {
  ActionPanel,
  Breadcrumb,
  Conditional,
  ErrorTooltip,
  FormSubmitButton,
  FormSubmitButtons,
  LinkButton,
  Loader,
  MetaCard,
  PrimeCard,
  ThemeSwitcher,
} from '@components/shared';
import type { ComponentDoc } from './components.data.types';
import {
  ConfirmDialogDemo,
  DateNavigationDemo,
  FacetedFilterDemo,
  StepperDemo,
  PrimeDialogDemo,
  PrimeSheetDemo,
  TwoColumnMultiSelectDemo,
} from './components.data.demos';

export const sharedDocs: ComponentDoc[] = [
  {
    id: 'action-panel',
    title: 'ActionPanel',
    description: 'Container for page actions with header and action buttons.',
    demo: (
      <ActionPanel>
        <ActionPanel.Header>
          <Home size={20} />
          Dashboard
        </ActionPanel.Header>
        <ActionPanel.Actions>
          <ActionPanel.Action icon={<Plus size={16} />} title="Add New">
            Add
          </ActionPanel.Action>
          <ActionPanel.Action icon={<Settings size={16} />} title="Settings" variant="secondary">
            Settings
          </ActionPanel.Action>
        </ActionPanel.Actions>
      </ActionPanel>
    ),
    imports: "import { ActionPanel } from '@components/shared';",
    code: `<ActionPanel>
  <ActionPanel.Header>Page Title</ActionPanel.Header>
  <ActionPanel.Actions>
    <ActionPanel.Action icon={<Icon />} title="Action">
      Action
    </ActionPanel.Action>
  </ActionPanel.Actions>
</ActionPanel>`,
    tags: ['shared', 'action-panel', 'header', 'actions'],
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Navigation breadcrumb trail.',
    demo: <Breadcrumb links={[{ title: 'Dashboard', href: '/' }, { title: 'Settings', href: '/settings' }, { title: 'Profile' }]} />,
    imports: "import { Breadcrumb } from '@components/shared';",
    code: "<Breadcrumb links={[{ title: 'Home', href: '/' }, { title: 'Page' }]} />",
    tags: ['shared', 'breadcrumb', 'navigation'],
  },
  {
    id: 'conditional',
    title: 'Conditional',
    description: 'Declarative conditional rendering helper.',
    demo: (
      <div className="space-y-2">
        <Conditional>
          <Conditional.If condition={true}>
            <div className="text-green-600">✓ Condition is true</div>
          </Conditional.If>
          <Conditional.Else>
            <div className="text-red-600">✗ Condition is false</div>
          </Conditional.Else>
        </Conditional>
        <Conditional>
          <Conditional.If condition={false}>
            <div className="text-green-600">✓ This won't show</div>
          </Conditional.If>
          <Conditional.Else>
            <div className="text-muted-foreground">→ Fallback content</div>
          </Conditional.Else>
        </Conditional>
      </div>
    ),
    imports: "import { Conditional } from '@components/shared';",
    code: '<Conditional>\n  <Conditional.If condition={true}>Content</Conditional.If>\n  <Conditional.Else>Fallback</Conditional.Else>\n</Conditional>',
    tags: ['shared', 'conditional', 'utility'],
  },
  {
    id: 'confirm-dialog',
    title: 'ConfirmDialog',
    description: 'Confirmation dialog with async action support and optional reason input.',
    demo: <ConfirmDialogDemo />,
    imports: "import { ConfirmDialog } from '@components/shared';",
    code: `<ConfirmDialog
  title="Confirm Action"
  description="Are you sure?"
  open={open}
  onOpenChange={setOpen}
  onConfirm={() => console.log('Confirmed')}
>
  <Button variant="destructive">Delete</Button>
</ConfirmDialog>`,
    tags: ['shared', 'confirm-dialog', 'dialog', 'modal'],
  },
  {
    id: 'date-navigation',
    title: 'DateNavigation',
    description: 'Navigation controls for dates with prev/next/today buttons.',
    demo: <DateNavigationDemo />,
    imports: "import { DateNavigation } from '@components/shared';",
    code: `<DateNavigation
  date={currentDate}
  onSetDate={setCurrentDate}
  handlePrevious={handlePrevious}
  handleNext={handleNext}
/>`,
    tags: ['shared', 'date-navigation', 'date', 'navigation'],
  },
  {
    id: 'error-tooltip',
    title: 'ErrorTooltip',
    description: 'Tooltip displaying error messages with icon indicator.',
    demo: (
      <div className="relative flex h-16 w-64 items-center justify-center rounded-md border">
        <Input placeholder="Field with error" className="pl-8" />
        <ErrorTooltip message="This field is required" />
      </div>
    ),
    imports: "import { ErrorTooltip } from '@components/shared';",
    code: '<ErrorTooltip message="Error message" />',
    tags: ['shared', 'error-tooltip', 'error', 'validation'],
  },
  {
    id: 'faceted-filter',
    title: 'FacetedFilter',
    description: 'Filter component with multiple variants: text, select, multi-select, date-range.',
    demo: <FacetedFilterDemo />,
    imports: "import { FacetedFilter } from '@components/shared';",
    code: `<FacetedFilter
  name="status"
  title="Status"
  control={form.control}
  filterVariant="multi-select"
  filterOptions={[
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]}
/>`,
    tags: ['shared', 'faceted-filter', 'filter', 'form'],
  },
  {
    id: 'form-submit-button',
    title: 'FormSubmitButton',
    description: 'Submit button for forms with loading state.',
    demo: (
      <div className="flex gap-2">
        <FormSubmitButton textContent="Save" />
        <FormSubmitButton textContent="Submit" variant="secondary" size="sm" />
      </div>
    ),
    imports: "import { FormSubmitButton } from '@components/shared';",
    code: '<FormSubmitButton textContent="Save" variant="default" size="lg" />',
    tags: ['shared', 'form-submit-button', 'form', 'button'],
  },
  {
    id: 'form-submit-buttons',
    title: 'FormSubmitButtons',
    description: 'Sticky footer with Cancel and Submit buttons for forms.',
    demo: (
      <div className="relative h-32 rounded-md border">
        <FormSubmitButtons defaultPrimaryText="Save Changes" />
      </div>
    ),
    imports: "import { FormSubmitButtons } from '@components/shared';",
    code: `<FormSubmitButtons
  defaultPrimaryText="Save"
  defaultPrimaryLoading={false}
  align="end"
/>`,
    tags: ['shared', 'form-submit-buttons', 'form', 'buttons'],
  },
  {
    id: 'link-button',
    title: 'LinkButton',
    description: 'Button that navigates using React Router.',
    demo: (
      <div className="flex gap-2">
        <LinkButton to="/" textContent="Go Home" variant="default" withContainer={false} />
        <LinkButton to="/components" textContent="Components" variant="secondary" withContainer={false} />
      </div>
    ),
    imports: "import { LinkButton } from '@components/shared';",
    code: '<LinkButton to="/path" textContent="Label" variant="default" withContainer={false} />',
    tags: ['shared', 'link', 'button', 'navigation'],
  },
  {
    id: 'loader',
    title: 'Loader',
    description: 'Full-screen or inline loading spinner with optional logo and overlay.',
    demo: (
      <div className="relative h-40 rounded border">
        <Loader withOverlay={false} />
      </div>
    ),
    imports: "import { Loader } from '@components/shared';",
    code: '<Loader displayLogo={false} withOverlay={true} />',
    tags: ['shared', 'loader', 'loading'],
  },
  {
    id: 'meta-card',
    title: 'MetaCard',
    description: 'Card for displaying metadata with optional image, loading state, and flexible content.',
    demo: (
      <div className="space-y-4">
        <MetaCard title="User Name" subtitle="Role" description="john.doe@example.com" />
        <MetaCard title="Status" subtitle="Active" imageURL="https://via.placeholder.com/100" />
        <MetaCard title="Loading" isLoading />
      </div>
    ),
    imports: "import { MetaCard } from '@components/shared';",
    code: `<MetaCard
  title="Title"
  subtitle="Subtitle"
  description="Description"
  imageURL="url"
  isLoading={false}
/>`,
    tags: ['shared', 'meta-card', 'card', 'metadata'],
  },
  {
    id: 'prime-card',
    title: 'PrimeCard',
    description: 'Enhanced card with multiple variants and automatic header styling.',
    demo: (
      <div className="space-y-4">
        <PrimeCard title="Default Card" icon={<Home size={20} />} variant="default">
          Card content goes here
        </PrimeCard>
        <PrimeCard title="Success Card" icon={<CheckCircle size={20} />} variant="success">
          Operation completed successfully
        </PrimeCard>
        <PrimeCard title="Elevated Card" variant="elevated">
          With shadow elevation
        </PrimeCard>
      </div>
    ),
    imports: "import { PrimeCard } from '@components/shared';",
    code: `<PrimeCard
  title="Card Title"
  icon={<Icon />}
  variant="default | primary | success | danger | warning | info | elevated | glass"
>
  Content
</PrimeCard>`,
    tags: ['shared', 'prime-card', 'card', 'variants'],
  },
  {
    id: 'prime-dialog',
    title: 'PrimeDialog',
    description: 'Enhanced dialog with automatic mode labels (Create/Update/View) and styled header.',
    demo: <PrimeDialogDemo />,
    imports: "import { PrimeDialog } from '@components/shared';",
    code: `<PrimeDialog dialogMode="Create">
  <PrimeDialog.Trigger asChild>
    <Button>Open</Button>
  </PrimeDialog.Trigger>
  <PrimeDialog.Container>
    <PrimeDialog.Header>
      <PrimeDialog.Title>User</PrimeDialog.Title>
    </PrimeDialog.Header>
    <PrimeDialog.Content>Content</PrimeDialog.Content>
    <PrimeDialog.Actions />
  </PrimeDialog.Container>
</PrimeDialog>`,
    tags: ['shared', 'prime-dialog', 'dialog', 'modal'],
  },
  {
    id: 'prime-sheet',
    title: 'PrimeSheet',
    description: 'Enhanced sheet with automatic mode labels (Create/Update/View) and styled header.',
    demo: <PrimeSheetDemo />,
    imports: "import { PrimeSheet } from '@components/shared';",
    code: `<PrimeSheet sheetMode="Create">
  <PrimeSheet.Trigger asChild>
    <Button>Open</Button>
  </PrimeSheet.Trigger>
  <PrimeSheet.Container>
    <PrimeSheet.Header>
      <PrimeSheet.Title>User</PrimeSheet.Title>
    </PrimeSheet.Header>
    <PrimeSheet.Content>Content</PrimeSheet.Content>
    <PrimeSheet.Actions />
  </PrimeSheet.Container>
</PrimeSheet>`,
    tags: ['shared', 'prime-sheet', 'sheet', 'sidebar'],
  },
  {
    id: 'stepper',
    title: 'Stepper',
    description: 'Multi-step wizard with navigation, progress indicator, and mobile-responsive layout.',
    demo: <StepperDemo />,
    imports: "import { Stepper } from '@components/shared';",
    code: `const [currentStep, setCurrentStep] = useState(0);
const steps = [
  { title: 'Step 1', step: <div>Content 1</div> },
  { title: 'Step 2', step: <div>Content 2</div> },
];

<Stepper
  steps={steps}
  currentStep={currentStep}
  handleNextStepChange={() => setCurrentStep(currentStep + 1)}
  handleBackStepChange={() => setCurrentStep(currentStep - 1)}
  isLoading={false}
/>`,
    tags: ['shared', 'stepper', 'wizard', 'multi-step'],
  },
  {
    id: 'theme-switcher',
    title: 'ThemeSwitcher',
    description: 'Theme toggle button with Light/Dark/System modes.',
    demo: <ThemeSwitcher />,
    imports: "import { ThemeSwitcher } from '@components/shared';",
    code: '<ThemeSwitcher />',
    tags: ['shared', 'theme-switcher', 'theme', 'dark-mode'],
  },
  {
    id: 'two-column-multi-select',
    title: 'TwoColumnMultiSelect',
    description: 'Advanced multi-select with groups, searchable items, and three-column layout (Groups | Items | Selected).',
    demo: <TwoColumnMultiSelectDemo />,
    imports: "import { TwoColumnMultiSelect } from '@components/shared';",
    code: `const groups = [{ id: '1', name: 'Group 1' }];
const items = [{ id: 'i1', name: 'Item 1', groupId: '1' }];

<TwoColumnMultiSelect
  groups={groups}
  items={items}
  value={selected}
  onChange={setSelected}
  searchableFields={['name']}
/>`,
    tags: ['shared', 'two-column-multi-select', 'select', 'multi-select'],
  },
];
