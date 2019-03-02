import React from 'react'
import Refractor from 'react-refractor'
import classnames from 'classnames'

export default function Code({ language = 'javascript', children, className }) {

  return (

    <Refractor
      language="js"
      className={classnames('language-javascript', className)}
      value={children}
    />
  )
}
