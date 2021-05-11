/* eslint-disable class-methods-use-this */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

import { resetServerContext } from 'react-beautiful-dnd'

// interface DocumentProps {
//   readonly ids: readonly string[]
//   readonly css: string
// }

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    resetServerContext()
    return { ...initialProps }
  }
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
