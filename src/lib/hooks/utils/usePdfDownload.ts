import { exportElementToPdf, ExportPdfOptions } from '@utils';
import { RefObject, useState } from 'react';

interface UsePdfDownloadReturn {
  isDownloading: boolean;
  downloadPdf: (options?: ExportPdfOptions) => Promise<void>;
  error: Error | null;
}

/**
 * Custom hook to download any HTML element as PDF
 * @param elementRef - React ref to the element you want to download
 * @param defaultOptions - Default PDF export options
 * @returns Object with isDownloading state, downloadPdf function, and error state
 *
 * @example
 * ```tsx
 * const sectionRef = useRef<HTMLDivElement>(null);
 * const { isDownloading, downloadPdf } = usePdfDownload(sectionRef);
 *
 * <div ref={sectionRef}>
 *   <YourContent />
 * </div>
 * <button onClick={() => downloadPdf({ filename: 'my-section' })}>
 *   Download PDF
 * </button>
 * ```
 */
export function usePdfDownload<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T | null>,
  defaultOptions?: ExportPdfOptions,
): UsePdfDownloadReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const downloadPdf = async (options?: ExportPdfOptions) => {
    if (!elementRef.current) {
      const err = new Error('Element reference not found');
      setError(err);
      console.error(err);
      return;
    }

    try {
      setIsDownloading(true);
      setError(null);

      await exportElementToPdf(elementRef.current, {
        ...defaultOptions,
        ...options,
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to download PDF');
      setError(error);
      console.error('PDF download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    downloadPdf,
    error,
  };
}
