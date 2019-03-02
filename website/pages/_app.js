import React from 'react'
import App, { Container } from 'next/app'
import AppLayout from 'src/containers/AppLayout/AppLayout'
import 'src/styles/styles.scss'

export default class MyApp extends App {

  render() {

    const { Component, pageProps } = this.props

    return (
      <Container>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Container>
    )
  }
}
