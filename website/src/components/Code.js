import React from 'react'
import Refractor from 'react-refractor'

export default function Code({ language = 'javascript', children }) {

  return (

    <Refractor
      language="js"
      className="language-javascript"
      value={children}
    />
  )
}
