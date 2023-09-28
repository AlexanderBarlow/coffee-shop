const { Request } = require('express');
const jwt = require('jsonwebtoken');
const { IUser } = require('../models/User');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

// Define a custom interface that extends Express.Request
class AuthenticatedRequest extends Request {
  constructor() {
    super();
    this.user = undefined;
  }
}

const authMiddleware = function (req) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

const signToken = function ({ email, _id }) {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  AuthenticatedRequest,
  authMiddleware,
  signToken,
};
