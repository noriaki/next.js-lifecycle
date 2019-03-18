import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import createLogger from '../lib/logger';

const context = 'pages/_document.js';

export default class MyDocument extends Document {
  static getInitialProps (ctx) {
    createLogger(ctx).add({
      context,
      method: 'getInitialProps',
    });

    let pageContext;
    const page = ctx.renderPage(Component => (
      (props) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      }
    ));

    return {
      ...page,
      pageContext,
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

    const { pageContext } = this.props;

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
