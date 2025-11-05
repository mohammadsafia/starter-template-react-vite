import { Toast } from '@components/ui';

import { useToast } from '@hooks/shared';

function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1 w-full">
              {title && <Toast.Title className="text-center">{title}</Toast.Title>}

              {description && <Toast.Description>{description}</Toast.Description>}
            </div>

            {action}

            <Toast.Close />
          </Toast>
        );
      })}

      <Toast.Viewport />
    </Toast.Provider>
  );
}

export default Toaster;
