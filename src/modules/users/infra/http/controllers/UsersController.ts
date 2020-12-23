import CreateUserService from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {name, password, admin} = request.body;

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      password,
      admin
    });

    return response.json(user);
  }
}