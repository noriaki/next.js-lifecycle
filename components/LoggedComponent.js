import { Component } from 'react';

import createLogger from '../lib/logger';

const createLoggedComponent = context => (
  class LoggedComponent extends Component {
    static async getInitialProps (ctx) {
      const logger = createLogger(ctx);
      logger.add({
        context,
        method: 'getInitialProps',
      });

      return {
        isReqToServer: ctx.isReqToServer,
        logs: logger.getAll(),
      };
    }

    static getDerivedStateFromProps (props) {
      const logger = createLogger(props);
      logger.add({
        context,
        method: 'getDerivedStateFromProps',
      });

      return { logs: logger.getAll() };
    }

    constructor (props) {
      super(props);
      const logger = createLogger(props);
      logger.add({
        context,
        method: 'constructor',
      });
      this.state = { logs: logger.getAll(), done: false };
    }

    shouldComponentUpdate (nextProps) {
      createLogger(nextProps).add({
        context,
        method: 'shouldComponentUpdate (and return `true`)',
      });
      return true;
    }

    getSnapshotBeforeUpdate () {
      return {
        context,
        method: 'getSnapshotBeforeUpdate',
      };
    }

    componentDidMount () {
      createLogger(this.props).add({
        context,
        method: 'componentDidMount (and `setState({ done: true })`)',
      });
      this.setState({ done: true });
    }

    componentDidUpdate (_, __, snapshot) {
      const logger = createLogger(this.props);
      if (snapshot !== null) { logger.add(snapshot); }
      logger.add({
        context,
        method: 'componentDidUpdate',
      });
    }

    componentWillUnmount () {
      const logger = createLogger(this.props);
      logger.add({
        context,
        method: 'componentWillUnmount',
      });
      console.log(`leave from ${context} | all logs below.`, logger.getAll());
    }
  }
);

export default createLoggedComponent;
