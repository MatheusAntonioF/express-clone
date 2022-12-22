import { createServer, IncomingMessage, ServerResponse } from 'node:http';

interface IRouteMethodsHandler {
  [key: string]: (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ) => void;
}

interface IRoutes {
  [key: string]: IRouteMethodsHandler;
}

const routes: IRoutes = {
  '/users': {
    GET: (request, response) => {
      const currentUrl = request.url;

      return response.end(JSON.stringify({ url: currentUrl }));
    },
    POST: async (request, response) => {
      const body: Buffer[] = [];

      request.on('data', chunk => body.push(chunk));

      const requestBody = await new Promise(resolve => {
        request.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();

          resolve(JSON.parse(parsedBody));
        });
      });

      return response.end(JSON.stringify(requestBody));
    },
  },
};

const express = createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  console.log('🚀 ~ request', request.method, request.url);

  if (request.url) {
    const currentUrl = request.url;

    const methodHandler = routes[currentUrl];

    if (request.method) {
      const handler = methodHandler[request.method];

      handler(request, response);
    }
  }
});

export default express;
