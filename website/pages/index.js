import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'src/components/Markdown'
import Code from 'src/components/Code'
import dynamic from 'next/dynamic'

const UsingFlipKey = dynamic(() => import('src/components/UsingFlipKey'), {
  loading: () => <p>...</p>,
  ssr: false
})
const OnMountUnmount = dynamic(() => import('src/components/OnMountUnmount'), {
  loading: () => <p>...</p>,
  ssr: false
})

Index.propTypes = {}
Index.defaultProps = {}

export default function Index(props) {

  return (
    <div>


      <h1 className="display-3 mb-3">
        React spring flip
      </h1>

      <p className="lead mb-5">
        A library to help you do flip animations.
        It uses
        {' '}
        <a href="https://github.com/react-spring/react-spring">
          <code>
            react-spring
          </code>
        </a>
        {' '}
        under the hood and requires react hooks (v16.8 or greater).
      </p>


      <h2 className="mb-4">
        Examples
      </h2>

      <section className="mb-5">

        <h3
          id="using-flipkey"
          className="mb-4"
        >
          Using
          {' '}
          <code>
            flipKey
          </code>
        </h3>


        <Markdown>
          The button will shuffle the cards and increment `flipCount` (in component state).
          We use the `flipKey` property on the `Flipper` component to tell it
          animate the transition between one layout and the next.
        </Markdown>

        <Code className="mb-4">
          {require('src/markdown/FlipKeyExample.md')}
        </Code>

        <UsingFlipKey />

      </section>

      <section className="mb-5">

        <h3
          id="on-mount-unmount"
          className="mb-4"
        >
          On mount/unmount
        </h3>


        <Markdown>
          In this example, we pretend we have two completely different DOM trees to render,
          by changing the `key` on the parent div container. If we DO NOT specify a
          `flipKey` property on `Flipper`, then it will animate the transition between `Flip`
          components when they mount/unmount.
        </Markdown>

        <Code className="mb-4">
          {require('src/markdown/OnMountUnmountExample.md')}
        </Code>


        <OnMountUnmount />

      </section>
    </div>
  )
}

