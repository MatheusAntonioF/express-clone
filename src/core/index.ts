import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse as NodeHttpServerResponse,
} from 'node:http';

import { Router } from './router';

type ServerRequest = typeof IncomingMessage;
type ServerResponse = typeof NodeHttpServerResponse;

type Request = IncomingMessage;
type Response = NodeHttpServerResponse<IncomingMessage>;

class Express {
  public server: Server<ServerRequest, ServerResponse>;

  constructor() {
    const handler = this.mainHandler;

    this.server = createServer(handler);
  }

  public use(router: Router) {}

  private mainHandler(request: Request, response: Response) {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });

    if (request.url) {
      const currentUrl = request.url;

      const methodHandler = ''; // routes[currentUrl];

      if (request.method) {
        // const handler = methodHandler[request.method];
        // handler(request, response);
      }
    }
  }
}

export default Express;
