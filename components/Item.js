import React from 'react';

const generateKey = ({
  isReqToServer,
  isEvalOnClient,
  context,
  method,
  i,
}) => [
  isReqToServer ? 'reqToServer' : 'reqToClient',
  isEvalOnClient ? 'evalOnClient' : 'evalOnServer',
  context,
  method,
  i,
].join('-');

const Item = ({ isReqToServer, isEvalOnClient, context, method, i }) => {
  const text = [
    `req: ${isReqToServer ? 'server' : 'client'}`,
    `eval: ${isEvalOnClient ? 'client' : 'server'}`,
    `[${context}]`,
    method,
  ].join(', ');

  return <li>{ text }</li>;
};

Item.generateKey = generateKey;

export default Item;
