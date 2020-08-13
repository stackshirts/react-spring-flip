import React, { createContext, RefObject, useEffect, useMemo, useRef } from 'react'

export const getBounds = (flipNode: HTMLElement, flipperNode: HTMLElement): FlipElementBoundsType => {
  let el = flipNode;
  let offsetLeft = 0;
  let offsetTop = 0;
  let offsetHeight = el.offsetHeight;
  let offsetWidth = el.offsetWidth;

  while (el && el !== flipperNode) {
    offsetLeft += el.offsetLeft;
    offsetTop += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }
  // if (!el) {
  //   return;
  // }
  return {
    offsetLeft,
    offsetTop,
    offsetHeight,
    offsetWidth,
  }
}

export interface FlipElementBoundsType {
  offsetTop: number;
  offsetLeft: number;
  offsetHeight: number;
  offsetWidth: number;
}

type FlipKeyType = string | number | null | undefined;

type ContextType = {
  debug?: boolean;
  flipKey: FlipKeyType;
  flipRefs: {
    [flipIds: string]: RefObject<HTMLElement>
  };
  flipBounds: {
    [flipIds: string]: FlipElementBoundsType;
  }
  register: (flipId: string, flipEl: RefObject<HTMLElement>) => void;
  flipperEl: RefObject<HTMLElement>;
}

export const FlipperContext = createContext<ContextType>({} as ContextType)

interface Props {
  debug?: boolean;
  flipKey: FlipKeyType;
}

const Flipper: React.FC<Props> = (props) => {

  const {
    children,
    debug,
    flipKey
  } = props;

  const flipperEl = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<Omit<ContextType, 'flipKey'>>({
    debug,
    flipperEl,
    flipRefs: {},
    flipBounds: {},
    register: (flipId: string, flipRef) => {
      if (flipperRef.current.flipRefs[flipId]) {
        console.log('flipperRef.current.flipRefs', flipperRef.current.flipRefs);
        const e = new Error('You cannot have two Flip components with the same flipId under the same Flipper component');
        if (process.env.NODE_ENV === 'production') {
          console.error(e)
        }
        else {
          throw e;
        }
        return;
      }
      flipperRef.current.flipRefs[flipId] = flipRef;
    }
  })

  const context = useMemo(() => {

    // Will this change before nested DOM unmounts?
    Object.keys(flipperRef.current.flipRefs).forEach((flipId) => {
      if (flipKey) {
        const flipRef = flipperRef.current.flipRefs[flipId];
        const bounds = getBounds(flipRef.current!, flipperEl.current!);
        if (bounds) {
          flipperRef.current.flipBounds[flipId] = bounds;
        }
      }
      else {
        // Destroy everything!
        Object.keys(flipperRef.current.flipBounds).forEach((flipId) => {
          delete flipperRef.current.flipBounds[flipId]
        })
      }
      delete flipperRef.current.flipRefs[flipId];
    })

    return {
      ...flipperRef.current,
      flipKey,
    }
  }, [flipKey])


  /**
   * So, in the Flip component, we register a component when it gets unmounted.
   * And, in a useLayoutEffect, we get the old bounds (before a paint).
   * This useEffect, will run after the paint and remove old bounds from ownRef
   * so that it doesn't cause bad flips later!
   */
  useEffect(() => {
    flipperRef.current.flipBounds = {}
  })

  return (
    <FlipperContext.Provider value={context}>
      <div
        style={{
          position: 'relative',
        }}
        className="Flipper"
        ref={flipperEl}
      >
        {children}
      </div>
    </FlipperContext.Provider>
  )
}

Flipper.propTypes = {}

export default Flipper;
