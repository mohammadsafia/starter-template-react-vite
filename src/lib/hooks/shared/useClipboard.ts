import { useState, useCallback, useRef, useEffect } from 'react';

type UseClipboardOptions = {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function useClipboard(options: UseClipboardOptions = {}) {
  const {
    timeout = 2000,
    onSuccess,
    onError,
  } = options;

  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onSuccess?.();
      timeoutRef.current = setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Copy failed:', err);
      setCopied(false);
      onError?.(err);
    }
  }, [timeout, onSuccess, onError]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copied, copy };
}
