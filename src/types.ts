import { RefObject } from 'react';

export type FlipIdType = string | number;

export interface FlipElementBoundsType {
  offsetTop: number;
  offsetLeft: number;
  offsetHeight: number;
  offsetWidth: number;
}

export type FlipKeyType = string | number | null | undefined;
export type ContextType = {
  debug?: boolean;
  flipKey: FlipKeyType;
  flipRefs: {
    [flipIds: string]: RefObject<HTMLElement>
  };
  flipBounds: {
    [flipIds: string]: FlipElementBoundsType;
  }
  register: (flipId: FlipIdType, flipEl: RefObject<HTMLElement>) => void;
  flipperEl: RefObject<HTMLElement>;
}
