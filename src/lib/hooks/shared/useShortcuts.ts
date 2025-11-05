import { useEffect } from 'react';

export type KeyMap = {
  [key: string]: () => void;
};

export const useShortcuts = (keyMap: KeyMap, enabled = true) => {
  const keyPressHandler = (ev: KeyboardEvent) => {
    if (document.activeElement?.tagName?.toLowerCase() === 'input') return;
    let key = ev.key;
    if (ev.shiftKey) key = `shift+${key}`;
    if (ev.ctrlKey) key = `ctrl+${key}`;
    const callback = keyMap[key];
    if (!callback) return;
    callback();
  };

  useEffect(() => {
    if (enabled) document.addEventListener('keyup', keyPressHandler);
    return () => document.removeEventListener('keyup', keyPressHandler);
  }, [keyMap, enabled]);
};
