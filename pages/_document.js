import Document, { Head, Html, Main, NextScript } from 'next/document'
import { siteTitle } from '../components/layout'

export default class CustomDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
