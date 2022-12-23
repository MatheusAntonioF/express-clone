import dotenv from 'dotenv';

import Express from './core/express.class';
import { routes } from './routes';

dotenv.config();

const app = new Express();

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 ~ Server listening on port ${process.env.PORT}`);
});
