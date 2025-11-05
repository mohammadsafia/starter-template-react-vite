import type { ReactNode } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type ColumnDef } from '@tanstack/react-table';
import { InfoIcon, User, Home, Settings, Plus, CheckCircle } from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  Tabs,
  Tooltip,
  Switch,
  Checkbox,
  Input,
  Select,
  LoadingButton,
  DropdownMenu,
  Command,
  Collapsible,
  Divider,
  Table,
  ToggleGroup,
  TooltipButton,
  ScrollArea,
} from '@components/ui';
import { Accordion } from '@components/ui/accordion';
import { Alert } from '@components/ui/alert';
import { Avatar } from '@components/ui/avatar';
import { Dialog } from '@components/ui/dialog';
import { Sheet } from '@components/ui/sheet';
import { Skeleton } from '@components/ui/skeleton';
import { Progress } from '@components/ui/progress';
import { Popover } from '@components/ui/popover';
import { Label } from '@components/ui/label';
import { Slider } from '@components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group/RadioGroup';
import {
  FormContainer,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormDatePicker,
  FormDateRange,
  FormNumber,
  FormTextarea,
  FormCombobox,
  FormMultiCombobox,
  FormUploadFile,
} from '@components/forms';
import { DataTable, DataTableToolbar } from '@components/tables';
import { useDataTable } from '@hooks/utils/useDataTable.ts';
import { useToast } from '@hooks/shared';
import { mockUsers } from '@lib/mock/users';
import {
  Breadcrumb,
  Loader,
  Conditional,
  LinkButton,
  ActionPanel,
  ConfirmDialog,
  DateNavigation,
  ErrorTooltip,
  FacetedFilter,
  FormSubmitButton,
  FormSubmitButtons,
  MetaCard,
  PrimeCard,
  PrimeDialog,
  PrimeSheet,
  Stepper,
  ThemeSwitcher,
  TwoColumnMultiSelect,
} from '@components/shared';
import { z } from 'zod';

export type ComponentDoc = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  demo?: ReactNode;
  code?: string;
  imports?: string;
  props?: Array<{ name: string; type?: string; required?: boolean; description?: string }>;
};

// ---------- Demo components (hooks must be used inside components) ----------
function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>This is a dialog description.</Dialog.Description>
        </Dialog.Header>
        <div>Dialog content goes here.</div>
      </Dialog.Content>
    </Dialog>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Sheet.Trigger asChild>
        <Button variant="secondary">Open Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Sheet Title</Sheet.Title>
          <Sheet.Description>This is a sheet description.</Sheet.Description>
        </Sheet.Header>
        <div>Sheet content goes here.</div>
      </Sheet.Content>
    </Sheet>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary">Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-muted-foreground text-sm">Popover content here.</p>
        </div>
      </Popover.Content>
    </Popover>
  );
}

function FormBasicDemo() {
  const form = useForm<{ email: string; fruit: string }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96 space-y-3">
      <FormInput name="email" label="Email" placeholder="you@example.com" required />
      <FormSelect
        name="fruit"
        label="Fruit"
        control={form.control}
        options={[
          { id: 'apple', name: 'Apple' },
          { id: 'orange', name: 'Orange' },
          { id: 'banana', name: 'Banana' },
        ]}
        getOptionLabel={(o) => (o as any).name}
        getOptionValue={(o) => (o as any).id}
        placeholder="Pick a fruit"
        required
      />
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
}

function FormCheckboxDemo() {
  const form = useForm<{ agree: boolean }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormCheckbox name="agree" control={form.control} label="I agree to the terms" />
    </FormContainer>
  );
}

function FormDatePickerDemo() {
  const form = useForm<{ date?: Date }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormDatePicker name="date" control={form.control} label="Date" />
    </FormContainer>
  );
}

function FormDateRangeDemo() {
  const form = useForm<{ range: any }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormDateRange name="range" control={form.control} label="Range" />
    </FormContainer>
  );
}

function FormNumberTextareaDemo() {
  const form = useForm<{ qty: number; notes: string }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96 space-y-3">
      <FormNumber name="qty" control={form.control} label="Quantity" />
      <FormTextarea name="notes" label="Notes" />
    </FormContainer>
  );
}

function DataTableBasicDemo() {
  const data = mockUsers;
  const columns: ColumnDef<(typeof data)[number]>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Status', accessorKey: 'status' },
  ];

  const pageSize = data.length; // show all for the demo
  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    state: { pagination: { pageIndex: 0, pageSize } },
  });

  return <DataTable table={table} />;
}

function DataTableWithFiltersDemo() {
  const data = mockUsers;
  const columns: ColumnDef<(typeof data)[number]>[] = [
    { header: 'Name', accessorKey: 'name', enableColumnFilter: true },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role', enableColumnFilter: true },
    { header: 'Status', accessorKey: 'status', enableColumnFilter: true },
  ];

  const pageSize = 10;
  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    initialState: { pagination: { pageIndex: 0, pageSize } },
    state: { pagination: { pageIndex: 0, pageSize } },
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}

function FormWithValidationDemo() {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    age: z.number().min(18, 'Must be at least 18 years old'),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    defaultValues: { email: '', password: '', age: 18 },
  });

  return (
    <FormContainer formContext={form} onSuccess={(data) => console.log(data)} className="w-96 space-y-3">
      <FormInput name="email" label="Email" placeholder="you@example.com" required />
      <FormInput name="password" label="Password" type="password" placeholder="********" required />
      <FormNumber name="age" control={form.control} label="Age" />
      <Button type="submit">Submit</Button>
      <p className="text-muted-foreground text-xs">Try submitting with invalid data to see validation</p>
    </FormContainer>
  );
}

function FormComboboxDemo() {
  const form = useForm<{ country: string }>();
  const countries = [
    { id: 'us', name: 'United States' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'ca', name: 'Canada' },
    { id: 'au', name: 'Australia' },
    { id: 'de', name: 'Germany' },
  ];

  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96">
      <FormCombobox
        name="country"
        control={form.control}
        label="Country"
        options={countries}
        getOptionLabel={(o) => (o as any).name}
        getOptionValue={(o) => (o as any).id}
        placeholder="Search country..."
      />
    </FormContainer>
  );
}

function FormMultiComboboxDemo() {
  const form = useForm<{ skills: string[] }>({ defaultValues: { skills: [] } });
  const skills = [
    { id: 'js', name: 'JavaScript' },
    { id: 'ts', name: 'TypeScript' },
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue' },
    { id: 'angular', name: 'Angular' },
    { id: 'node', name: 'Node.js' },
  ];

  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96">
      <FormMultiCombobox
        name="skills"
        control={form.control}
        label="Skills (Multi-select)"
        options={skills}
        getOptionLabel={(o) => (o as any).name}
        getOptionValue={(o) => (o as any).id}
        placeholder="Select skills..."
      />
    </FormContainer>
  );
}

function FormUploadFileDemo() {
  const form = useForm<{ document: File | null }>();

  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96">
      <FormUploadFile name="document" control={form.control} label="Upload Document" accept=".pdf,.doc,.docx" />
    </FormContainer>
  );
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <ConfirmDialog
      title="Confirm Action"
      description="Are you sure you want to proceed?"
      open={open}
      onOpenChange={setOpen}
      onConfirm={() => console.log('Confirmed')}
    >
      <Button variant="destructive">Delete Item</Button>
    </ConfirmDialog>
  );
}

function DateNavigationDemo() {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const handlePrevious = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };
  const handleNext = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };
  return <DateNavigation date={currentDate} onSetDate={setCurrentDate} handlePrevious={handlePrevious} handleNext={handleNext} />;
}

function FacetedFilterDemo() {
  const form = useForm({ defaultValues: { status: [] } });
  return (
    <FacetedFilter
      name="status"
      title="Status"
      control={form.control}
      filterVariant="multi-select"
      filterOptions={[
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ]}
    />
  );
}

function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: 'Personal Info', step: <div className="p-4">Step 1 content</div> },
    { title: 'Address', step: <div className="p-4">Step 2 content</div> },
    { title: 'Review', step: <div className="p-4">Step 3 content</div> },
  ];
  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      handleNextStepChange={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
      handleBackStepChange={() => setCurrentStep(Math.max(currentStep - 1, 0))}
      isLoading={false}
    />
  );
}

function PrimeDialogDemo() {
  return (
    <PrimeDialog dialogMode="Create">
      <PrimeDialog.Trigger asChild>
        <Button variant="secondary">Open Prime Dialog</Button>
      </PrimeDialog.Trigger>
      <PrimeDialog.Container>
        <PrimeDialog.Header>
          <PrimeDialog.Title>User</PrimeDialog.Title>
        </PrimeDialog.Header>
        <PrimeDialog.Content>
          <div className="p-4">Prime dialog content with automatic header styling</div>
        </PrimeDialog.Content>
        <PrimeDialog.Actions />
      </PrimeDialog.Container>
    </PrimeDialog>
  );
}

function PrimeSheetDemo() {
  return (
    <PrimeSheet sheetMode="Create">
      <PrimeSheet.Trigger asChild>
        <Button variant="secondary">Open Prime Sheet</Button>
      </PrimeSheet.Trigger>
      <PrimeSheet.Container>
        <PrimeSheet.Header>
          <PrimeSheet.Title>User</PrimeSheet.Title>
        </PrimeSheet.Header>
        <PrimeSheet.Content>
          <div className="p-4">Prime sheet content with automatic header styling</div>
        </PrimeSheet.Content>
        <PrimeSheet.Actions />
      </PrimeSheet.Container>
    </PrimeSheet>
  );
}

function TwoColumnMultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const groups = [
    { id: '1', name: 'Engineering' },
    { id: '2', name: 'Design' },
  ];
  const items = [
    { id: 'u1', name: 'John Doe', email: 'john@example.com', groupId: '1' },
    { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', groupId: '2' },
  ];
  return (
    <TwoColumnMultiSelect groups={groups} items={items} value={selected} onChange={setSelected} searchableFields={['name', 'email']} />
  );
}

function ToastDemo() {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed successfully.',
      variant: 'default',
    });
  };

  const showErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={showSuccessToast}>
        Show Success
      </Button>
      <Button variant="destructive" onClick={showErrorToast}>
        Show Error
      </Button>
    </div>
  );
}

export const uiDocs: ComponentDoc[] = [
  {
    id: 'button',
    title: 'Button',
    description: 'Primary action button with multiple variants, sizes, and states.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">⚙</Button>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">States</p>
          <div className="flex flex-wrap gap-2">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </div>
    ),
    imports: "import { Button } from '@components/ui';",
    code: '// Variants\n<Button variant="default">Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>\n\n// Sizes\n<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>\n<Button size="icon">Icon</Button>\n\n// States\n<Button disabled>Disabled</Button>',
    tags: ['ui', 'button', 'actions'],
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Small count or status descriptor with variant styles.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Usage Examples</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>New</Badge>
            <Badge variant="secondary">Beta</Badge>
            <Badge variant="destructive">99+</Badge>
            <Badge variant="outline">Premium</Badge>
          </div>
        </div>
      </div>
    ),
    imports: "import { Badge } from '@components/ui';",
    code: '// Variants\n<Badge variant="default">Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Error</Badge>\n<Badge variant="outline">Outline</Badge>\n\n// Examples\n<Badge>New</Badge>\n<Badge variant="secondary">Beta</Badge>\n<Badge variant="destructive">99+</Badge>',
    tags: ['ui', 'badge'],
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Container with header, content, and footer sections.',
    demo: (
      <div className="space-y-4">
        <Card className="w-full">
          <Card.Header>
            <Card.Title>Simple Card</Card.Title>
            <Card.Description>Card with title and description</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">This is the card content area.</p>
          </Card.Content>
        </Card>
        <Card className="w-full">
          <Card.Header>
            <Card.Title>Card with Footer</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">Content goes here.</p>
          </Card.Content>
          <Card.Footer className="flex justify-between">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Card.Footer>
        </Card>
      </div>
    ),
    imports: "import { Card, Button } from '@components/ui';",
    code: '// Basic Card\n<Card>\n  <Card.Header>\n    <Card.Title>Title</Card.Title>\n    <Card.Description>Description</Card.Description>\n  </Card.Header>\n  <Card.Content>Content</Card.Content>\n</Card>\n\n// With Footer\n<Card>\n  <Card.Header>\n    <Card.Title>Title</Card.Title>\n  </Card.Header>\n  <Card.Content>Content</Card.Content>\n  <Card.Footer>Footer content</Card.Footer>\n</Card>',
    tags: ['ui', 'layout', 'card'],
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Switch between content panes.',
    demo: (
      <Tabs defaultValue="account" className="w-80">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">Account tab</Tabs.Content>
        <Tabs.Content value="password">Password tab</Tabs.Content>
      </Tabs>
    ),
    imports: "import { Tabs } from '@components/ui';",
    code: '<Tabs defaultValue="account">\n  <Tabs.List>\n    <Tabs.Trigger value="account">Account</Tabs.Trigger>\n    <Tabs.Trigger value="password">Password</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="account">...</Tabs.Content>\n  <Tabs.Content value="password">...</Tabs.Content>\n</Tabs>',
    tags: ['ui', 'tabs', 'navigation'],
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Contextual hints on hover or focus.',
    demo: (
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Helpful hint</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    ),
    imports: "import { Tooltip, Button } from '@components/ui';",
    code: '<Tooltip.Provider>\n  <Tooltip>\n    <Tooltip.Trigger asChild><Button>Hover me</Button></Tooltip.Trigger>\n    <Tooltip.Content>Helpful hint</Tooltip.Content>\n  </Tooltip>\n</Tooltip.Provider>',
    tags: ['ui', 'tooltip', 'feedback'],
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Binary on/off control.',
    demo: <Switch defaultChecked />,
    imports: "import { Switch } from '@components/ui';",
    code: '<Switch defaultChecked />',
    tags: ['ui', 'input'],
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'Select a value or range.',
    demo: <Slider defaultValue={[50]} max={100} step={1} className="w-64" />,
    imports: "import { Slider } from '@components/ui';",
    code: '<Slider defaultValue={[50]} max={100} step={1} />',
    tags: ['ui', 'input'],
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Multi-select control.',
    demo: <Checkbox defaultChecked />,
    imports: "import { Checkbox } from '@components/ui';",
    code: '<Checkbox defaultChecked />',
    tags: ['ui', 'input'],
  },
  {
    id: 'radio-group',
    title: 'RadioGroup',
    description: 'Select a single option.',
    demo: (
      <RadioGroup defaultValue="a" className="flex gap-4">
        <label className="flex items-center gap-2">
          <RadioGroupItem value="a" /> A
        </label>
        <label className="flex items-center gap-2">
          <RadioGroupItem value="b" /> B
        </label>
      </RadioGroup>
    ),
    imports: "import { RadioGroup, RadioGroupItem } from '@components/ui';",
    code: '<RadioGroup defaultValue="a">\n  <label><RadioGroupItem value="a" /> A</label>\n  <label><RadioGroupItem value="b" /> B</label>\n</RadioGroup>',
    tags: ['ui', 'input'],
  },
  {
    id: 'inputs',
    title: 'Input',
    description: 'Text input for forms.',
    demo: (
      <div className="flex w-80 flex-col gap-3">
        <Input placeholder="Email" />
      </div>
    ),
    imports: "import { Input } from '@components/ui';",
    code: '<Input placeholder="Email" />',
    tags: ['ui', 'forms', 'input'],
  },
  {
    id: 'select',
    title: 'Select',
    description: 'Single select dropdown.',
    demo: (
      <Select defaultValue="apple">
        <Select.Trigger className="w-48">
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
        </Select.Content>
      </Select>
    ),
    imports: "import { Select } from '@components/ui';",
    code: '<Select defaultValue="apple">\n  <Select.Trigger><Select.Value /></Select.Trigger>\n  <Select.Content>\n    <Select.Item value="apple">Apple</Select.Item>\n  </Select.Content>\n</Select>',
    tags: ['ui', 'input', 'select'],
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Expandable content panels.',
    demo: (
      <Accordion type="single" collapsible className="w-80">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content for section 1.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content for section 2.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    ),
    imports: "import { Accordion } from '@components/ui';",
    code: '<Accordion type="single" collapsible>\n  <Accordion.Item value="item-1">\n    <Accordion.Trigger>Section 1</Accordion.Trigger>\n    <Accordion.Content>Content here</Accordion.Content>\n  </Accordion.Item>\n</Accordion>',
    tags: ['ui', 'accordion', 'disclosure'],
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Display important messages with different severity levels.',
    demo: (
      <div className="space-y-3">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="space-y-2">
            <Alert variant="default">
              <InfoIcon />
              <Alert.Title>Info</Alert.Title>
              <Alert.Description>This is an informational alert message.</Alert.Description>
            </Alert>
            <Alert variant="destructive">
              <InfoIcon />
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>This is an error alert message.</Alert.Description>
            </Alert>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Without Icon</p>
          <Alert variant="default">
            <Alert.Title>Simple Alert</Alert.Title>
            <Alert.Description>Alert without an icon.</Alert.Description>
          </Alert>
        </div>
      </div>
    ),
    imports: "import { Alert } from '@components/ui';\nimport { InfoIcon } from 'lucide-react';",
    code: '// With Icon\n<Alert variant="default">\n  <InfoIcon />\n  <Alert.Title>Title</Alert.Title>\n  <Alert.Description>Description</Alert.Description>\n</Alert>\n\n// Destructive\n<Alert variant="destructive">\n  <InfoIcon />\n  <Alert.Title>Error</Alert.Title>\n  <Alert.Description>Error message</Alert.Description>\n</Alert>\n\n// Without Icon\n<Alert>\n  <Alert.Title>Title</Alert.Title>\n  <Alert.Description>Description</Alert.Description>\n</Alert>',
    tags: ['ui', 'alert', 'feedback'],
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'User profile image with fallback support and different sizes.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">With Image</p>
          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
              <Avatar.Fallback>SM</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
              <Avatar.Fallback>MD</Avatar.Fallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
              <Avatar.Fallback>LG</Avatar.Fallback>
            </Avatar>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Fallback (Text & Icon)</p>
          <div className="flex gap-2">
            <Avatar>
              <Avatar.Image alt="User" />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Image alt="User" />
              <Avatar.Fallback>
                <User size={16} />
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>
      </div>
    ),
    imports: "import { Avatar } from '@components/ui';\nimport { User } from 'lucide-react';",
    code: '// With Image\n<Avatar>\n  <Avatar.Image src="..." alt="User" />\n  <Avatar.Fallback>CN</Avatar.Fallback>\n</Avatar>\n\n// Custom Size\n<Avatar className="h-12 w-12">\n  <Avatar.Image src="..." alt="User" />\n  <Avatar.Fallback>LG</Avatar.Fallback>\n</Avatar>\n\n// Icon Fallback\n<Avatar>\n  <Avatar.Image alt="User" />\n  <Avatar.Fallback><User /></Avatar.Fallback>\n</Avatar>',
    tags: ['ui', 'avatar', 'image'],
  },
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'Modal dialog overlay.',
    demo: <DialogDemo />,
    imports: "import { Dialog, Button } from '@components/ui';",
    code: '<Dialog open={open} onOpenChange={setOpen}>\n  <Dialog.Trigger asChild><Button>Open</Button></Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Header>\n      <Dialog.Title>Title</Dialog.Title>\n    </Dialog.Header>\n    Content here\n  </Dialog.Content>\n</Dialog>',
    tags: ['ui', 'dialog', 'modal'],
  },
  {
    id: 'sheet',
    title: 'Sheet (Drawer)',
    description: 'Slide-out panel from edge.',
    demo: <SheetDemo />,
    imports: "import { Sheet, Button } from '@components/ui';",
    code: '<Sheet open={open} onOpenChange={setOpen}>\n  <Sheet.Trigger asChild><Button>Open</Button></Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Header>\n      <Sheet.Title>Title</Sheet.Title>\n    </Sheet.Header>\n    Content here\n  </Sheet.Content>\n</Sheet>',
    tags: ['ui', 'sheet', 'drawer'],
  },
  {
    id: 'popover',
    title: 'Popover',
    description: 'Floating content on click.',
    demo: <PopoverDemo />,
    imports: "import { Popover, Button } from '@components/ui';",
    code: '<Popover>\n  <Popover.Trigger asChild><Button>Open</Button></Popover.Trigger>\n  <Popover.Content>\n    Content here\n  </Popover.Content>\n</Popover>',
    tags: ['ui', 'popover'],
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Visual progress indicator with multiple variants and sizes.',
    demo: (
      <div className="w-full space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="space-y-2">
            <div className="space-y-1">
              <span className="text-xs">Default (30%)</span>
              <Progress value={30} />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Success (60%)</span>
              <Progress value={60} variant="success" indicatorVariant="success" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Destructive (90%)</span>
              <Progress value={90} variant="destructive" indicatorVariant="destructive" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="space-y-2">
            <Progress value={70} size="sm" />
            <Progress value={70} size="md" />
            <Progress value={70} size="lg" />
          </div>
        </div>
      </div>
    ),
    imports: "import { Progress } from '@components/ui';",
    code: '// Variants\n<Progress value={30} />\n<Progress value={60} variant="success" indicatorVariant="success" />\n<Progress value={90} variant="destructive" indicatorVariant="destructive" />\n\n// Sizes\n<Progress value={70} size="sm" />\n<Progress value={70} size="md" />\n<Progress value={70} size="lg" />',
    tags: ['ui', 'progress', 'loading'],
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Loading placeholders with preset sizes and variants.',
    demo: (
      <div className="w-full space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="space-y-2">
            <Skeleton size="sm" />
            <Skeleton size="default" />
            <Skeleton size="md" />
            <Skeleton size="lg" />
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Shapes</p>
          <div className="flex gap-3">
            <Skeleton size="avatar" />
            <Skeleton size="icon" />
            <Skeleton size="thumbnail" />
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="space-y-2">
            <Skeleton variant="default" className="h-4 w-full" />
            <Skeleton variant="card" className="h-4 w-full" />
            <Skeleton variant="primary" className="h-4 w-full" />
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Card Example</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <Skeleton size="avatar" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    imports: "import { Skeleton } from '@components/ui';",
    code: '// Sizes\n<Skeleton size="sm" />\n<Skeleton size="default" />\n<Skeleton size="md" />\n<Skeleton size="lg" />\n\n// Shapes\n<Skeleton size="avatar" />\n<Skeleton size="icon" />\n<Skeleton size="thumbnail" />\n\n// Variants\n<Skeleton variant="default" />\n<Skeleton variant="card" />\n<Skeleton variant="primary" />\n\n// Custom\n<Skeleton className="h-4 w-full" />',
    tags: ['ui', 'skeleton', 'loading'],
  },
  {
    id: 'label',
    title: 'Label',
    description: 'Form field label.',
    demo: (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </div>
    ),
    imports: "import { Label, Input } from '@components/ui';",
    code: '<Label htmlFor="email">Email</Label>\n<Input id="email" />',
    tags: ['ui', 'label', 'forms'],
  },
  {
    id: 'loading-button',
    title: 'LoadingButton',
    description: 'Button with loading spinner state.',
    demo: (
      <div className="flex gap-2">
        <LoadingButton variant="default">Normal</LoadingButton>
        <LoadingButton variant="default" loading>
          Loading...
        </LoadingButton>
      </div>
    ),
    imports: "import { LoadingButton } from '@components/ui';",
    code: '<LoadingButton loading={isLoading}>Submit</LoadingButton>',
    tags: ['ui', 'button', 'loading'],
  },
  {
    id: 'tooltip-button',
    title: 'TooltipButton',
    description: 'Button with integrated tooltip.',
    demo: (
      <TooltipButton title="This is a helpful tooltip" variant="secondary">
        Hover Me
      </TooltipButton>
    ),
    imports: "import { TooltipButton } from '@components/ui';",
    code: '<TooltipButton title="Tooltip text">Button</TooltipButton>',
    tags: ['ui', 'button', 'tooltip'],
  },
  {
    id: 'dropdown-menu',
    title: 'DropdownMenu',
    description: 'Context menu with items, checkboxes, and radio options.',
    demo: (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    ),
    imports: "import { DropdownMenu, Button } from '@components/ui';",
    code: `<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Open</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Menu</DropdownMenu.Label>
    <DropdownMenu.Item>Item 1</DropdownMenu.Item>
    <DropdownMenu.Item>Item 2</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`,
    tags: ['ui', 'dropdown', 'menu'],
  },
  {
    id: 'command',
    title: 'Command',
    description: 'Command palette for searchable actions.',
    demo: (
      <Command className="w-96 rounded-lg border shadow-md">
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Search Emoji</Command.Item>
            <Command.Item>Calculator</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    ),
    imports: "import { Command } from '@components/ui';",
    code: `<Command>
  <Command.Input placeholder="Search..." />
  <Command.List>
    <Command.Empty>No results.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>Item 1</Command.Item>
    </Command.Group>
  </Command.List>
</Command>`,
    tags: ['ui', 'command', 'search'],
  },
  {
    id: 'collapsible',
    title: 'Collapsible',
    description: 'Expandable/collapsible content section.',
    demo: (
      <Collapsible className="w-80 space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">@username has 3 repositories</h4>
          <Collapsible.Trigger asChild>
            <Button variant="ghost" size="sm">
              Toggle
            </Button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content className="space-y-2">
          <div className="rounded-md border px-4 py-2 text-sm">Repository 1</div>
          <div className="rounded-md border px-4 py-2 text-sm">Repository 2</div>
          <div className="rounded-md border px-4 py-2 text-sm">Repository 3</div>
        </Collapsible.Content>
      </Collapsible>
    ),
    imports: "import { Collapsible, Button } from '@components/ui';",
    code: `<Collapsible>
  <Collapsible.Trigger asChild>
    <Button>Toggle</Button>
  </Collapsible.Trigger>
  <Collapsible.Content>
    Hidden content here
  </Collapsible.Content>
</Collapsible>`,
    tags: ['ui', 'collapsible', 'disclosure'],
  },
  {
    id: 'divider',
    title: 'Divider (Separator)',
    description: 'Visual separator line.',
    demo: (
      <div className="w-full space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Horizontal</p>
          <div className="space-y-1">
            <div className="text-sm">Section 1</div>
            <Divider />
            <div className="text-sm">Section 2</div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Vertical</p>
          <div className="flex h-12 items-center space-x-2">
            <div className="text-sm">Left</div>
            <Divider orientation="vertical" />
            <div className="text-sm">Right</div>
          </div>
        </div>
      </div>
    ),
    imports: "import { Divider } from '@components/ui';",
    code: '// Horizontal\n<Divider />\n\n// Vertical\n<Divider orientation="vertical" />',
    tags: ['ui', 'divider', 'separator'],
  },
  {
    id: 'scroll-area',
    title: 'ScrollArea',
    description: 'Custom styled scrollable area.',
    demo: (
      <ScrollArea className="h-48 w-80 rounded-md border p-4">
        <div className="space-y-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-sm">
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    imports: "import { ScrollArea } from '@components/ui';",
    code: `<ScrollArea className="h-48 w-80">
  <div>Long scrollable content...</div>
</ScrollArea>`,
    tags: ['ui', 'scroll', 'scrollarea'],
  },
  {
    id: 'table',
    title: 'Table',
    description: 'Basic HTML table with styled components.',
    demo: (
      <div className="w-full">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Role</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>John Doe</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jane Smith</Table.Cell>
              <Table.Cell>Active</Table.Cell>
              <Table.Cell>User</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    ),
    imports: "import { Table } from '@components/ui';",
    code: `<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Data</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
    tags: ['ui', 'table', 'data'],
  },
  {
    id: 'toast',
    title: 'Toast',
    description: 'Notification toasts with success and error variants.',
    demo: <ToastDemo />,
    imports: "import { useToast } from '@hooks/shared';\nimport { Toaster } from '@components/shared';",
    code: `// In your App root
<Toaster />

// In your component
const { toast } = useToast();

// Success toast
toast({
  title: 'Success!',
  description: 'Operation completed successfully.',
  variant: 'default',
});

// Error toast
toast({
  title: 'Error',
  description: 'Something went wrong.',
  variant: 'destructive',
});`,
    tags: ['ui', 'toast', 'notification'],
  },
  {
    id: 'toggle-group',
    title: 'ToggleGroup',
    description: 'Group of toggle buttons.',
    demo: (
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroup.Item value="left" aria-label="Align left">
          Left
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Align center">
          Center
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Align right">
          Right
        </ToggleGroup.Item>
      </ToggleGroup>
    ),
    imports: "import { ToggleGroup } from '@components/ui';",
    code: `<ToggleGroup type="single" defaultValue="center">
  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
  <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
</ToggleGroup>`,
    tags: ['ui', 'toggle', 'input'],
  },
];
export const formDocs: ComponentDoc[] = [
  {
    id: 'form-basic',
    title: 'Form (Input + Select)',
    description: 'Minimal form using react-hook-form and provided fields.',
    demo: <FormBasicDemo />,
    imports: "import { FormContainer, FormInput, FormSelect } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormInput name="email" label="Email" />\n  <FormSelect name="fruit" control={form.control} options={[{id:\'apple\',name:\'Apple\'}]} getOptionLabel={(o)=>o.name} getOptionValue={(o)=>o.id} />\n  <Button type="submit">Submit</Button>\n</FormContainer>',
    tags: ['forms', 'input', 'select'],
  },
  {
    id: 'form-checkbox',
    title: 'FormCheckbox',
    description: 'Controlled checkbox component.',
    demo: <FormCheckboxDemo />,
    imports: "import { FormContainer, FormCheckbox } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormCheckbox name="agree" control={form.control} label="I agree" />\n</FormContainer>',
    tags: ['forms', 'checkbox'],
  },
  {
    id: 'form-date',
    title: 'FormDatePicker',
    description: 'Single date picker field.',
    demo: <FormDatePickerDemo />,
    imports: "import { FormContainer, FormDatePicker } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormDatePicker name="date" control={form.control} label="Date" />\n</FormContainer>',
    tags: ['forms', 'date'],
  },
  {
    id: 'form-daterange',
    title: 'FormDateRange',
    description: 'Pick a date range.',
    demo: <FormDateRangeDemo />,
    imports: "import { FormContainer, FormDateRange } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormDateRange name="range" control={form.control} label="Range" />\n</FormContainer>',
    tags: ['forms', 'date'],
  },
  {
    id: 'form-number-textarea',
    title: 'FormNumber & FormTextarea',
    description: 'Numeric and multi-line text fields.',
    demo: <FormNumberTextareaDemo />,
    imports: "import { FormContainer, FormNumber, FormTextarea } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormNumber name="qty" control={form.control} label="Quantity" />\n  <FormTextarea name="notes" label="Notes" />\n</FormContainer>',
    tags: ['forms', 'number', 'textarea'],
  },
  {
    id: 'form-validation',
    title: 'Form with Zod Validation',
    description: 'Form with schema validation using Zod.',
    demo: <FormWithValidationDemo />,
    imports:
      "import { FormContainer, FormInput, FormNumber, Button } from '@components/forms';\nimport { useForm } from 'react-hook-form';\nimport { z } from 'zod';",
    code: 'const schema = z.object({\n  email: z.string().email(\'Invalid email\'),\n  password: z.string().min(8, \'Min 8 chars\'),\n  age: z.number().min(18, \'Must be 18+\'),\n});\n\ntype FormData = z.infer<typeof schema>;\n\nconst form = useForm<FormData>({\n  defaultValues: { email: \'\', password: \'\', age: 18 },\n});\n\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormInput name="email" label="Email" required />\n  <FormInput name="password" type="password" label="Password" required />\n  <FormNumber name="age" control={form.control} label="Age" />\n  <Button type="submit">Submit</Button>\n</FormContainer>',
    tags: ['forms', 'validation', 'zod'],
  },
  {
    id: 'form-combobox',
    title: 'FormCombobox (Searchable Select)',
    description: 'Searchable dropdown with autocomplete.',
    demo: <FormComboboxDemo />,
    imports: "import { FormContainer, FormCombobox } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: "const form = useForm();\nconst options = [\n  { id: 'us', name: 'United States' },\n  { id: 'uk', name: 'United Kingdom' },\n];\n\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormCombobox\n    name=\"country\"\n    control={form.control}\n    label=\"Country\"\n    options={options}\n    getOptionLabel={(o) => o.name}\n    getOptionValue={(o) => o.id}\n    placeholder=\"Search country...\"\n  />\n</FormContainer>",
    tags: ['forms', 'combobox', 'search'],
  },
  {
    id: 'form-multi-combobox',
    title: 'FormMultiCombobox (Multi-select)',
    description: 'Multiple selection with badges and search.',
    demo: <FormMultiComboboxDemo />,
    imports: "import { FormContainer, FormMultiCombobox } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: "const form = useForm({ defaultValues: { skills: [] } });\nconst skills = [\n  { id: 'js', name: 'JavaScript' },\n  { id: 'ts', name: 'TypeScript' },\n];\n\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormMultiCombobox\n    name=\"skills\"\n    control={form.control}\n    label=\"Skills\"\n    options={skills}\n    getOptionLabel={(o) => o.name}\n    getOptionValue={(o) => o.id}\n    placeholder=\"Select skills...\"\n  />\n</FormContainer>",
    tags: ['forms', 'multi-select', 'combobox'],
  },
  {
    id: 'form-upload-file',
    title: 'FormUploadFile',
    description: 'File upload with preview and validation.',
    demo: <FormUploadFileDemo />,
    imports: "import { FormContainer, FormUploadFile } from '@components/forms';\nimport { useForm } from 'react-hook-form';",
    code: 'const form = useForm();\n\n<FormContainer formContext={form} onSuccess={console.log}>\n  <FormUploadFile\n    name="document"\n    control={form.control}\n    label="Upload Document"\n    accept=".pdf,.doc,.docx"\n  />\n</FormContainer>',
    tags: ['forms', 'upload', 'file'],
  },
];
export const tableDocs: ComponentDoc[] = [
  {
    id: 'data-table-basic',
    title: 'DataTable (Basic)',
    description: 'Sortable, paginated table using TanStack Table.',
    demo: <DataTableBasicDemo />,
    imports:
      "import { DataTable } from '@components/tables';\nimport { useDataTable } from '@hooks/utils/useDataTable';\nimport { ColumnDef } from '@tanstack/react-table';",
    code: "const columns: ColumnDef<User>[] = [\n  { header: 'Name', accessorKey: 'name' },\n  { header: 'Email', accessorKey: 'email' },\n];\n\nconst { table } = useDataTable({\n  data,\n  columns,\n  pageCount: 1,\n  initialState: { pagination: { pageIndex: 0, pageSize: data.length } },\n  state: { pagination: { pageIndex: 0, pageSize: data.length } },\n});\n\n<DataTable table={table} />",
    tags: ['table', 'data-table', 'basic'],
  },
  {
    id: 'data-table-filters',
    title: 'DataTable with Filters & Search',
    description: 'Full-featured table with toolbar, global search, and column filters.',
    demo: <DataTableWithFiltersDemo />,
    imports:
      "import { DataTable, DataTableToolbar } from '@components/tables';\nimport { useDataTable } from '@hooks/utils/useDataTable';\nimport { ColumnDef } from '@tanstack/react-table';",
    code: "const columns: ColumnDef<User>[] = [\n  { header: 'Name', accessorKey: 'name', enableColumnFilter: true },\n  { header: 'Email', accessorKey: 'email' },\n  { header: 'Role', accessorKey: 'role', enableColumnFilter: true },\n  { header: 'Status', accessorKey: 'status', enableColumnFilter: true },\n];\n\nconst { table } = useDataTable({\n  data,\n  columns,\n  pageCount: Math.ceil(data.length / pageSize),\n  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },\n  state: { pagination: { pageIndex: 0, pageSize: 10 } },\n});\n\n<DataTable table={table}>\n  <DataTableToolbar table={table} />\n</DataTable>",
    tags: ['table', 'data-table', 'filters', 'search', 'toolbar'],
  },
];

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
