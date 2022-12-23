import { IncomingMessage, ServerResponse } from 'http';

export type InternalRequest = IncomingMessage;
export type InternalResponse = ServerResponse<IncomingMessage>;

export interface IRequest extends InternalRequest {
  body: Record<string, unknown> | null;
}

export interface IResponse extends ServerResponse<IncomingMessage> {
  json: (dataToParse: Record<string, unknown>) => void;
}
