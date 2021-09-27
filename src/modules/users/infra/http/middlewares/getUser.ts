import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { USER_PERMISSION } from '@modules/users/constants/UserPermission';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: USER_PERMISSION;
}

export function getUser(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, role } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch (error) {
    return next();
  }
}
