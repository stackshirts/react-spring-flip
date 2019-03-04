import React from 'react'
import Sidebar from 'src/containers/AppLayout/Sidebar'
import Refractor from 'react-refractor'
import js from 'refractor/lang/javascript'
import MetricsProvider from 'react-merge-metrics/lib/MetricsProvider'
import './AppLayout.scss'
import packageJson from 'react-spring-flip/package.json'

Refractor.registerLanguage(js)

export default function AppLayout({ children }) {


  return (
    <div className="container my-5 py-4">
      <div className="row">
        <div className="col-12 col-md-3 bd-sidebar">
          <Sidebar />
        </div>

        <main
          className="col-12 col-md-9 col-xl-8 pt-5 pb-3 pl-md-5 bd-content"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
