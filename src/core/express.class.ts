import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse as NodeHttpServerResponse,
} from 'node:http';

import { InternalRequest, InternalResponse } from './@types';
import { RequestCore } from './request-core.class';
import { ResponseCore } from './response-core.class';

import { IRoutes, Router } from './router.class';

type ServerRequest = typeof IncomingMessage;
type ServerResponse = typeof NodeHttpServerResponse;

class Express {
  private applicationRoutes: IRoutes;
  public server: Server<ServerRequest, ServerResponse>;

  constructor() {}

  // TODO thought how to use a instance of router here and turn property routes to private
  public use({ routes }: Router) {
    this.applicationRoutes = {
      ...this.applicationRoutes,
      ...routes,
    };
  }

  public listen(port: unknown, callback: () => void) {
    console.log('🚀 ~ APP ROUTES', this.applicationRoutes);

    this.server = createServer(async (request, response) => {
      this.mainHandler(request, response);
    });

    this.server.listen(Number(port), callback);
  }

  private async mainHandler(
    nodeHttpRequest: InternalRequest,
    nodeHttpResponse: InternalResponse
  ) {
    const requestCore = new RequestCore(nodeHttpRequest);
    await requestCore.execute();

    const responseCore = new ResponseCore(nodeHttpResponse);

    const request = requestCore.request;
    const response = responseCore.response;

    if (!(request.url && request.method)) {
      return response.end();
    }

    const domainRoute = this.applicationRoutes[request.url];

    const handler = domainRoute[request.method];

    handler(request, response);
  }
}

export default Express;
