import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { User } from '../../infra/typeorm/entities/User';

@injectable()
class SendTokenConfirmationUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(user: User): Promise<void> {
    const {
      token: tokenToConfirmRegistration,
    } = await this.userTokensRepository.generate(user.id);

    const createAccountTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'create_account.hbs',
    );

    await this.mailProvider.sendMail({
      to: user.email,
      subject: '[MENTOI] Seja Bem vindo à nossa plataforma',
      templateData: {
        file: createAccountTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/confirm-registration?token=${tokenToConfirmRegistration}`,
        },
      },
    });
  }
}

export { SendTokenConfirmationUseCase };
