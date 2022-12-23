import { IRequest, IResponse } from '../core/@types';

class UsersControllers {
  public index(_: IRequest, response: IResponse) {
    const res = { message: 'Hello world' };

    return response.json(res);
  }

  public create(request: IRequest, response: IResponse) {
    return response.json(request.body ?? {});
  }
}

export { UsersControllers };
