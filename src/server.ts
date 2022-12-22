import dotenv from 'dotenv';

import express from './core';

dotenv.config();

express.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT);
});
