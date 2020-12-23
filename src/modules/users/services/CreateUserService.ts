import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name:string;
  password:string;
  admin: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({name, password, admin}: IRequest): Promise<User> {
    const hashedPassword = await this.hashProvider.generateHash(password);
    
    const user =  await this.usersRepository.create({
      name,
      password: hashedPassword,
      admin
    });

    return user;
  }
}

export default CreateUserService;