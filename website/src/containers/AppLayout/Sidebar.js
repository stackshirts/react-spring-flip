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
          className="card-body bg-dark serif"
        >
          <Link
            href="/"
          >
            <a className="text-white">
              React merge down
            </a>
          </Link>
        </div>
        <nav
          className="card-body"
        >
          <ul>
            <li>
              <Link href="/how-it-works">
                <a>
                  How it works
                </a>
              </Link>
            </li>
            <li>
              <Link href="/components">
                <a>
                  Components
                </a>
              </Link>
            </li>
            <li className="p-0">
              <ul className="ml-3">
                <li>
                  <Link href="/components#metrics-provider">
                    <a>
                      MetricsProvider
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/components#add-properties">
                    <a>
                      AddProperties
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/components#pageview">
                    <a>
                      PageView
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/components#connect-metrics">
                    <a>
                      connectMetrics
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/components#render-metrics">
                    <a>
                      RenderMetrics
                    </a>
                  </Link>
                </li>

              </ul>
            </li>
          </ul>
        </nav>

      </div>
    )
  }
})
