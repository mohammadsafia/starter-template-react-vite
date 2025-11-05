import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@utils';
import { PaperclipIcon, XIcon } from 'lucide-react';
import { Conditional } from '@components/shared';

export type FileUploadMultiProps = PropsWithChildren<{
  inputProps: Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>;
  onChange: (files: File[]) => void;
  value?: File[];
  label?: ReactNode;
  error?: boolean;
}>;

export default function FileUploadMulti({ inputProps, onChange, value, label, error = false, children }: FileUploadMultiProps) {
  const { name, disabled, accept, ref } = inputProps;

  const onUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const existingFiles = value && Array.isArray(value) ? value : [];
    const updatedFiles = [...existingFiles, ...newFiles];
    onChange(updatedFiles);
    event.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    if (value && Array.isArray(value)) {
      const updatedFiles = value.filter((_: File, index: number) => index !== indexToRemove);
      onChange(updatedFiles);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const hasFiles = value && Array.isArray(value) && value.length > 0;

  return (
    <div data-slot="upload-file" className="relative w-full">
      <input
        ref={ref}
        accept={accept}
        type="file"
        id={`${name}-file-upload`}
        className="hidden"
        disabled={disabled}
        onChange={onUploadChange}
        multiple={true}
      />

      <label
        htmlFor={`${name}-file-upload`}
        className={cn(
          'border-primary relative flex min-h-[100px] cursor-pointer items-center justify-center gap-4 overflow-visible rounded-lg border border-dashed p-5',
          error && 'border-destructive text-destructive',
          disabled && 'cursor-not-allowed opacity-50',
          {
            'flex-col': label && typeof label === 'object',
          },
        )}
      >
        <PaperclipIcon size={24} />
        <p>{label || 'Click to upload files'}</p>
        {children}
      </label>

      <Conditional.If condition={!!hasFiles}>
        <div className="mt-4 space-y-2">
          {value?.map((file: File, index: number) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="h-8 w-8" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium whitespace-break-spaces text-gray-900" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="transition-color border-accent flex-shrink-0 cursor-pointer rounded-md border p-2.5 text-gray-400"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      </Conditional.If>
    </div>
  );
}
