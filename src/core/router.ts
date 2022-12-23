// TODO use enum to define methods from a request
// enum REQUEST_METHODS {
//   GET = 'GET',
//   POST = 'POST',
// }
// type REQUEST_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

import { Request, Response } from './@types';

type IHandler = (request: Request, response: Response) => void;

type IRouteMethodsHandler = {
  [method: string]: IHandler;
};

export interface IRoutes {
  [baseUrl: string]: IRouteMethodsHandler;
}

class Router {
  routes: IRoutes;

  constructor() {
    this.routes = {};
  }

  public use(baseUrl: string, RouterInstance: Router) {
    if (!this.routes[baseUrl]) return;

    const parsedRoutes: IRoutes = {};

    Object.entries(RouterInstance.routes).map(([restOfUrl, Handler]) => {
      // TODO create validation to routes with double dash

      const fullUrl = `${baseUrl}/${restOfUrl}`;

      parsedRoutes[fullUrl] = Handler;
    });

    this.routes[baseUrl];
  }

  public get(routeUrl: string, handler: IHandler) {
    this.routes = {
      [routeUrl]: {
        ...this.routes[routeUrl],
        GET: handler,
      },
    };
  }

  public post(routeUrl: string, handler: IHandler) {
    // add new route to route's list
    this.routes = {
      [routeUrl]: {
        ...this.routes[routeUrl],
        POST: handler,
      },
    };
  }
}

export { Router };

const globalRoutes = {
  '/users': {
    GET: (request: unknown, response: unknown) => {},
  },
};
