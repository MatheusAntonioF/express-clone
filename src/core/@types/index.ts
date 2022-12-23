import { IncomingMessage, ServerResponse } from 'http';

export type InternalRequest = IncomingMessage;
export type InternalResponse = ServerResponse<IncomingMessage>;

export interface Request extends InternalRequest {
  body: Record<string, unknown> | null;
}

export interface Response extends ServerResponse<IncomingMessage> {
  json: (
    dataToParse: Record<string, unknown>
  ) => string | Record<string, unknown>;
}
