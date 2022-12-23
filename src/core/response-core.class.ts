import { InternalResponse, IResponse } from './@types';

class ResponseCore {
  private nodeHttpResponse: InternalResponse;
  public response: IResponse;

  constructor(nodeHttpResponse: InternalResponse) {
    this.nodeHttpResponse = nodeHttpResponse;
    this.execute();
  }

  public execute() {
    this.nodeHttpResponse.writeHead(200, {
      'Content-Type': 'application/json',
    });

    // BUG check why pass a function works and just adding json: this.responseJSON doesn't work
    this.response = Object.assign(this.nodeHttpResponse, {
      json: (data: Record<string, unknown>) => this.responseJSON(data),
    });
  }

  private responseJSON(data: Record<string, unknown>): void {
    try {
      const parsedData = JSON.stringify(data);

      this.nodeHttpResponse.end(parsedData);
    } catch (error) {
      console.error(error);
    }
  }
}

export { ResponseCore };
