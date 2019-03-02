import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

Markdown.propTypes = {}
Markdown.defaultProps = {}

export default function Markdown({children}) {
  return (
    <ReactMarkdown
      className="markdown-body">
      {children}
    </ReactMarkdown>
  )
}

