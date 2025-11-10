import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type ColumnDef } from '@tanstack/react-table';
import { CalendarIcon, Check, ChevronsUpDown, UserIcon } from 'lucide-react';
import { Button, Command } from '@components/ui';
import { Dialog } from '@components/ui/dialog';
import { Sheet } from '@components/ui/sheet';
import { Popover } from '@components/ui/popover';
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
import { ConfirmDialog, DateNavigation, FacetedFilter, PrimeDialog, PrimeSheet, Stepper, TwoColumnMultiSelect } from '@components/shared';
import { z } from 'zod';

// ---------- Demo components (hooks must be used inside components) ----------
export function DialogDemo() {
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

export function SheetDemo() {
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

export function PopoverDemo() {
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

export function CommandAutocompleteDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
  ];

  const selectedFramework = frameworks.find((f) => f.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {selectedFramework ? selectedFramework.label : 'Select framework...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] p-0">
        <Command>
          <Command.Input placeholder="Search framework..." />
          <Command.List>
            <Command.Empty>No framework found.</Command.Empty>
            <Command.Group>
              {frameworks.map((framework) => (
                <Command.Item
                  key={framework.value}
                  value={framework.label}
                  onSelect={() => {
                    setValue(framework.value === value ? '' : framework.value);
                    setOpen(false);
                  }}
                >
                  <Check className={`mr-2 h-4 w-4 ${value === framework.value ? 'opacity-100' : 'opacity-0'}`} />
                  {framework.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
}

export function FormBasicDemo() {
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

export function FormCheckboxDemo() {
  const form = useForm<{ agree: boolean }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormCheckbox name="agree" control={form.control} label="I agree to the terms" />
    </FormContainer>
  );
}

export function FormDatePickerDemo() {
  const form = useForm<{ date?: Date }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormDatePicker name="date" control={form.control} label="Date" />
    </FormContainer>
  );
}

export function FormDateRangeDemo() {
  const form = useForm<{ range: any }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <FormDateRange name="range" control={form.control} label="Range" />
    </FormContainer>
  );
}

export function FormNumberTextareaDemo() {
  const form = useForm<{ qty: number; notes: string }>();
  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96 space-y-3">
      <FormNumber name="qty" control={form.control} label="Quantity" />
      <FormTextarea name="notes" label="Notes" />
    </FormContainer>
  );
}

export function DataTableBasicDemo() {
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

export function DataTableWithFiltersDemo() {
  const data = mockUsers;
  const columns: ColumnDef<(typeof data)[number]>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      enableColumnFilter: false
    },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Role',
      accessorKey: 'role',
      enableColumnFilter: true,
      meta: {
        variant: 'multiSelect',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ],
        placeholder: 'Search by role',
        label: 'Role',
        icon: UserIcon,
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      enableColumnFilter: true,
      meta: {
        variant: 'select',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        placeholder: 'Search by status',
        label: 'Status',
        icon: UserIcon,
      },
    },
    {
        header: 'Created At',
        accessorKey: 'createdAt',
        enableColumnFilter: true,
        meta: {
            variant: 'date',
            placeholder: 'Search by created at',
            label: 'Created At',
            icon: CalendarIcon,
        },
    },
    {
        header: 'Updated At',
        accessorKey: 'updatedAt',
        enableColumnFilter: true,
        meta: {
            variant: 'dateRange',
            placeholder: 'Search by updated at',
            label: 'Updated At',
            icon: CalendarIcon,
        },
        cell: ({ row }) => {
            return <div>{row.original.createdAt}</div>;
        },
    },
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

export function FormWithValidationDemo() {
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

export function FormComboboxDemo() {
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

export function FormMultiComboboxDemo() {
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

export function FormUploadFileDemo() {
  const form = useForm<{ document: File | null }>();

  return (
    <FormContainer formContext={form} onSuccess={() => {}} className="w-96">
      <FormUploadFile name="document" control={form.control} label="Upload Document" accept=".pdf,.doc,.docx" />
    </FormContainer>
  );
}

export function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <ConfirmDialog
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => console.log('Confirmed')}
        variant="default"
      >
        <Button variant="default">Default</Button>
      </ConfirmDialog>
      <ConfirmDialog
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        open={open2}
        onOpenChange={setOpen2}
        onConfirm={() => console.log('Confirmed')}
        variant="destructive"
      >
        <Button variant="destructive">Destructive</Button>
      </ConfirmDialog>
      <ConfirmDialog
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        open={open3}
        onOpenChange={setOpen3}
        onConfirm={() => console.log('Confirmed')}
        variant="outline"
      >
        <Button variant="outline">Outline</Button>
      </ConfirmDialog>
    </div>
  );
}

export function DateNavigationDemo() {
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

export function FacetedFilterDemo() {
  const form = useForm({ defaultValues: { status: [], search: '', date: null, dateRange: null } });
  return (
    <FormContainer formContext={form} onSuccess={() => {}}>
      <div className="space-y-4">
        <FacetedFilter name="search" title="Text Search" control={form.control} filterVariant="text" />
        <FacetedFilter
          name="status"
          title="Select"
          control={form.control}
          filterVariant="select"
          filterOptions={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
        <FacetedFilter
          name="status"
          title="Multi-Select"
          control={form.control}
          filterVariant="multi-select"
          filterOptions={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Pending', value: 'pending' },
          ]}
        />
        <FacetedFilter name="date" title="Date" control={form.control} filterVariant="date" />
        <FacetedFilter name="dateRange" title="Date Range" control={form.control} filterVariant="date-range" />
      </div>
    </FormContainer>
  );
}

export function StepperDemo() {
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

export function PrimeDialogDemo() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openView, setOpenView] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <PrimeDialog dialogMode="Create" open={openCreate} onOpenChange={setOpenCreate}>
        <PrimeDialog.Trigger asChild>
          <Button variant="secondary">Create Mode</Button>
        </PrimeDialog.Trigger>
        <PrimeDialog.Container>
          <PrimeDialog.Header>
            <PrimeDialog.Title>User</PrimeDialog.Title>
          </PrimeDialog.Header>
          <PrimeDialog.Content>
            <div className="p-4">Create mode dialog content</div>
          </PrimeDialog.Content>
          <PrimeDialog.Actions />
        </PrimeDialog.Container>
      </PrimeDialog>
      <PrimeDialog dialogMode="Update" open={openUpdate} onOpenChange={setOpenUpdate}>
        <PrimeDialog.Trigger asChild>
          <Button variant="secondary">Update Mode</Button>
        </PrimeDialog.Trigger>
        <PrimeDialog.Container>
          <PrimeDialog.Header>
            <PrimeDialog.Title>User</PrimeDialog.Title>
          </PrimeDialog.Header>
          <PrimeDialog.Content>
            <div className="p-4">Update mode dialog content</div>
          </PrimeDialog.Content>
          <PrimeDialog.Actions />
        </PrimeDialog.Container>
      </PrimeDialog>
      <PrimeDialog dialogMode="View" open={openView} onOpenChange={setOpenView}>
        <PrimeDialog.Trigger asChild>
          <Button variant="secondary">View Mode</Button>
        </PrimeDialog.Trigger>
        <PrimeDialog.Container>
          <PrimeDialog.Header>
            <PrimeDialog.Title>User</PrimeDialog.Title>
          </PrimeDialog.Header>
          <PrimeDialog.Content>
            <div className="p-4">View mode dialog content (submit button hidden)</div>
          </PrimeDialog.Content>
          <PrimeDialog.Actions />
        </PrimeDialog.Container>
      </PrimeDialog>
    </div>
  );
}

export function PrimeSheetDemo() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openView, setOpenView] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <PrimeSheet sheetMode="Create" open={openCreate} onOpenChange={setOpenCreate}>
        <PrimeSheet.Trigger asChild>
          <Button variant="secondary">Create Mode</Button>
        </PrimeSheet.Trigger>
        <PrimeSheet.Container>
          <PrimeSheet.Header>
            <PrimeSheet.Title>User</PrimeSheet.Title>
          </PrimeSheet.Header>
          <PrimeSheet.Content>
            <div className="p-4">Create mode sheet content</div>
          </PrimeSheet.Content>
          <PrimeSheet.Actions />
        </PrimeSheet.Container>
      </PrimeSheet>
      <PrimeSheet sheetMode="Update" open={openUpdate} onOpenChange={setOpenUpdate}>
        <PrimeSheet.Trigger asChild>
          <Button variant="secondary">Update Mode</Button>
        </PrimeSheet.Trigger>
        <PrimeSheet.Container>
          <PrimeSheet.Header>
            <PrimeSheet.Title>User</PrimeSheet.Title>
          </PrimeSheet.Header>
          <PrimeSheet.Content>
            <div className="p-4">Update mode sheet content</div>
          </PrimeSheet.Content>
          <PrimeSheet.Actions />
        </PrimeSheet.Container>
      </PrimeSheet>
      <PrimeSheet sheetMode="View" open={openView} onOpenChange={setOpenView}>
        <PrimeSheet.Trigger asChild>
          <Button variant="secondary">View Mode</Button>
        </PrimeSheet.Trigger>
        <PrimeSheet.Container>
          <PrimeSheet.Header>
            <PrimeSheet.Title>User</PrimeSheet.Title>
          </PrimeSheet.Header>
          <PrimeSheet.Content>
            <div className="p-4">View mode sheet content (submit button hidden)</div>
          </PrimeSheet.Content>
          <PrimeSheet.Actions />
        </PrimeSheet.Container>
      </PrimeSheet>
    </div>
  );
}

export function TwoColumnMultiSelectDemo() {
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

export function ToastDemo() {
  const { toast } = useToast();

  const showDefaultToast = () => {
    toast({
      title: 'Default Toast',
      description: 'This is a default toast notification.',
      variant: 'default',
    });
  };

  const showSuccessToast = () => {
    toast({
      title: 'Success!',
      description: 'Operation completed successfully.',
      variant: 'success',
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
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={showDefaultToast}>
        Default
      </Button>
      <Button variant="outline" onClick={showSuccessToast}>
        Success
      </Button>
      <Button variant="destructive" onClick={showErrorToast}>
        Destructive
      </Button>
    </div>
  );
}

