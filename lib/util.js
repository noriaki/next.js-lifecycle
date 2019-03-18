const isRequestToServer = ({ isReqToServer, req } = {}) => (
  isReqToServer || (!!req && !process.browser)
);

const isEvaluateOnClient = () => (typeof window !== 'undefined');

module.exports = {
  isRequestToServer,
  isEvaluateOnClient,
};
