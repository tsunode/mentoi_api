import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { container } from 'tsyringe';

import { SendGridProvider } from './implementations/SendGridProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(SendGridProvider),
);
