export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
  jwtRefresh: {
    secret: process.env.APP_SECRET_REFRESH || 'default',
    expiresIn: 1000 * 60 * 60 * 24 * 7,
  },
};
