import { Request } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

interface UserData {
  email: string;
  _id: string;
}

// Define a custom interface that extends Express.Request
interface AuthenticatedRequest extends Request {
  user?: UserData;
}

export const authMiddleware = (req: AuthenticatedRequest): AuthenticatedRequest => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()!.trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as {
      data: UserData;
    };
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = ({ email, _id }: UserData): string => {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
