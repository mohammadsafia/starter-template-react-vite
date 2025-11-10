import { InfoIcon, User } from 'lucide-react';
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
import { Label } from '@components/ui/label';
import { Slider } from '@components/ui/slider';
import { Progress } from '@components/ui/progress';
import { Skeleton } from '@components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group/RadioGroup';
import type { ComponentDoc } from './components.data.types';
import {
  DialogDemo,
  SheetDemo,
  PopoverDemo,
  CommandAutocompleteDemo,
  ToastDemo,
} from './components.data.demos';

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
            <Button variant="outline-destructive">Outline Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="orange">Orange</Button>
            <Button variant="icon">Icon</Button>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">⚙</Button>
            <Button size="full">Full Width</Button>
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
    code: '// Variants\n<Button variant="default">Default</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="outline-destructive">Outline Destructive</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>\n<Button variant="orange">Orange</Button>\n<Button variant="icon">Icon</Button>\n\n// Sizes\n<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>\n<Button size="icon">Icon</Button>\n<Button size="full">Full Width</Button>\n\n// States\n<Button disabled>Disabled</Button>',
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
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="orange">Orange</Badge>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Usage Examples</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>New</Badge>
            <Badge variant="secondary">Beta</Badge>
            <Badge variant="destructive">99+</Badge>
            <Badge variant="outline">Premium</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
      </div>
    ),
    imports: "import { Badge } from '@components/ui';",
    code: '// Variants\n<Badge variant="default">Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="info">Info</Badge>\n<Badge variant="orange">Orange</Badge>\n\n// Examples\n<Badge>New</Badge>\n<Badge variant="secondary">Beta</Badge>\n<Badge variant="destructive">99+</Badge>\n<Badge variant="success">Active</Badge>',
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
    description: 'Switch between content panes with multiple list and trigger variants.',
    demo: (
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">List Variants</p>
          <div className="space-y-4">
            <Tabs defaultValue="account" className="w-80">
              <Tabs.List variant="default">
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">Default variant tab content</Tabs.Content>
              <Tabs.Content value="password">Password tab content</Tabs.Content>
            </Tabs>
            <Tabs defaultValue="account" className="w-80">
              <Tabs.List variant="compact">
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">Compact variant tab content</Tabs.Content>
              <Tabs.Content value="password">Password tab content</Tabs.Content>
            </Tabs>
            <Tabs defaultValue="account" className="w-80">
              <Tabs.List variant="plain">
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">Plain variant tab content</Tabs.Content>
              <Tabs.Content value="password">Password tab content</Tabs.Content>
            </Tabs>
            <Tabs defaultValue="account" className="w-80">
              <Tabs.List variant="compactPlain">
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">Compact Plain variant tab content</Tabs.Content>
              <Tabs.Content value="password">Password tab content</Tabs.Content>
            </Tabs>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Trigger Variants</p>
          <Tabs defaultValue="account" className="w-80">
            <Tabs.List>
              <Tabs.Trigger value="account" variant="default">Default Trigger</Tabs.Trigger>
              <Tabs.Trigger value="password" variant="fitContent">Fit Content</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">Account tab content</Tabs.Content>
            <Tabs.Content value="password">Password tab content</Tabs.Content>
          </Tabs>
        </div>
      </div>
    ),
    imports: "import { Tabs } from '@components/ui';",
    code: '// List Variants\n<Tabs defaultValue="account">\n  <Tabs.List variant="default">...</Tabs.List>\n  <Tabs.List variant="compact">...</Tabs.List>\n  <Tabs.List variant="plain">...</Tabs.List>\n  <Tabs.List variant="compactPlain">...</Tabs.List>\n</Tabs>\n\n// Trigger Variants\n<Tabs.List>\n  <Tabs.Trigger value="account" variant="default">Default</Tabs.Trigger>\n  <Tabs.Trigger value="password" variant="fitContent">Fit Content</Tabs.Trigger>\n</Tabs.List>',
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
    description: 'Binary on/off control with multiple variants and sizes.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs">Default</span>
              <Switch variant="default" defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Success</span>
              <Switch variant="success" defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Destructive</span>
              <Switch variant="destructive" defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Secondary</span>
              <Switch variant="secondary" defaultChecked />
            </div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs">Small</span>
              <Switch size="sm" defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Medium</span>
              <Switch size="md" defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Large</span>
              <Switch size="lg" defaultChecked />
            </div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">States</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs">Unchecked</span>
              <Switch />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Checked</span>
              <Switch defaultChecked />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs">Disabled</span>
              <Switch disabled />
            </div>
          </div>
        </div>
      </div>
    ),
    imports: "import { Switch } from '@components/ui';",
    code: '// Variants\n<Switch variant="default" defaultChecked />\n<Switch variant="success" defaultChecked />\n<Switch variant="destructive" defaultChecked />\n<Switch variant="secondary" defaultChecked />\n\n// Sizes\n<Switch size="sm" defaultChecked />\n<Switch size="md" defaultChecked />\n<Switch size="lg" defaultChecked />\n\n// States\n<Switch />\n<Switch defaultChecked />\n<Switch disabled />',
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
              <Progress value={30} variant="default" indicatorVariant="default" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Success (60%)</span>
              <Progress value={60} variant="success" indicatorVariant="success" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Destructive (90%)</span>
              <Progress value={90} variant="destructive" indicatorVariant="destructive" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Secondary (50%)</span>
              <Progress value={50} variant="secondary" indicatorVariant="secondary" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Accent Indicator (75%)</span>
              <Progress value={75} variant="default" indicatorVariant="accent" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="space-y-2">
            <div className="space-y-1">
              <span className="text-xs">Small</span>
              <Progress value={70} size="sm" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Medium</span>
              <Progress value={70} size="md" />
            </div>
            <div className="space-y-1">
              <span className="text-xs">Large</span>
              <Progress value={70} size="lg" />
            </div>
          </div>
        </div>
      </div>
    ),
    imports: "import { Progress } from '@components/ui';",
    code: '// Variants\n<Progress value={30} variant="default" indicatorVariant="default" />\n<Progress value={60} variant="success" indicatorVariant="success" />\n<Progress value={90} variant="destructive" indicatorVariant="destructive" />\n<Progress value={50} variant="secondary" indicatorVariant="secondary" />\n<Progress value={75} variant="default" indicatorVariant="accent" />\n\n// Sizes\n<Progress value={70} size="sm" />\n<Progress value={70} size="md" />\n<Progress value={70} size="lg" />',
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
            <Skeleton size="banner" />
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
    code: '// Sizes\n<Skeleton size="sm" />\n<Skeleton size="default" />\n<Skeleton size="md" />\n<Skeleton size="lg" />\n\n// Shapes\n<Skeleton size="avatar" />\n<Skeleton size="icon" />\n<Skeleton size="thumbnail" />\n<Skeleton size="banner" />\n\n// Variants\n<Skeleton variant="default" />\n<Skeleton variant="card" />\n<Skeleton variant="primary" />\n\n// Custom\n<Skeleton className="h-4 w-full" />',
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
    description: 'Button with loading spinner state. Supports all Button variants and sizes.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="flex flex-wrap gap-2">
            <LoadingButton variant="default">Default</LoadingButton>
            <LoadingButton variant="secondary">Secondary</LoadingButton>
            <LoadingButton variant="destructive">Destructive</LoadingButton>
            <LoadingButton variant="outline">Outline</LoadingButton>
            <LoadingButton variant="ghost">Ghost</LoadingButton>
            <LoadingButton variant="link">Link</LoadingButton>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Loading States</p>
          <div className="flex flex-wrap gap-2">
            <LoadingButton variant="default">Normal</LoadingButton>
            <LoadingButton variant="default" loading>
              Loading...
            </LoadingButton>
            <LoadingButton variant="secondary" loading>
              Processing
            </LoadingButton>
            <LoadingButton variant="destructive" loading>
              Deleting
            </LoadingButton>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <LoadingButton size="sm" loading>Small</LoadingButton>
            <LoadingButton size="default" loading>Default</LoadingButton>
            <LoadingButton size="lg" loading>Large</LoadingButton>
          </div>
        </div>
      </div>
    ),
    imports: "import { LoadingButton } from '@components/ui';",
    code: '// Variants\n<LoadingButton variant="default">Default</LoadingButton>\n<LoadingButton variant="secondary">Secondary</LoadingButton>\n<LoadingButton variant="destructive">Destructive</LoadingButton>\n<LoadingButton variant="outline">Outline</LoadingButton>\n\n// Loading States\n<LoadingButton loading={isLoading}>Submit</LoadingButton>\n<LoadingButton variant="secondary" loading>Processing</LoadingButton>\n\n// Sizes\n<LoadingButton size="sm" loading>Small</LoadingButton>\n<LoadingButton size="lg" loading>Large</LoadingButton>',
    tags: ['ui', 'button', 'loading'],
  },
  {
    id: 'tooltip-button',
    title: 'TooltipButton',
    description: 'Button with integrated tooltip. Supports all Button variants and sizes.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="flex flex-wrap gap-2">
            <TooltipButton title="Default button tooltip" variant="default">
              Default
            </TooltipButton>
            <TooltipButton title="Secondary button tooltip" variant="secondary">
              Secondary
            </TooltipButton>
            <TooltipButton title="Destructive button tooltip" variant="destructive">
              Destructive
            </TooltipButton>
            <TooltipButton title="Outline button tooltip" variant="outline">
              Outline
            </TooltipButton>
            <TooltipButton title="Ghost button tooltip" variant="ghost">
              Ghost
            </TooltipButton>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="flex flex-wrap items-center gap-2">
            <TooltipButton title="Small button" variant="default" size="sm">
              Small
            </TooltipButton>
            <TooltipButton title="Default button" variant="default" size="default">
              Default
            </TooltipButton>
            <TooltipButton title="Large button" variant="default" size="lg">
              Large
            </TooltipButton>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">With Loading</p>
          <div className="flex flex-wrap gap-2">
            <TooltipButton title="Loading button" variant="default" loading>
              Loading
            </TooltipButton>
            <TooltipButton title="Processing" variant="secondary" loading>
              Processing
            </TooltipButton>
          </div>
        </div>
      </div>
    ),
    imports: "import { TooltipButton } from '@components/ui';",
    code: '// Variants\n<TooltipButton title="Tooltip text" variant="default">Default</TooltipButton>\n<TooltipButton title="Tooltip text" variant="secondary">Secondary</TooltipButton>\n<TooltipButton title="Tooltip text" variant="destructive">Destructive</TooltipButton>\n<TooltipButton title="Tooltip text" variant="outline">Outline</TooltipButton>\n\n// Sizes\n<TooltipButton title="Tooltip" size="sm">Small</TooltipButton>\n<TooltipButton title="Tooltip" size="lg">Large</TooltipButton>\n\n// With Loading\n<TooltipButton title="Loading" loading>Loading</TooltipButton>',
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
    description: 'Autocomplete field with searchable options.',
    demo: <CommandAutocompleteDemo />,
    imports: "import { Command, Popover, Button } from '@components/ui';\nimport { Check, ChevronsUpDown } from 'lucide-react';",
    code: `const [open, setOpen] = useState(false);
const [value, setValue] = useState('');

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<Popover open={open} onOpenChange={setOpen}>
  <Popover.Trigger asChild>
    <Button variant="outline" role="combobox" aria-expanded={open}>
      {value ? frameworks.find(f => f.value === value)?.label : 'Select...'}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content className="w-[200px] p-0">
    <Command>
      <Command.Input placeholder="Search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
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
              <Check className={\`mr-2 h-4 w-4 \${value === framework.value ? 'opacity-100' : 'opacity-0'}\`} />
              {framework.label}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  </Popover.Content>
</Popover>`,
    tags: ['ui', 'command', 'autocomplete', 'combobox'],
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
    description: 'Notification toasts with multiple variants: default, success, and destructive.',
    demo: <ToastDemo />,
    imports: "import { useToast } from '@hooks/shared';\nimport { Toaster } from '@components/shared';",
    code: `// In your App root
<Toaster />

// In your component
const { toast } = useToast();

// Default toast
toast({
  title: 'Default Toast',
  description: 'This is a default toast notification.',
  variant: 'default',
});

// Success toast
toast({
  title: 'Success!',
  description: 'Operation completed successfully.',
  variant: 'success',
});

// Destructive toast
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
    description: 'Group of toggle buttons with multiple variants and sizes.',
    demo: (
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Variants</p>
          <div className="space-y-3">
            <ToggleGroup type="single" defaultValue="center" variant="default">
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
            <ToggleGroup type="single" defaultValue="center" variant="outline">
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
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Sizes</p>
          <div className="space-y-3">
            <ToggleGroup type="single" defaultValue="center" size="sm">
              <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
              <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
              <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="center" size="default">
              <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
              <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
              <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="center" size="lg">
              <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
              <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
              <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
            </ToggleGroup>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Multiple Selection</p>
          <ToggleGroup type="multiple" defaultValue={['bold']}>
            <ToggleGroup.Item value="bold" aria-label="Toggle bold">Bold</ToggleGroup.Item>
            <ToggleGroup.Item value="italic" aria-label="Toggle italic">Italic</ToggleGroup.Item>
            <ToggleGroup.Item value="underline" aria-label="Toggle underline">Underline</ToggleGroup.Item>
          </ToggleGroup>
        </div>
      </div>
    ),
    imports: "import { ToggleGroup } from '@components/ui';",
    code: '// Variants\n<ToggleGroup type="single" variant="default" defaultValue="center">\n  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>\n  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>\n  <ToggleGroup.Item value="right">Right</ToggleGroup.Item>\n</ToggleGroup>\n\n<ToggleGroup type="single" variant="outline" defaultValue="center">\n  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>\n</ToggleGroup>\n\n// Sizes\n<ToggleGroup type="single" size="sm" defaultValue="center">...</ToggleGroup>\n<ToggleGroup type="single" size="default" defaultValue="center">...</ToggleGroup>\n<ToggleGroup type="single" size="lg" defaultValue="center">...</ToggleGroup>\n\n// Multiple Selection\n<ToggleGroup type="multiple" defaultValue={[\'bold\']}>\n  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>\n  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>\n</ToggleGroup>',
    tags: ['ui', 'toggle', 'input'],
  },
];
