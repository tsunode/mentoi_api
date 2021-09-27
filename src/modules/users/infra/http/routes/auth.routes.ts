import { Router } from 'express';

import { ForgotPasswordController } from '../../../useCases/forgotPassword/ForgotPasswordController';
import { ResetPasswordController } from '../../../useCases/resetPassword/ResetPasswordController';
import { RefreshTokenController } from '../../../useCases/refreshToken/RefreshTokenController';
import { AuthValidators } from '../validators/Auth';

const authRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const refreshTokenController = new RefreshTokenController();

authRouter.post(
  '/forgot-password',
  AuthValidators.forgotPassword,
  forgotPasswordController.handle,
);

authRouter.post(
  '/reset-password',
  AuthValidators.resetPassword,
  resetPasswordController.handle,
);

authRouter.post('/refresh-token', refreshTokenController.handle);

export { authRouter };
