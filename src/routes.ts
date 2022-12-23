import { Router } from './core/router';

const routes = new Router();

routes.get('/users', (request, response) => {
  console.log('cheguei na controller');

  const res = { message: 'Hello world' };

  // return response.end(JSON.stringify({ message: 'Hello world' }));

  return response.json(res);
});

routes.post('/users', (request, response) => {
  console.log(request.body);

  return response.end();
});

export { routes };
