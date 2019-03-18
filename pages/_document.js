import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { isRequestToServer } from '../lib/util';
import createLogger from '../lib/logger';

const context = 'pages/_document.js';

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    ctx.isReqToServer = isRequestToServer(ctx);
    createLogger(ctx).add({
      context,
      method: 'getInitialProps',
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }

  componentDidMount () {
    createLogger(this.props).add({
      context,
      method: 'componentDidMount',
    });
  }

  render () {
    createLogger(this.props).add({
      context,
      method: 'render',
    });

    // const { pageContext } = this.props;

    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
