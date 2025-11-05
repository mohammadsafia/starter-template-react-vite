import { exportReactComponentToPdf, ExportPdfOptions } from '@utils';
import { useState } from 'react';

interface UsePdfDownloadComponentReturn {
  isDownloading: boolean;
  downloadPdf: <T extends Record<string, any>>(Component: React.ComponentType<T>, props: T, options?: ExportPdfOptions) => Promise<void>;
  error: Error | null;
}

/**
 * Custom hook to download a React component as PDF without displaying it on the page
 *
 * @param defaultOptions - Default PDF export options (can be overridden per download)
 * @returns Object with isDownloading state, downloadPdf function, and error state
 *
 * @example
 * ```tsx
 * import { usePdfDownloadComponent } from '@hooks/shared';
 * import InvoiceTemplate from './InvoiceTemplate';
 *
 * function MyPage() {
 *   const { isDownloading, downloadPdf } = usePdfDownloadComponent({
 *     orientation: 'portrait',
 *     canvasScale: 2,
 *   });
 *
 *   const handleDownload = async () => {
 *     await downloadPdf(
 *       InvoiceTemplate,
 *       { invoiceNumber: '001', customer: 'John Doe' },
 *       { filename: 'invoice-001' }
 *     );
 *   };
 *
 *   return (
 *     <button onClick={handleDownload} disabled={isDownloading}>
 *       {isDownloading ? 'Downloading...' : 'Download Invoice'}
 *     </button>
 *   );
 * }
 * ```
 */
export function usePdfDownloadComponent(defaultOptions?: ExportPdfOptions): UsePdfDownloadComponentReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const downloadPdf = async <T extends Record<string, any>>(Component: React.ComponentType<T>, props: T, options?: ExportPdfOptions) => {
    try {
      setIsDownloading(true);
      setError(null);

      await exportReactComponentToPdf(Component, props, {
        ...defaultOptions,
        ...options,
      });

      console.log('PDF component downloaded successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to download PDF');
      setError(error);
      console.error('PDF component download failed:', error);
      throw error; 
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
