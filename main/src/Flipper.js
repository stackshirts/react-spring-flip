import React, { useRef, createContext, useEffect } from 'react'

export const FlipperContext = createContext()

Flipper.propTypes = {}

export default function Flipper({ children, debug, flipKey }) {

  const ownRef = useRef({
    flips: {},
  })

  const register = (flipId, prevBounds) => {
    ownRef.current.flips[flipId] = prevBounds
  }

  /**
   * So, in the Flip component, we register a component when it gets unmounted.
   * And, in a useLayoutEffect, we get the old bounds (before a paint).
   * This useEffect, will run after the paint and remove old bounds from ownRef
   * so that it doesn't cause bad flips later!
   */
  useEffect(() => {
    if (flipKey === void 0) {
      ownRef.current.flips = {}
    }
  })

  return (
    <FlipperContext.Provider
      value={{
        ...ownRef.current,
        debug,
        flipKey,
        register,
      }}
    >
      {children}
    </FlipperContext.Provider>
  )
}

