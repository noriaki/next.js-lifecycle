import React from 'react';
import Link from 'next/link';

import LoggedComponent from '../components/LoggedComponent';
import Content from '../components/Content';

import createLogger from '../lib/logger';

const context = 'pages/about.js';

export default class AboutPage extends LoggedComponent(context) {
  render () {
    const { isReqToServer } = this.props;
    const logger = createLogger(this.props);
    logger.add({
      context,
      method: 'render',
    });

    return (
      <div>
        <h1>About page</h1>
        <Link href="/">
          <a>Back to Index page</a>
        </Link>
        <Content isReqToServer={isReqToServer} logs={logger.getAll()} />
      </div>
    );
  }
}
