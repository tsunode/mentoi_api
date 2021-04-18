import 'dotenv/config';

import App from './app';

const app = new App();

app.server.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333!');
});
