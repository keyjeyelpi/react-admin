import { useState, useRef, useEffect } from "react";

type CardProps<T> = T & {
  id: string;
  content?: React.ReactNode | ((isSelected: boolean) => void);
};

export function arrayMoveMutable<T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): void {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable<T>(
  array: CardProps<T>[],
  fromIndex: number,
  toIndex: number
): CardProps<T>[] {
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
}

export function clamp(min: number, max: number, v: number): number {
  return Math.min(Math.max(v, min), max);
}

export function distance(a: number, b: number): number {
  return Math.abs(a - b);
}

interface Position {
  top: number;
  left: number;
  column: number;
  row: number;
}

type UpdatePositionFn = (index: number, offset: Position) => void;
type UpdateOrderFn = (
  index: number,
  dragXOffset: number,
  dragYOffset: number
) => void;

export function usePositionReorder<T>(
  initialState: CardProps<T>[]
): [T[], UpdatePositionFn, UpdateOrderFn] {
  const [order, setOrder] = useState<CardProps<T>[]>(initialState);
  const positions = useRef<Position[]>([]).current;

  const updatePosition: UpdatePositionFn = (i, offset) => {
    positions[i] = offset;
  };

  const updateOrder: UpdateOrderFn = (i, dragXOffset, dragYOffset) => {
    const targetIndex = findIndex(i, dragXOffset, dragYOffset, positions);
    if (targetIndex !== i) setOrder(arrayMoveImmutable(order, i, targetIndex));
  };

  useEffect(() => {
    setOrder((prevOrder) =>
      prevOrder.map((item) => {
        const found = initialState.find((initItem) => initItem.id === item.id);
        return found ? { ...item, content: found.content } : item;
      })
    );
  }, [initialState]);

  return [order, updatePosition, updateOrder];
}

const buffer = 0;

export const findIndex = (
  i: number,
  xOffset: number,
  yOffset: number,
  positions: Position[]
): number => {
  let target = i;
  const { top, column, row, left } = positions[i];
  const bottom = top + row;
  const right = left + column;

  if (yOffset < 0 && Math.abs(yOffset) > Math.abs(xOffset)) {
    const prevItem = positions[i - 3];
    if (!prevItem) return i;
    const prevBottom = prevItem.top + prevItem.row;
    const ySwapOffset = distance(top, prevBottom - prevItem.row / 2) + buffer;
    if (yOffset < -ySwapOffset) target = i - 3;
  } else if (yOffset > 0 && Math.abs(yOffset) > Math.abs(xOffset)) {
    const nextItem = positions[i + 3];
    if (!nextItem) return i;
    const ySwapOffset =
      distance(bottom, nextItem.top + nextItem.row / 2) + buffer;
    if (yOffset > ySwapOffset) target = i + 3;
  } else if (xOffset < 0 && Math.abs(xOffset) > Math.abs(yOffset)) {
    const prevItem = positions[i - 1];
    if (!prevItem) return i;
    const prevRight = prevItem.left + prevItem.column;
    const xSwapOffset =
      distance(left, prevRight - prevItem.column / 2) + buffer;
    if (xOffset < -xSwapOffset) target = i - 1;
  } else if (xOffset > 0 && Math.abs(xOffset) > Math.abs(yOffset)) {
    const nextItem = positions[i + 1];
    if (!nextItem) return i;
    const xSwapOffset =
      distance(right, nextItem.left + nextItem.column / 2) + buffer;
    if (xOffset > xSwapOffset) target = i + 1;
  }

  return clamp(0, positions.length, target);
};
