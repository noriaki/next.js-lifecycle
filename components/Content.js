import React, { Component } from 'react';

import createLogger from '../lib/logger';

import Item from './Item';

const context = 'components/Content.js';

export default class Content extends Component {
  static async getInitialProps (ctx) {
    // never call
    createLogger(ctx).add({
      context,
      method: 'getInitialProps',
    });
  }

  componentDidMount () {
    const logger = createLogger(this.props);
    logger.add({
      context,
      method: 'componentDidMount',
    });
  }

  render () {
    const logger = createLogger(this.props);
    logger.add({
      context,
      method: 'render',
    });

    const contents = logger.getAll();
    const renderContent = (args, i) => {
      const props = { ...args, i };
      const key = Item.generateKey(props);
      return <Item key={key} {...props} />;
    };

    return (
      <div>
        <p>This is Next.js component lifecycle logs</p>
        <ol>
          { contents.map(renderContent) }
        </ol>
      </div>
    );
  }
}
