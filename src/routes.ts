import { Router } from './core/router.class';

import { UsersControllers } from './controllers/users.controller';

const usersController = new UsersControllers();

const routes = new Router();

routes.get('/users', usersController.index);

routes.post('/users', usersController.create);

export { routes };
