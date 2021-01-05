import { PropType } from '../models/prop-type';

export const toDictionaryComplex = <T, P extends keyof T>(
  array: T[],
  field: P
): Map<PropType<T, P>, T> => {
  return array.reduce((acc: Map<PropType<T, P>, T>, current: T, index: number) => {
    acc.set(current[field] as any, current);
    return acc;
  }, new Map<PropType<T, P>, T>());
};


export const toDictionarySimple = <T>(
  array: T[]
): Map<T, boolean> => {
  return array.reduce((acc: Map<T, boolean>, current: T, index: number) => {
    acc.set(current, true);
    return acc;
  }, new Map<T, boolean>());
};
