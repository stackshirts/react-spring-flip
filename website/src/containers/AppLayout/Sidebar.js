import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'
import './Sidebar.scss'

export default withRouter(class Sidebar extends Component {

  static propTypes = {}
  static defaultProps = {}

  render() {

    const {
      router
    } = this.props

    return (
      <div className="Sidebar card">
        <div
          style={{
            color: 'white'
          }}
          className="card-body bg-primary serif"
        >
          <Link
            href="/"
          >
            <a className="text-white">
              React spring flip
            </a>
          </Link>
        </div>
        <nav
          className="card-body"
        >
          <ul>
            <li>
              <Link href="/#using-flipkey">
                <a>
                  Using flipKey
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#on-mount-unmount">
                <a>
                  On mount/unmount
                </a>
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    )
  }
})
