import { useEffect, useRef } from 'react';
import type { Position, RefObject } from './types';

type UpdateFn = (pos: Position) => void;

export function useMeasurePosition(update: UpdateFn): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    update({
      row: ref.current.offsetHeight,
      column: ref.current.offsetWidth,
      top: ref.current.offsetTop,
      left: ref.current.offsetLeft,
    });
  });

  return ref;
}
