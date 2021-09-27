import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { USER_PERMISSION } from '@modules/users/constants/UserPermission';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: USER_PERMISSION;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 403);
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
    console.error(error);
    throw new AppError('Invalid JWT token', 403);
  }
}
