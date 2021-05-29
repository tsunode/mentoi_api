interface IMailConfig {
  driver: 'sendgrid';

  defaults: {
    from: {
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: process.env.DEFAULT_EMAIL || 'info@mentoi.app',
    },
  },
} as IMailConfig;
