import dotenv from 'dotenv';

import Express from './core';

dotenv.config();

const app = new Express();

// app.use();

app.server.listen(process.env.PORT, () => {
  console.log(`🚀 ~ Server listening on port ${process.env.PORT}`);
});
