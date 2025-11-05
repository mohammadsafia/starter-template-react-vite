# React Component Organization Standard

## Core Principles

The file organization idea is to group by categories, with each group in a separate section. The main principle is to arrange code from third-party/external elements to component-specific elements.

## Import Structure

Imports should be organized in the following order:

1. **Core imports** - Framework essentials that make the component work:

   - React, react-router-dom, etc.

2. **Third party imports** - External libraries that enable component functionality:

   - zod, react-hook-form, etc.

3. **UI imports** - UI component libraries and base UI elements:

   - UI Framework components (MUI, Radix, etc.)
   - Basic UI elements from your design system (Button, Input, etc.)

4. **Shared/Utility component imports** - Reusable compound components:

   - PrimeDialog components, PrimeModals, Layout components
   - Form containers and From Components
   - Other utility wrappers

5. **Views/Feature component imports** - Domain-specific components:

   - Business logic components specific to features
   - Form implementations for specific entities

6. **Contexts, Hooks imports**:

   - Contexts should come first
   - Utility or shared hooks next
   - Component-specific hooks (mutations/queries) last
   - Examples: useSomeContext, useToast, useUpdateTaskCategoryMutation, etc.

7. **Function Utils, Constants, Configs imports**:

   - Utility functions should come first
   - Constants next
   - Routes, Configs (mutations/queries) last

8. **Icons imports**:

   - All icon imports

9. **Types imports**:
   - TypeScript types and interfaces

## Component In-Place Structure

Before the component function:

1. **Component defined types**:

   - Props interfaces, local types

2. **Component Constants or Utility functions**:
   - Constants used in the component like filters, default values
   - Specific helper functions for this component

## Component Main Function Structure

Inside the component function, organize in this order:

1. **Core hooks** not directly related to the component:

   - useNavigate, useLocation, useParams, etc.

2. **Contexts**:

   - Context hooks and providers

3. **External utility hooks** not specific to the component:

   - Shared hooks, utility hooks: useToast, useDate, etc.

4. **Component-specific hooks**:

   - Mutations/queries
   - Form hook (since its usage is defined for this component)

5. **Component state**:

   - useState declarations grouped together

6. **Variables and computed values**:

   - Constants for calculations
   - useMemo statements (considered computed values)

7. **Function callbacks** used in the component:

   - onSubmit, onChange, onClick, etc.

8. **Component Effects**:

   - useEffect hooks should be the last logic before the return statement
   - Sort by execution priority (what runs first to last)
   - Effects that run only once should be first
   - Effects that run on every render should be last

9. **Component return statement**:

   - Include empty lines between sibling elements at the same level to improve readability

10. **Component export statement**:
    - Components should always be exported as default
    - If named exports are needed, handle this in the index file
    - The index file controls whether components are exported as default or named exports

## Notes

**Sometimes it's better to use props directly from the props object when:**

- There are too many props
- Props might overlap with component variants and constants defined within the component

**Each group is mentioned in the order they should be organized. The idea is to have a clear structure that allows developers to quickly find what they need and understand the component's organization.**

**Spacing between groups is important for readability. Use empty lines to separate different sections of the code (essential).**

## Example

```tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'ui-components';
import { PrimeDialog } from 'shared-components';
import { FormContainer } from 'form-components';
import { BusinessComponent } from 'views-components';

import { useSomeContext } from 'contexts';
import { useToast } from 'hooks/shared';
import { useUpdateTaskCategoryMutation } from 'hooks/mutations';
import { TASK_CATEGORIES } from 'constants';

import { TaskCategory } from 'some-types';

const TaskCategoryForm = () => {
  // Core hooks
  const navigate = useNavigate();

  // Contexts
  const { someContextValue } = useSomeContext();

  // External utility hooks
  const { showToast } = useToast();

  // Component-specific hooks
  const { mutate: updateTaskCategory } = useUpdateTaskCategoryMutation();

  // Component state
  const [isOpen, setIsOpen] = useState(false);

  // Variables and computed values Group
  const taskCategories = TASK_CATEGORIES;

  const someComputedValue = useMemo(() => {
    return taskCategories.filter((category) => category.isActive);
  }, [taskCategories]);

  // Function callbacks Group by usage in the component
  const onSubmit = (data: TaskCategory) => {
    updateTaskCategory(data);
    showToast('Task category updated successfully');
    setIsOpen(false);
  };

  // Component Effects Grouped by execution priority
  // Run once when the component mounts
  useEffect(() => {
    // Some initialization logic
  }, []);

  // Run when someCondition changes
  useEffect(() => {
    if (someCondition) {
      setIsOpen(true);
    }
  }, [someCondition]);

  return (
    <PrimeDialog open={open}>
      <Button onClick={() => setIsOpen(true)}>Edit Task Category</Button>
      {/* Empty lines between sibling elements of the same level for improved readability \n */}
      <FormContainer>
        <BusinessComponent />
        {/* Empty lines between sibling elements of the same level for improved readability \n */}
        <Button>Save</Button>
      </FormContainer>
    </PrimeDialog>
  );
};

export default TaskCategoryForm;
```


---

## Components Gallery & Docs

- Public route: `/components`
- Purpose: showcase UI, Forms, and Tables with live demos and copyable usage.

### Add or edit docs entries

1. Open `src/pages/components/components.data.tsx`.
2. Add a `ComponentDoc` object to one of the arrays: `uiDocs`, `formDocs`, or `tableDocs`.

```ts
export type ComponentDoc = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  demo?: React.ReactNode;      // live example (JSX)
  code?: string;               // usage snippet to copy
  imports?: string;            // optional import lines to copy
};
```

Example (UI Button):

```tsx
import { Button } from '@components/ui';

uiDocs.push({
  id: 'button',
  title: 'Button',
  demo: (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  ),
  imports: "import { Button } from '@components/ui';",
  code: '<Button>Default</Button>\n<Button variant="secondary">Secondary</Button>',
});
```

The gallery page uses `DocCard` and `CodePreview` to render each item consistently.


## Version Control & Maintenance

This standard document is maintained by the team leads and will be updated as our practices evolve. All updates will be communicated to the team and versioned with:

- Version: 2.0
- Last Updated: [Nov 3, 2025]