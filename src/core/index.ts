import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse as NodeHttpServerResponse,
} from 'node:http';

import { Request, InternalRequest, Response, InternalResponse } from './@types';

import { IRoutes, Router } from './router';

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

    this.server = createServer((request, response) => {
      this.mainHandler(request, response);
    });

    this.server.listen(Number(port), callback);
  }

  private async mainHandler(
    internalRequest: InternalRequest,
    internalResponse: InternalResponse
  ) {
    if (!(internalRequest.url && internalRequest.method))
      return internalResponse.end();

    const domainRoute = this.applicationRoutes[internalRequest.url];

    const handler = domainRoute[internalRequest.method];

    const request: Request = Object.assign(internalRequest, { body: {} });

    request.body = await this.parseRequestBody(request);

    const response: Response = Object.assign(internalResponse, {
      json: this.parseJsonResponse,
    });

    response.writeHead(200, {
      'Content-Type': 'application/json',
    });

    handler(request, response);
  }

  private parseJsonResponse(
    data: Record<string, unknown>
  ): string | Record<string, unknown> {
    try {
      const parsedData = JSON.stringify(data);

      return parsedData;
    } catch (error) {
      console.error(error);
      return data;
    }
  }

  private async parseRequestBody(
    request: InternalRequest
  ): Promise<Record<string, unknown> | null> {
    const parseBodyMethods = ['POST', 'PUT', 'PATCH'];

    if (!parseBodyMethods.includes(request.method || '')) return {};

    const data: Buffer[] = [];

    request.on('data', (chunk: Buffer) => {
      data.push(chunk);
    });

    const requestBody: Record<string, unknown> | null = await new Promise(
      resolve => {
        request.on('end', () => {
          const bufferStringify = Buffer.concat(data).toString();

          resolve(JSON.parse(bufferStringify));
        });
      }
    );

    return requestBody;
  }
}

export default Express;
