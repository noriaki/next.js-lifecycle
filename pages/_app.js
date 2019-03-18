import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';

import { isRequestToServer } from '../lib/util';
import createLogger from '../lib/logger';

// Router.events.on('routeChangeStart', () => { createLogger().clear(); });

const context = 'pages/_app.js';

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    ctx.isReqToServer = isRequestToServer(ctx);
    createLogger(ctx).add({
      isReqToServer: ctx.isReqToServer,
      context,
      method: 'getInitialProps',
    });

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount () {
    createLogger(this.props.pageProps).add({
      context,
      method: 'componentDidMount',
    });
  }

  render () {
    const { Component, pageProps } = this.props;

    const logger = createLogger(pageProps);
    logger.add({
      context,
      method: 'render',
    });

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
