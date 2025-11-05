import { cn } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';

type ScrollSelectorProps = {
  options: { label: string; value: string | number; hide?: boolean }[];
  value: string | number;
  onSelect?: (val: string | number) => void;
  maxHeight?: number;
};

export default function ScrollSelector({ options, value, maxHeight = 140, onSelect }: ScrollSelectorProps) {
  const enabledOptions = useMemo(() => options.filter((o) => !o.hide), [options]);
  const [onIdx, setOnIdx] = useState(enabledOptions.map((o) => o.value).indexOf(value) ?? 0);
  const [elHeight, setElHeight] = useState(0);

  const container = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current) setElHeight(elRef.current.clientHeight);
  }, []);

  useEffect(() => {
    if (enabledOptions[onIdx]?.value !== undefined) onSelect?.(enabledOptions[onIdx].value);
  }, [onIdx]);

  useEffect(() => {
    if (elHeight && container.current) container.current.scrollTo({ top: onIdx * elHeight, behavior: 'smooth' });
  }, [elHeight]);

  useEffect(() => {
    const valIdx = enabledOptions.map((o) => o.value).indexOf(value);
    if (valIdx !== -1) manualSelect(valIdx);
    else {
      manualSelect(0);
      if (onIdx === 0 && enabledOptions.length > 0) {
        setOnIdx(0);
        onSelect?.(enabledOptions[0].value);
      }
    }
  }, [enabledOptions.length]);

  const onScrollEnd = (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!elHeight) return;
    const scroll = (ev.target as HTMLDivElement).scrollTop;
    setOnIdx(Math.round(scroll / elHeight));
  };

  const manualSelect = (idx: number, behavior: 'instant' | 'smooth' = 'smooth') => {
    if (!elHeight || !container.current) return;
    if (enabledOptions.length === 1) setOnIdx(0);
    container.current.scrollTo({ top: idx * elHeight, behavior });
  };

  return (
    <div
      className="no-scrollbar flex snap-y snap-mandatory flex-col overflow-y-scroll"
      onScrollEnd={onScrollEnd}
      ref={container}
      style={{ maxHeight }}
    >
      <div className="shrink-0" style={{ height: maxHeight / 2 - 1.5 * elHeight + 'px' }} />
      <div className="pointer-events-none snap-center p-1 opacity-0" ref={elRef} children="_" />
      {enabledOptions.map((option, i) => (
        <div
          key={option.value}
          className={cn('cursor-pointer snap-center p-1 transition-all', {
            'scale-y-[85%] opacity-50': Math.abs(i - onIdx) === 1,
            'scale-y-[70%] opacity-20': Math.abs(i - onIdx) > 1,
          })}
          onClick={() => manualSelect(i)}
        >
          {option.label}
        </div>
      ))}
      <div className="shrink-0" style={{ height: maxHeight / 2 - 0.5 * elHeight + 'px' }} />
    </div>
  );
}
