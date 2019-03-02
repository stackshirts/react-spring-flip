import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useEffect,
  createContext,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { FlipperContext } from './Flipper'
import { useSpring, animated, config } from 'react-spring'

export const FlipContext = createContext()

export default React.forwardRef(Flip)

Flip.propTypes = {}
Flip.defaultProps = {}

function Flip(props, ref) {

  const {
    flipId,
    el = 'div',
    positionSpring,
    dimensionsSpring,
    style = {},
    dimensionsOnly,
    positionOnly,
    ...otherProps
  } = props

  const context = useContext(FlipperContext)

  const ownRef = useRef()

  const flipRef = ref || useRef()

  const [isAnimating, setAnimating] = useState(0)

  const [{ xy, width, height }, set] = useSpring(() => ({
    xy: [0, 0],
    height: 0,
    width: 0,
    config: config.stiff,
    onRest: () => {
      if (!context.debug) {
        setAnimating(0)
      }
    }
  }))

  /**
   * Use useLayoutEffect because it will trigger before
   * the browser paint.
   *
   * We are only running this if we have a prevBounds
   */
  useLayoutEffect(() => {

    const prevBounds = context.flips[flipId]
    /** ^^^^
     * Not sure when but sometimes lastRef exists but not lastRef.current.
     * Keep this in mind.
     */

    if (prevBounds) {
      const nextBounds = flipRef.current.getBoundingClientRect()

      const x = nextBounds.x - prevBounds.x
      const y = nextBounds.y - prevBounds.y

      const {
        width,
        height,
      } = prevBounds

      if (positionSpring) {
        positionSpring.set({
          xy: [-x, -y],
          immediate: true,
        })
      }
      if (dimensionsSpring) {
        dimensionsSpring.set({
          width,
          height,
          immediate: true,
        })
      }
      set({
        xy: [-x, -y],
        width,
        height,
        immediate: true,
      })
      setAnimating(1)
      ownRef.current = {
        prevBounds,
        nextBounds,
      }
    }

    if (context.flipKey !== void 0) {
      const prevBounds = flipRef.current.getBoundingClientRect()
      context.register(flipId, prevBounds)
    }

    return () => {
      if (flipRef.current) {
        const prevBounds = flipRef.current.getBoundingClientRect()
        context.register(flipId, prevBounds)
      }
    }
  }, [context.flipKey])

  useEffect(() => {
    if (!context.debug && ownRef.current) {
      const {
        width,
        height,
      } = ownRef.current.nextBounds

      if (positionSpring) {
        positionSpring.set({
          xy: [0, 0],
          immediate: false,
        })
      }

      if (dimensionsSpring) {
        dimensionsSpring.set({
          width,
          height,
          immediate: false,
        })
      }

      set({
        xy: [0, 0],
        width,
        height,
        immediate: false,
      })
    }
  }, [context.flipKey])

  const Animated = animated[el]

  const animatedStyle = {}
  const both = !dimensionsOnly && !positionOnly

  if (isAnimating) {
    if (both || dimensionsOnly) {
      animatedStyle.width = (dimensionsSpring && dimensionsSpring.width || width).interpolate(Math.round)
      animatedStyle.height = (dimensionsSpring && dimensionsSpring.height || height).interpolate(Math.round)
    }
    if (both || positionOnly) {
      animatedStyle.transformOrigin = 'top left'
      animatedStyle.transform = (positionSpring ? positionSpring.xy : xy).interpolate((x, y) => {
        return `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`
      })
    }
  }

  /**
   * TODO: This function runs alot...
   */
  return (
    <Animated
      ref={flipRef}
      style={{
        ...style,
        ...animatedStyle,
      }}
      {...otherProps}
    />
  )
}
