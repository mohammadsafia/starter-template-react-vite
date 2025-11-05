import type { ChangeEvent, ReactNode } from 'react';
import type { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';

import { Button } from '@components/ui';
import { Conditional } from '@components/shared';

import { cn } from '@utils';

import { LoaderIcon, PaperclipIcon, XCircleIcon } from 'lucide-react';
import { FormMessage } from '@components/forms';

export type UploadFileProps = ControllerRenderProps<FieldValues, string> & {
  accept?: string;
  isUploading?: boolean;
  error?: FieldError;
  label?: ReactNode;
  hidePreview?: boolean;
};

const ACCEPTED_IMAGE_TYPES = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'webp',
  'svg+xml',
  'tiff',
  'tif',
  'x-icon',
  'avif',
  'heic',
  'heif',
  'svg',
] as const;

function UploadFile({
  ref,
  name,
  value,
  label,
  disabled,
  accept = 'image/*',
  isUploading = false,
  error,
  onChange,
  hidePreview = false,
}: UploadFileProps) {
  const isImage = (file: File | string): boolean => {
    if (typeof file === 'string') return false;
    if (!file) return false;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type.toLowerCase();

    return ACCEPTED_IMAGE_TYPES.includes(fileExtension as any) || mimeType.startsWith('image/');
  };

  const onRemoveFile = () => {
    onChange('');
  };

  const onUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  const previewURL = value ? URL.createObjectURL(value) : '';

  const hasFile = !!value;
  const showPreview = !isUploading && previewURL && isImage(value);
  const showRemoveButton = hasFile && !disabled && !isUploading;

  return (
    <div data-slot="upload-file" className="relative w-full">
      <input
        ref={ref}
        accept={accept}
        type="file"
        id={`${name}-file-upload`}
        className="hidden"
        disabled={disabled || isUploading}
        onChange={onUploadChange}
      />

      <label
        htmlFor={`${name}-file-upload`}
        className={cn(
          'border-primary relative flex min-h-[100px] cursor-pointer items-center justify-center gap-4 overflow-visible rounded-lg border border-dashed p-5',
          error && 'border-destructive text-destructive',
          disabled && 'cursor-base-project opacity-50',
          {
            'flex-col': label && typeof label === 'object',
          },
        )}
      >
        <Conditional>
          <Conditional.If condition={isUploading}>
            <LoaderIcon size={24} className="animate-spin" />
          </Conditional.If>

          <Conditional.If condition={!!value}>
            <div className="flex flex-col items-center gap-2 pl-[150px] lg:flex-row lg:justify-center lg:pr-9">
              <p title={value?.name} className="max-w-[60%] overflow-hidden text-ellipsis">
                {value?.name ?? label}
              </p>

              <p className="text-sm">{(+(value?.size ?? 0) / 1024).toFixed(2)} KB</p>
            </div>
          </Conditional.If>

          <Conditional.Else>
            <PaperclipIcon size={24} />

            <p>{label}</p>
          </Conditional.Else>
        </Conditional>

        <FormMessage hidden={!error} error={error!} />
      </label>

      <Conditional.If condition={!!showPreview && !hidePreview}>
        <div className="absolute inset-y-0 start-[40px] flex items-center justify-center">
          <img
            src={previewURL}
            alt="Upload Preview"
            className="aspect-square h-[80px] w-[130px] rounded-lg border border-gray-200 object-cover"
          />
        </div>
      </Conditional.If>

      <Conditional.If condition={showRemoveButton}>
        <div className="absolute end-[1%] top-1/2 z-10 -translate-y-1/2">
          <Button variant="outline" size="icon" type="button" onClick={onRemoveFile}>
            <XCircleIcon size={20} />
          </Button>
        </div>
      </Conditional.If>
    </div>
  );
}

export default UploadFile;
