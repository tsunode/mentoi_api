import mailConfig from '@config/mail';
import sgMail from '@sendgrid/mail';

import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
class SendGridProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email } = mailConfig.defaults.from;

    const msg = {
      to,
      from: { email, name: 'Mentoi Info' },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    };

    await sgMail.send(msg);
  }
}

export { SendGridProvider };
