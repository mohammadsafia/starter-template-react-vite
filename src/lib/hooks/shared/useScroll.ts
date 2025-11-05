import { type UIEvent } from 'react';

type ScrollHandler = (args: { scrollTop: number; scrollPercentage: number }) => void;

export const useScroll = (handler: ScrollHandler) => {
  const onScrollEnd = <EL extends HTMLElement>(ev: UIEvent<EL>) => {
    const el = ev.target as HTMLElement;
    handler({ scrollTop: el.scrollTop, scrollPercentage: (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100 });
  };

  return {
    registerScrollHandlers: {
      onScrollEnd,
    },
  };
};
