import * as Rematrix from 'rematrix'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'

import { FlipElementBoundsType, FlipperContext, getBounds } from './Flipper'

interface Props {
  flipId: string;
  el?: string;
  style?: any;
  className?: string;
}

export type Matrix = number[]

export const convertMatrix3dArrayTo2dArray = (matrix: Matrix): Matrix =>
  [0, 1, 4, 5, 12, 13].map(index => matrix[index])

const Flip: React.FC<Props> = (props) => {

  const {
    flipId,
    el = 'div',
    style = {},
    className,
  } = props

  // const [position, setPosition] = positionSpring;
  // const [dimensions, setDimensions] = dimensionsSpring;

  const {
    flipBounds,
    register,
    flipperEl,
    debug,
    flipKey,
  } = useContext(FlipperContext)

  const stateRef = useRef<{
    prevBounds?: FlipElementBoundsType,
    nextBounds?: FlipElementBoundsType,
    nextMatrix?: Matrix,
  }>({})
  const flipRef = useRef<HTMLElement>(null)

  const [isAnimating, setAnimating] = useState(false)

  const [{ matrix }, setSpring] = useSpring(() => ({
    matrix: [1, 0, 0, 1, 0, 0],
    onRest: () => {
      if (!debug) {
        setAnimating(false)
      }
    }
  }))

  // Use useLayoutEffect because it will trigger before the browser paint.
  useLayoutEffect(() => {

    const prevBounds = flipBounds[flipId]
    const flipNode = flipRef.current;
    const flipperNode = flipperEl.current;

    // We only need to bother animating if we have prevBounds on this flipId
    // And flipperNode will not exist on first useLayoutEffect()
    if (prevBounds && flipNode && flipperNode) {
      const nextBounds = getBounds(flipNode, flipperNode)
      if (!nextBounds) {
        console.error(new Error('Make sure you wrapped your animation in a Flipper component'))
        return;
      }

      const {
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
      } = prevBounds


      let initialStyle = getComputedStyle(flipNode).transform;
      initialStyle = initialStyle !== 'none' ? initialStyle : 'matrix(1, 0, 0, 1, 0, 0)'
      const currentTransform = Rematrix.fromString(initialStyle)
      const transformsArray = [currentTransform]
      transformsArray.push(
        Rematrix.translateX(Math.round(offsetLeft - nextBounds.offsetLeft))
      )
      transformsArray.push(
        Rematrix.translateY(Math.round(offsetTop - nextBounds.offsetTop))
      )
      transformsArray.push(
        Rematrix.scaleX(
          Math.max(offsetWidth, 1) / Math.max(nextBounds.offsetWidth, 1)
        )
      )
      transformsArray.push(
        Rematrix.scaleY(
          Math.max(offsetHeight, 1) / Math.max(nextBounds.offsetHeight, 1)
        )
      )

      const prevMatrix = convertMatrix3dArrayTo2dArray(
        transformsArray.reduce(Rematrix.multiply)
      )
      const nextMatrix = convertMatrix3dArrayTo2dArray(currentTransform)

      setSpring({
        matrix: prevMatrix,
        immediate: true,
      })
      setAnimating(true)
      stateRef.current = {
        prevBounds,
        nextBounds,
        nextMatrix,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipKey])

  useEffect(() => {

    register(flipId, flipRef)

    if (!debug) {
      if (!stateRef.current.nextBounds) {
        return;
      }
      const {
        nextMatrix,
      } = stateRef.current

      setSpring({
        matrix: nextMatrix,
        immediate: false,
      })
    }
  }, [register, flipId, debug, setSpring])

  const Animated = (animated as any)[el]

  let animatedStyle = {}
  if (isAnimating) {
    animatedStyle = {
      // @ts-ignore
      transform: matrix.to((...vals: number[]) => `matrix(${vals.join(', ')})`),
    }
  }

  return (
    <Animated
      key={flipKey}
      ref={flipRef}
      className={className}
      style={{
        ...style,
        ...animatedStyle,
      }}
    />
  )
}

export default Flip
