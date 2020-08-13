`react-spring-flip`

<br />

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/react-spring-flip">
    <img alt="" src="https://badgen.net/npm/v/react-spring-flip">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=react-spring-flip">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/react-spring-flip">
  </a>
  <a aria-label="License" href="https://github.com/zeit/swr/blob/master/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/react-spring-flip">
  </a>
</p>


## Introduction

The `react-spring-flip` package provides easy FLIP animations in React using the `react-spring` library. So, if you're already using react-spring, then this is a very lite addition to your bundle.

**TODO: Determine incremental size of library when already using `react-spring`**

## Forkable Examples

### Simple Example: An Expanding Div

<a href="https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/expanding-div">
<img src="http://raw.githubusercontent.com/stackshirts/react-spring-flip/master/example-assets/square.gif" height="200px" alt="animated square" />
</a>

[Fork this example on Code Sandbox](https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/expanding-div)


```jsx
import React, { useState } from 'react'
import { Flip, Flipper } from 'react-spring-flip';

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const toggleFullScreen = () => setFullScreen(prevState => !prevState)

  return (
    <Flipper flipKey={fullScreen}>
      <Flip
        flipId="square"
        className={fullScreen ? 'full-screen-square' : 'square'}
        onClick={toggleFullScreen}
      />
    </Flipper>
  )
}
```

### Simple Example: Two Divs

<a href="https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/different-divs">
<img src="http://raw.githubusercontent.com/stackshirts/react-spring-flip/master/example-assets/2squares.gif" height="200px" alt="2 animated squares" />
</a>

[Fork this example on Code Sandbox](https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/different-divs)

```jsx
import React, { useState } from 'react'
import { Flipper, Flip } from 'react-flip-toolkit'

const Square = ({ toggleFullScreen }) => (
  <Flip flipId="square" className="square" onClick={toggleFullScreen} />
)

const FullScreenSquare = ({ toggleFullScreen }) => (
  <Flip flipId="square" className="full-screen-square" onClick={toggleFullScreen} />
)

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const toggleFullScreen = () => setFullScreen(prevState => !prevState)

  return (
    <Flipper flipKey={fullScreen}>
      {fullScreen ? (
        <FullScreenSquare toggleFullScreen={toggleFullScreen} />
      ) : (
        <Square toggleFullScreen={toggleFullScreen} />
      )}
    </Flipper>
  )
}
```

### Simple Example: List Shuffle

<a href="https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/list-shuffling">
<img src="http://raw.githubusercontent.com/stackshirts/react-spring-flip/master/example-assets/listshuffle.gif" height="60px" alt="shuffling a list" />
</a>

[Fork this example on Code Sandbox](https://codesandbox.io/s/github/stackshirts/react-spring-flip/tree/master/examples/list-shuffling)

```jsx
import React, { useState } from 'react'
import { Flip, Flipper } from 'react-spring-flip';
import shuffle from 'lodash/shuffle';

const ListShuffler = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const shuffleList = () => setData(shuffle(data))

  return (
    <Flipper flipKey={data.join('')}>
      <button onClick={shuffleList}> shuffle</button>
      <ul className="list">
        {data.map(d => (
          <Flip el="li" key={d} flipId={d}>
            {d}
          </Flip>
        ))}
      </ul>
    </Flipper>
  )
}
```


## Quick Start

Inside your React project directory, run the following:

```
yarn add react-spring-flip
```

Or with npm:

```
npm install react-spring-flip
```

## The Components

### `Flipper`

The parent wrapper component that contains all the elements to be animated. You'll often need only one of these per page, but sometimes it will be more convenient to have multiple `Flipper` regions of your page concerned with different transitions.

```jsx
<Flipper flipKey={someKeyThatChanges}>{/* children */}</Flipper>
```

#### Basic Props

| prop    |  default   | type        |  details    |
|--- |:--- |:----|:---|
| flipKey **(required)**  |     -      | `string`, `number`, `bool` | Changing this tells `react-flip-toolkit` to transition child elements wrapped in `Flip` components. |
| children **(required)** |     -      | `node`                     | One or more element children |

** TODO: Enable custom "spring" passed as prop** 


### `Flip`

Wraps an element that should be animated.

E.g. in one component you can have

```jsx
<Flip flipId="coolDiv">
  <div className="small" />
</Flip>
```

and in another component somewhere else you can have

```jsx
<Flip flipId="coolDiv">
  <div className="big" />
</Flip>
```

and they will be tweened by `react-spring-flip`.

| prop    |  default   | type        |  details    |
| :-------- | :--- | :---- | :--- |
| flipId **(required unless inverseFlipId is provided)** | - | `string`  | Use this to tell `react-spring-flip` how elements should be matched across renders so they can be animated. |
| el | 'div' | `string` | the HTML element to render in place of the `Flip` component |
