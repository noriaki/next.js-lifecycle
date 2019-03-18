import React from 'react';
import Link from 'next/link';

import LoggedComponent from '../components/LoggedComponent';
import Content from '../components/Content';

import createLogger from '../lib/logger';

const context = 'pages/index.js';

export default class IndexPage extends LoggedComponent(context) {
  render () {
    const { isReqToServer } = this.props;
    const logger = createLogger(this.props);
    logger.add({
      context,
      method: 'render',
    });

    return (
      <div>
        <h1>Index page</h1>
        <Link href="/about">
          <a>Go to About page</a>
        </Link>
        <Content
          isReqToServer={isReqToServer}
          logs={logger.getAll()}
          done={this.state.done} />
      </div>
    );
  }
}
