const pushNotificationConfig = {
  basepath: process.env.PUSH_NOTIFICATION_BASE_PATH || '',
  token: process.env.PUSH_NOTIFICATION_TOKEN || '',
  appId: process.env.PUSH_NOTIFICATION_APP_ID || '',
};

export { pushNotificationConfig };
