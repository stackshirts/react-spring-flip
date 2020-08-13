import React, { createContext, useEffect, useMemo, useRef } from 'react'
import { ContextType, FlipIdType, FlipKeyType } from './types';
import { getBounds } from './utils';

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
    register: (flipId: FlipIdType, flipRef) => {
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
