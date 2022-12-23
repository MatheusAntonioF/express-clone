import { IRequest, InternalRequest } from './@types';

class RequestCore {
  private nodeHttpRequest: InternalRequest;
  public request: IRequest;

  constructor(nodeHttpRequest: InternalRequest) {
    this.nodeHttpRequest = nodeHttpRequest;
  }

  public async execute() {
    const parsedRequestBody = await this.parseRequestBody(this.nodeHttpRequest);

    this.request = Object.assign(this.nodeHttpRequest, {
      body: parsedRequestBody,
    });
  }

  private async parseRequestBody(
    nodeHttpRequest: InternalRequest
  ): Promise<Record<string, unknown> | null> {
    const parseBodyMethods = ['POST', 'PUT', 'PATCH'];

    if (!parseBodyMethods.includes(nodeHttpRequest.method || '')) return {};

    const data: Buffer[] = [];

    nodeHttpRequest.on('data', (chunk: Buffer) => {
      data.push(chunk);
    });

    const requestBody: Record<string, unknown> | null = await new Promise(
      resolve => {
        nodeHttpRequest.on('end', () => {
          const bufferStringify = Buffer.concat(data).toString();

          /**
           * here it's not possible to use nullish coalescing operator
           * cause ?? operator only return the right position if the left position
           * will be null or undefined
           * and OR operator - || - will return left side if right side was falsy
           */
          resolve(JSON.parse(bufferStringify || '{}'));
        });
      }
    );

    return requestBody;
  }
}

export { RequestCore };
