import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.cookies;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const {
      token,
      refreshToken: newRefreshToken,
      refreshTokenExpiration,
    } = await refreshTokenUseCase.execute(refreshToken);

    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      expires: refreshTokenExpiration,
    });

    return response.json({ token });
  }
}

export { RefreshTokenController };
