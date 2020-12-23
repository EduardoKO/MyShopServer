import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response:Response): Promise<Response> {
    const { name, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUserService.execute({
      name,
      password,
    });

    return response.json({ user, token });

  }
}
