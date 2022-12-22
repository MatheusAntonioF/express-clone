import { IncomingMessage, ServerResponse } from 'http';

// TODO use enum to define methods from a request
// enum REQUEST_METHODS {
//   GET = 'GET',
//   POST = 'POST',
// }
// type REQUEST_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type IHandler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => void;

type IRouteMethodsHandler = {
  [method: string]: IHandler;
};

interface IRoutes {
  [baseUrl: string]: IRouteMethodsHandler;
}

class Router {
  private routes: IRoutes;

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
    if (this.routes[routeUrl]) return;

    // add new route to route's list
    this.routes = {
      routeUrl: {
        GET: handler,
      },
    };
  }

  public post(routeUrl: string, handler: IHandler) {
    if (this.routes[routeUrl]) return;

    // add new route to route's list
    this.routes = {
      routeUrl: {
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
