const { isRequestToServer, isEvaluateOnClient } = require('./util');

class Logger {
  constructor (logs = [], ctx = {}) {
    this.logs = logs;
    this.isReqToServer = isRequestToServer(ctx);
  }

  add ({ context, method }) {
    this.logs.push({
      isReqToServer: this.isReqToServer,
      isEvalOnClient: isEvaluateOnClient(),
      context,
      method,
    });
  }

  clear () {
    this.logs.splice(0);
  }

  getAll () {
    return this.logs;
  }
}

const createLogger = (ctxOrProps = {}) => {
  let logger;
  if (ctxOrProps.res && ctxOrProps.res.logger) { // ctx.res.logger
    logger = ctxOrProps.res.logger;
  } else if (ctxOrProps.logs) { // props.logs
    logger = new Logger(ctxOrProps.logs, ctxOrProps);
  } else {
    logger = new Logger([], ctxOrProps);
  }
  return logger;
};

module.exports = createLogger;
